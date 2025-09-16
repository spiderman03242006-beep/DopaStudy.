import { useEffect, useState } from "react";
import { Button, Title } from "@mantine/core";

type BossRecord = {
  name: string;
  image: string;
  date: string;
};

function BossHistory() {
  const [history, setHistory] = useState<BossRecord[]>([]);

  // 🔄 localStorage から履歴を読み込む関数
  const loadHistory = () => {
    const saved = localStorage.getItem("bossHistory");
    if (saved) {
      const parsed = JSON.parse(saved) as BossRecord[];
      // 新しい順に並び替え
      setHistory(parsed.reverse());
    }
  };

  // ページを開いたときに履歴をロード
  useEffect(() => {
    loadHistory();
  }, []);

  // 個別削除
  const deleteRecord = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory.reverse()); // 保存時は元の順番に戻す
    localStorage.setItem("bossHistory", JSON.stringify(newHistory.reverse()));
  };

  // 全削除ボタン（任意）
  const clearHistory = () => {
    localStorage.removeItem("bossHistory");
    setHistory([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Title order={2}>歴代ボス一覧</Title>
      {history.length === 0 && <p>まだ倒したボスはいません！</p>}

      {history.map((boss, i) => (
        <div
          key={i}
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "1rem",
            margin: "1rem auto",
            maxWidth: 400
          }}
        >
          <h3>{boss.name}</h3>
          {boss.image && <img src={boss.image} alt={boss.name} width="150" />}
          <p>撃破日: {boss.date}</p>
          <Button color="red" size="xs" onClick={() => deleteRecord(i)}>
            削除
          </Button>
        </div>
      ))}

      {history.length > 0 && (
        <Button color="gray" style={{ marginTop: "1rem" }} onClick={clearHistory}>
          全削除
        </Button>
      )}
    </div>
  );
}

export default BossHistory;
