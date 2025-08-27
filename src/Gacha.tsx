import  { useState } from "react";
import "./App.css";

function GachaPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const gachaPools = {
    文系: ["夏目漱石『吾輩は猫である』", "太宰治『人間失格』", "川端康成『雪国』"],
    理系: ["E=mc^2", "シュレーディンガーの猫", "フーリエ級数展開"],
    格言: ["継続は力なり", "七転び八起き", "習慣は第二の天性なり"],
  };

  const rollGacha = (type: keyof typeof gachaPools) => {
    setIsSpinning(true);
    setSelectedType(type);
    setResult(null);

    setTimeout(() => {
      const pool = gachaPools[type];
      const randomItem = pool[Math.floor(Math.random() * pool.length)];
      setResult(randomItem);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>ガチャを選んでください</h2>
      <div style={{ margin: "1rem" }}>
        <button onClick={() => rollGacha("文系")}>Type-文系</button>
        <button onClick={() => rollGacha("理系")}>Type-理系</button>
        <button onClick={() => rollGacha("格言")}>Type-格言</button>
      </div>

      {selectedType && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{selectedType}ガチャの結果！</h3>
          <div className={isSpinning ? "spin" : ""}>
            {isSpinning ? "🎲 回転中..." : result}
          </div>
        </div>
      )}
    </div>
  );
}

export default GachaPage;
