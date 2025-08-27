import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import GachaPage from "./Gacha";



function App() {
  const navigate = useNavigate();

  return (
    <div>
      {/* 常に表示されるタイトル */}
      <h1 style={{
  fontWeight: "bold",
  fontSize: "36px",
  position: "fixed",
  top: "10px",
  left: "10px",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "10px"
}}>
  <img src="/Icon-Study.png" alt="ロゴ" width="80" height="80" />
  ドーパミン勉強
</h1>


      {/* ページ切り替え部分 */}
      <div style={{ paddingTop: "60px" }}> {/* タイトル分の余白を確保 */}
        <Routes>
          <Route path="/" element={<h2>記録ページ</h2>} />
          <Route path="/log" element={<h2>ログページ</h2>} />
<Route path="/gacha" element={<GachaPage />} />
          <Route path="/boss" element={<h2>ボス戦ページ</h2>} />
          <Route path="/settings" element={<h2>設定ページ</h2>} />
        </Routes>
      </div>

      {/* 下のナビゲーションバー */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        background: "#eee",
        padding: "10px 0"
      }}>
        <button onClick={() => navigate("/")}>記録</button>
        <button onClick={() => navigate("/log")}>ログ</button>
        <button onClick={() => navigate("/gacha")}>ガチャ</button>
        <button onClick={() => navigate("/boss")}>ボス戦</button>
        <button onClick={() => navigate("/settings")}>設定</button>
      </div>
    </div>
  );
}



export default App;
