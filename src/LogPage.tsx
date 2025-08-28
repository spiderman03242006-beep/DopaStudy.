import { useEffect, useState } from "react";
import { Title, List } from "@mantine/core";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}時間${m}分`;
  if (h > 0) return `${h}時間`;
  return `${m}分`;
}

type LogItem = {
  minutes: number;
  timestamp: string;
};

function LogPage() {
  const [data, setData] = useState<{ date: string; minutes: number }[]>([]);

  useEffect(() => {
    const entries: { date: string; minutes: number }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (/\d{4}\/\d{1,2}\/\d{1,2}/.test(key)) {
        try {
          const logs: LogItem[] = JSON.parse(localStorage.getItem(key) || "[]");
          if (Array.isArray(logs)) {
            const total = logs.reduce((a, b) => a + (b.minutes || 0), 0);
            entries.push({ date: key, minutes: total });
          }
        } catch {}
      }
    }
    entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setData(entries);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Title order={2}>ログページ</Title>
      <List spacing="sm" size="lg" center>
        {data.map((d) => (
          <List.Item key={d.date}>
            {d.date} - {formatTime(d.minutes)}
          </List.Item>
        ))}
      </List>

      <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) => `${Math.floor(value / 60)}時間`}
              domain={[0, "dataMax + 60"]}
            />
            <Tooltip formatter={(value: number) => formatTime(value)} />

            {/* 2時間のラインを赤文字で表示 */}
            <ReferenceLine
              y={120}
              label={{ value: "🎉 2時間達成！", position: "right", fill: "red" }}
              stroke="red"
              strokeDasharray="3 3"
            />

            {/* 3時間超えたら雷エフェクト */}
            {data.some((d) => d.minutes >= 180) && (
              <ReferenceLine
                y={180}
                label={{ value: "⚡ 3時間超え！雷モード！", position: "right", fill: "orange" }}
                stroke="orange"
                strokeWidth={3}
              />
            )}

            <Line type="monotone" dataKey="minutes" stroke="#228be6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LogPage;
