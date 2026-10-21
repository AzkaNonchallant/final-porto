export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
  url: string;
};

const GITHUB_USER = "AzkaNonchallant";
const REVALIDATE_SECONDS = 3600; // refresh tiap 1 jam
const API = "https://api.github.com";

export type LanguageStat = {
  language: string;
  bytes: number;
  percent: number;
  repos: number;
};

export type CommitDay = {
  date: string; // YYYY-MM-DD
  count: number;
  future: boolean; // hari yang belum datang (kolom terakhir,abu-abu)
};

export type CommitActivity = {
  total: number; // commit 365 hari terakhir
  allTime: number; // total commit publik
  weeks: CommitDay[][]; // kolom minggu (index 0 = Minggu), 7 hari per kolom
  topRepos: { repo: string; count: number }[];
  latest: { message: string; date: string; url: string } | null;
};

const YEAR_DAYS = 364; // 52 minggu + hari ini = 365 hari
const SEARCH_MAX_PAGES = 10; // batas 1000 hasil dari GitHub Commit Search

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

type GhRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  pushed_at: string | null;
  html_url: string;
  fork: boolean;
  archived: boolean;
};

/**
 * Fetch repo publik dari GitHub di server (token opsional, tidak pernah
 * dikirim ke browser karena tanpa prefix NEXT_PUBLIC_).
 * Cache/revalidate 1 jam supaya "realtime" tanpa request tiap buka.
 */
