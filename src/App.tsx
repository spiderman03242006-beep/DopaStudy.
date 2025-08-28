import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import GachaPage from "./Gacha";
import RecordPage from "./RecordPage";   // ← 追加
import LogPage from "./LogPage";         // ← 追加
import { Button } from "@mantine/core";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      {/* タイトル */}
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "36px",
          position: "fixed",
          top: "10px",
          left: "10px",
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img src="/Icon-Study.png" alt="ロゴ" width="80" height="80" />
        ドーパミン勉強
      </h1>

      {/* ページ切り替え */}
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          {/* 記録ページ */}
          <Route path="/" element={<RecordPage />} />
          {/* ログページ */}
          <Route path="/log" element={<LogPage />} />
          {/* ガチャページ */}
          <Route path="/gacha" element={<GachaPage />} />
          {/* 仮ページたち */}
          <Route path="/boss" element={<h2>ボス戦ページ</h2>} />
          <Route path="/settings" element={<h2>設定ページ</h2>} />
        </Routes>
      </div>

      {/* 下ナビゲーション */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          background: "#eee",
          padding: "10px 0",
        }}
      >
        <Button variant="subtle" onClick={() => navigate("/")}>
          記録
        </Button>
        <Button variant="subtle" onClick={() => navigate("/log")}>
          ログ
        </Button>
        <Button variant="subtle" onClick={() => navigate("/gacha")}>
          ガチャ
        </Button>
        <Button variant="subtle" onClick={() => navigate("/boss")}>
          ボス戦
        </Button>
        <Button variant="subtle" onClick={() => navigate("/settings")}>
          設定
        </Button>
      </div>
    </div>
  );
}

export default App;
