import type { CommitActivity, CommitDay } from "@/lib/github";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const WEEKDAY_LABELS: (string | null)[] = [
  null,
  "Sen",
  null,
  "Rab",
  null,
  "Jum",
  null,
];

const LEVEL_COLORS = [
  "bg-neutral-300",
  "bg-[#bbf7d0]",
  "bg-[#4ade80]",
  "bg-[#22c55e]",
  "bg-[#15803d]",
];

function level(count: number, max: number) {
  if (count <= 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function monthLabel(week: CommitDay[]) {
  const startsMonth = week.some((day) => day.date.slice(8) === "01");
  if (!startsMonth) return null;

  const first = week.find((day) => !day.future);
  if (!first) return null;

  const month = Number(first.date.slice(5, 7));
  return MONTHS[month - 1] ?? null;
}

export default function ContributionHeatmap({
  activity,
}: {
  activity: CommitActivity;
}) {
  const weeks = activity.weeks;

  if (weeks.length === 0) {
    return (
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
        Kalender commit belum bisa dimuat
      </p>
    );
  }

  const days = weeks.flat();
  const max = Math.max(...days.map((day) => day.count), 1);
  const range = `${days[0].date} → ${days.filter((d) => !d.future).at(-1)?.date}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-xs font-bold text-neutral-900">
          {activity.total} commits in the last year
        </p>
        <span className="shrink-0 font-mono text-[10px] font-medium text-neutral-500">
          {activity.allTime} total
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max flex-col gap-1">
          <div className="flex">
            <span className="w-[22px] shrink-0" />
            <div className="flex gap-[2px]">
              {weeks.map((week) => (
                <span
                  key={week[0].date}
                  className="w-[9px] shrink-0 font-mono text-[8px] font-bold uppercase leading-[10px] text-neutral-500"
                >
                  {monthLabel(week)}
                </span>
              ))}
            </div>
          </div>

          <div className="flex">
            <div className="flex w-[22px] shrink-0 flex-col gap-[2px]">
              {WEEKDAY_LABELS.map((label, index) => (
                <span
                  key={index}
                  className="h-[9px] text-right font-mono text-[8px] leading-[9px] text-neutral-400"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex gap-[2px]">
              {weeks.map((week) => (
                <div key={week[0].date} className="flex flex-col gap-[2px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={
                        day.future ? undefined : `${day.date}: ${day.count} commit`
                      }
                      className={cn(
                        "size-[9px] rounded-[2px] transition hover:ring-1 hover:ring-neutral-900",
                        day.future
                          ? "bg-neutral-200"
                          : LEVEL_COLORS[level(day.count, max)],
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
          {range}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-medium text-neutral-500">
            Less
          </span>
          {LEVEL_COLORS.map((color) => (
            <span key={color} className={cn("size-[9px] rounded-[2px]", color)} />
          ))}
          <span className="font-mono text-[9px] font-medium text-neutral-500">
            More
          </span>
        </div>
      </div>
    </div>
  );
}