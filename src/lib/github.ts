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

export type CommitActivity = {
  total: number;
  days: { date: string; count: number }[];
  topRepos: { repo: string; count: number }[];
  latest: { message: string; date: string; url: string } | null;
};

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

/**
 * Aktivitas commit publik dari GitHub Commit Search:
 * total commit, grafik 14 hari terakhir, repo paling aktif, dan commit terbaru.
 */
export async function getCommitActivity(): Promise<CommitActivity> {
  const empty: CommitActivity = {
    total: 0,
    days: [],
    topRepos: [],
    latest: null,
  };

  try {
    const res = await fetch(
      `${API}/search/commits?q=author:${GITHUB_USER}&sort=author-date&order=desc&per_page=100`,
      {
        headers: githubHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!res.ok) {
      console.error(
        `GitHub commit search error: ${res.status} ${res.statusText}`,
      );
      return empty;
    }

    const data: {
      total_count: number;
      items: {
        html_url: string;
        repository: { full_name: string };
        commit: { message: string; author: { date: string } | null };
      }[];
    } = await res.json();

    const perDay = new Map<string, number>();
    const perRepo = new Map<string, number>();

    for (const item of data.items) {
      const iso = item.commit.author?.date;
      if (!iso) continue;
      const day = iso.slice(0, 10);
      perDay.set(day, (perDay.get(day) ?? 0) + 1);

      const repo = item.repository.full_name.replace(`${GITHUB_USER}/`, "");
      perRepo.set(repo, (perRepo.get(repo) ?? 0) + 1);
    }

    const first = data.items[0];

    // 14 hari terakhir dihitung dari commit terbaru (deterministik, biar
    // Next.js bisa prerender/static tanpa error "current time").
    const days: { date: string; count: number }[] = [];
    const anchor = first?.commit.author?.date;
    if (anchor) {
      const end = new Date(anchor);
      for (let i = 13; i >= 0; i--) {
        const d = new Date(end);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        days.push({ date: key, count: perDay.get(key) ?? 0 });
      }
    }

    return {
      total: data.total_count,
      days,
      topRepos: [...perRepo.entries()]
        .map(([repo, count]) => ({ repo, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      latest: first
        ? {
            message: first.commit.message.split("\n")[0],
            date: first.commit.author?.date ?? "",
            url: first.html_url,
          }
        : null,
    };
  } catch (error) {
    console.error("Gagal ambil aktivitas commit:", error);
    return empty;
  }
}
