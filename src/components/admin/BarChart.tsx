"use client";

interface Bar {
  label: string;
  value: number;
}

interface Props {
  data: Bar[];
  color?: string;
  height?: number;
  formatValue?: (v: number) => string;
}

export default function BarChart({ data, color = "#7c3aed", height = 160, formatValue }: Props) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((bar) => {
        const pct = (bar.value / max) * 100;
        return (
          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="relative w-full flex flex-col justify-end" style={{ height: height - 28 }}>
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1f1f2e] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                {formatValue ? formatValue(bar.value) : bar.value.toLocaleString()}
              </div>
              <div
                className="w-full rounded-t-sm transition-all duration-500"
                style={{
                  height: `${Math.max(pct, 2)}%`,
                  background: `linear-gradient(to top, ${color}cc, ${color}88)`,
                }}
              />
            </div>
            <span className="text-[10px] text-gray-600 truncate w-full text-center">{bar.label}</span>
          </div>
        );
      })}
    </div>
  );
}
