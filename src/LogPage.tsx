import { useEffect, useState } from "react";
import { Title, List } from "@mantine/core";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function LogPage() {
  const [data, setData] = useState<{ date: string; minutes: number }[]>([]);

  useEffect(() => {
    const entries: { date: string; minutes: number }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (/\d{4}\/\d{1,2}\/\d{1,2}/.test(key)) {
        entries.push({ date: key, minutes: Number(localStorage.getItem(key)) });
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
          <List.Item key={d.date}>{d.date} - {d.minutes} 分</List.Item>
        ))}
      </List>

      <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="minutes" stroke="#228be6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LogPage;
