import { useState, useEffect } from "react";
import { Button, TextInput, Title, Group, List } from "@mantine/core";
import "./explosion.css"; // CSSファイルを別で作る

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

function RecordPage() {
  const [minutes, setMinutes] = useState("");
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [showExplosion, setShowExplosion] = useState(false);

  const todayKey = new Date().toLocaleDateString();

  // 🔄 ログの復元
  useEffect(() => {
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setLogs(parsed);
      } catch {}
    }
  }, []);

  // ✅ 改善版: 累積ダメージ & 未設定なら無効
  const addMinutes = () => {
    if (!minutes) return;

    const now = new Date();
    const timestamp = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.toLocaleTimeString()}`;
    const newLogs = [...logs, { minutes: Number(minutes), timestamp }];
    setLogs(newLogs);
    localStorage.setItem(todayKey, JSON.stringify(newLogs));
    setMinutes("");

    // 🎯 ボスが設定されている場合だけダメージを送る
    const bossData = localStorage.getItem("bossData");
    if (bossData) {
      const prev = parseInt(localStorage.getItem("lastDamage") || "0", 10);
      const total = prev + Number(minutes);
      localStorage.setItem("lastDamage", String(total));
    }

    // 🎇 爆発エフェクト開始
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 1000);

    // 🔊 爆発音
    const sound = new Audio("/Sounds/爆発1.mp3");
    sound.volume = 0.6;
    sound.play();
  };

  // ログ削除
  const deleteLog = (index: number) => {
    const newLogs = logs.filter((_, i) => i !== index);
    setLogs(newLogs);
    localStorage.setItem(todayKey, JSON.stringify(newLogs));
  };

  const todayTotal = logs.reduce((a, b) => a + b.minutes, 0);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Title order={2}>記録ページ</Title>
      <TextInput
        placeholder="勉強した分数を入力"
        value={minutes}
        onChange={(e) => setMinutes(e.currentTarget.value)}
        type="number"
        style={{ maxWidth: 400, margin: "1rem auto" }}
      />
      <Button onClick={addMinutes} color="blue" size="xs">記録する</Button>

      {/* キャラクター */}
      <div style={{ marginTop: "2rem", position: "relative", display: "inline-block" }}>
        <img src="/Characters/グラサンカメ.png" alt="グラサンカメ" width="150" />

        {showExplosion && (
          <div className="explosion">
            {Array.from({ length: 15 }).map((_, i) => {
              const x = Math.random() * 200 - 100;
              const y = Math.random() * 200 - 100;
              return (
                <span
                  key={i}
                  className="particle"
                  style={{ "--x": x, "--y": y } as React.CSSProperties}
                />
              );
            })}
          </div>
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        今日の合計: {formatTime(todayTotal)}
      </div>

      <List spacing="sm" size="lg" center mt="lg">
        {logs.map((log, i) => (
          <List.Item key={i}>
            <Group justify="space-between">
              <span>{log.timestamp} - {formatTime(log.minutes)}</span>
              <Button color="red" size="xs" onClick={() => deleteLog(i)}>削除</Button>
            </Group>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default RecordPage;
