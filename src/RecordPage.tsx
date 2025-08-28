import { useState, useEffect } from "react";
import { Button, TextInput, Title } from "@mantine/core";

function RecordPage() {
  const [minutes, setMinutes] = useState("");
  const [todayTotal, setTodayTotal] = useState(0);

  const todayKey = new Date().toLocaleDateString();

  useEffect(() => {
    const saved = localStorage.getItem(todayKey);
    if (saved) setTodayTotal(Number(saved));
  }, []);

  const addMinutes = () => {
    const newTotal = todayTotal + Number(minutes);
    setTodayTotal(newTotal);
    localStorage.setItem(todayKey, newTotal.toString());
    setMinutes("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Title order={2}>記録ページ</Title>
      <TextInput
        placeholder="勉強した分数を入力"
        value={minutes}
        onChange={(e) => setMinutes(e.currentTarget.value)}
        type="number"
        style={{ maxWidth: 200, margin: "1rem auto" }}
      />
      <Button onClick={addMinutes} color="blue">記録する</Button>
      <div style={{ marginTop: "1rem" }}>
        今日の合計: {todayTotal} 分
      </div>
    </div>
  );
}

export default RecordPage;