export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `${API}/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      {
        headers: githubHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: GhRepo[] = await res.json();

    return data
      .filter((repo) => !repo.fork && !repo.archived)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          (b.pushed_at ?? "").localeCompare(a.pushed_at ?? ""),
      )
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics ?? [],
        updatedAt: repo.pushed_at ?? "",
        url: repo.html_url,
      }));
  } catch (error) {
    console.error("Gagal ambil data GitHub:", error);
    return [];
  }
}

/**
 * Total bahasa pemrograman dari seluruh repo (berdasarkan jumlah byte kode),
 * di-fetch per repo lalu dijumlahkan. Kalau endpoint /languages gagal
 * (misal kena rate limit tanpa token), fallback ke bahasa utama repo itu.
 */
export async function getLanguageStats(repos: Repo[]): Promise<LanguageStat[]> {
  if (repos.length === 0) return [];

  const totals = new Map<string, { bytes: number; repos: number }>();

  await Promise.all(
    repos.map(async (repo) => {
      let entries: [string, number][] = [];

      try {
        const res = await fetch(
          `${API}/repos/${GITHUB_USER}/${repo.name}/languages`,
          {
            headers: githubHeaders(),
            next: { revalidate: REVALIDATE_SECONDS },
          },
        );

        if (res.ok) {
          const data: Record<string, number> = await res.json();
          entries = Object.entries(data);
        }
      } catch {
        entries = [];
      }

      // fallback: bahasa utama dari daftar repo
      if (entries.length === 0 && repo.language) {
        entries = [[repo.language, 1]];
      }

      for (const [language, bytes] of entries) {
        const current = totals.get(language) ?? { bytes: 0, repos: 0 };
        totals.set(language, {
          bytes: current.bytes + bytes,
          repos: current.repos + 1,
        });
      }
    }),
  );

  const totalBytes = [...totals.values()].reduce(
    (sum, item) => sum + item.bytes,
    0,
  );

  return [...totals.entries()]
    .map(([language, { bytes, repos }]) => ({
      language,
      bytes,
      repos,
      percent:
        totalBytes > 0 ? Number(((bytes / totalBytes) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes);
}

type SearchCommit = {
  html_url: string;
  repository: { full_name: string };
  commit: { message: string; author: { date: string } | null };
};

type SearchResponse = {
  total_count: number;
  items: SearchCommit[];
};

function toDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

/**
 * Tanggal "hari ini" diambil dari header Date balasan GitHub, bukan Date.now(),
 * supaya halaman tetap bisa di-prerender tanpa dynamic API Next.js.
 */
function readToday(res: Response, fallback?: string) {
  const header = res.headers.get("date");
  const parsed = header ? new Date(header) : null;
  if (parsed && !Number.isNaN(parsed.getTime())) return toDayKey(parsed);
  return fallback;
}

/**
 * Susun grid 53 minggu x 7 hari (heatmap ala GitHub). Kolom pertama dimulai
 * dari Minggu sebelum 365 hari lalu, kolom terakhir berisi minggu ini. Hari di
 * masa depan ditandai future supaya client bisa render transparan.
 */
function buildWeeks(perDay: Map<string, number>, today: string) {
  const end = new Date(`${today}T00:00:00.000Z`);
  const start = addDays(end, -YEAR_DAYS);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const weeks: CommitDay[][] = [];

  for (let cursor = start; cursor <= end; cursor = addDays(cursor, 7)) {
    const week: CommitDay[] = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(cursor, i);
      const date = toDayKey(day);
      const future = day > end;
      week.push({ date, count: future ? 0 : (perDay.get(date) ?? 0), future });
    }

    weeks.push(week);
  }

  return weeks;
}

/**
 * Aktivitas commit publik dari GitHub Commit Search: kalender kontribusi 365
 * hari (ala GitHub), total commit, repo paling aktif, dan commit terbaru.
 */
export async function getCommitActivity(): Promise<CommitActivity> {
  const empty: CommitActivity = {
    total: 0,
    allTime: 0,
    weeks: [],
    topRepos: [],
    latest: null,
  };

  try {
    const search = (query: string, page: number) =>
      fetch(
        `${API}/search/commits?q=${encodeURIComponent(query)}&sort=author-date&order=desc&per_page=100&page=${page}`,
        {
          headers: githubHeaders(),
          next: { revalidate: REVALIDATE_SECONDS },
        },
      );

    // request pertama: total sepanjang masa + tanggal server.
    const firstRes = await search(`author:${GITHUB_USER}`, 1);

    if (!firstRes.ok) {
      console.error(
        `GitHub commit search error: ${firstRes.status} ${firstRes.statusText}`,
      );
      return empty;
    }

    const firstPage: SearchResponse = await firstRes.json();
    const firstItem = firstPage.items?.[0];
    const today = readToday(firstRes, firstItem?.commit.author?.date?.slice(0, 10));

    if (!today) return { ...empty, allTime: firstPage.total_count };

    // request pertama (tanpa filter tanggal): total sepanjang masa, commit
    // terbaru, dan tanggal server untuk batas kalender.
    const perDay = new Map<string, number>();
    const perRepo = new Map<string, number>();

    const collect = (commit: SearchCommit) => {
      const iso = commit.commit.author?.date;
      if (!iso) return;

      const date = iso.slice(0, 10);
      perDay.set(date, (perDay.get(date) ?? 0) + 1);

      const repo = commit.repository.full_name.replace(`${GITHUB_USER}/`, "");
      perRepo.set(repo, (perRepo.get(repo) ?? 0) + 1);
    };

    // lanjut dengan filter 1 tahun terakhir, paginasi sampai 1000 hasil.
    const since = toDayKey(addDays(new Date(`${today}T00:00:00.000Z`), -365));
    const query = `author:${GITHUB_USER} author-date:>=${since}`;

    for (let page = 1; page <= SEARCH_MAX_PAGES; page++) {
      const res = await search(query, page);
      if (!res.ok) {
        console.error(
          `GitHub commit search error: ${res.status} ${res.statusText}`,
        );
        break;
      }

      const data: SearchResponse = await res.json();
      for (const item of data.items) collect(item);

      if (data.items.length < 100) break;
    }

    let total = 0;
    for (const count of perDay.values()) total += count;

    return {
      total,
      allTime: firstPage.total_count,
      weeks: buildWeeks(perDay, today),
      topRepos: [...perRepo.entries()]
        .map(([repo, count]) => ({ repo, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      latest: firstItem
        ? {
            message: firstItem.commit.message.split("\n")[0],
            date: firstItem.commit.author?.date ?? "",
            url: firstItem.html_url,
          }
        : null,
    };
  } catch (error) {
    console.error("Gagal ambil aktivitas commit:", error);
    return empty;
  }
}
