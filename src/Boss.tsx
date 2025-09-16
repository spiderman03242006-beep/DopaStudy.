import { useEffect, useState } from "react";
import { Button, Title, Progress, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function BossPage() {
  const [bossName, setBossName] = useState("");
  const [bossImage, setBossImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [bossHp, setBossHp] = useState<number | null>(null);
  const [maxHp, setMaxHp] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  // 🔄 ページ読み込み時に localStorage から復元
  useEffect(() => {
    const saved = localStorage.getItem("bossData");
    if (saved) {
      const data = JSON.parse(saved);
      setBossName(data.name);
      setBossImage(data.image);
      setBossHp(data.hp);
      setMaxHp(data.maxHp);
    }
  }, []);

  // 画像をBase64に変換して一時保存
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setConfirming(true);
      };
      reader.readAsDataURL(e.target.files[0]); // Base64化
    }
  };

  // ボスを確定
  const confirmBoss = () => {
    if (!tempImage) return;

    // HPをランダムで決定（20〜240, 1%で8）
    const chance = Math.random();
    let hp = Math.floor(Math.random() * (240 - 20 + 1)) + 20;
    if (chance < 0.01) hp = 8;

    setBossImage(tempImage);
    setConfirming(false);
    setBossHp(hp);
    setMaxHp(hp);

    localStorage.setItem(
      "bossData",
      JSON.stringify({ name: bossName, image: tempImage, hp, maxHp: hp })
    );
  };

  // RecordPage からのダメージ反映
  useEffect(() => {
    const interval = setInterval(() => {
      // ボス未設定ならダメージ無視
      if (bossHp === null || maxHp === null) return;

      const dmg = localStorage.getItem("lastDamage");
      if (dmg) {
        const damage = parseInt(dmg, 10);
        if (!isNaN(damage)) {
          const newHp = Math.max(0, bossHp - damage);
          setBossHp(newHp);

          // HP更新を保存
          localStorage.setItem(
            "bossData",
            JSON.stringify({ name: bossName, image: bossImage, hp: newHp, maxHp })
          );

          // HPが0になった瞬間に履歴保存
          if (newHp === 0 && bossHp > 0) {
            const sound = new Audio("/Sounds/チーン.mp3");
            sound.volume = 0.8;
            sound.play();

            const history = JSON.parse(localStorage.getItem("bossHistory") || "[]");
            history.push({
              name: bossName || "名無しボス",
              image: bossImage,
              date: new Date().toLocaleString()
            });
            localStorage.setItem("bossHistory", JSON.stringify(history));
          }
        }
        localStorage.removeItem("lastDamage");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [bossHp, bossName, bossImage, maxHp]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Title order={2}>ボス戦ページ</Title>

      {/* ボス設定 */}
      <TextInput
        placeholder="ボスの名前を入力"
        value={bossName}
        onChange={(e) => setBossName(e.currentTarget.value)}
        style={{ maxWidth: 300, margin: "1rem auto" }}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* 確認ダイアログ */}
      {confirming && tempImage && (
        <div>
          <img src={tempImage} alt="選択ボス" width="150" />
          <p>この写真を今回の勉強ボスに設定しますか？</p>
          <Button color="blue" onClick={confirmBoss}>はい</Button>
          <Button color="gray" onClick={() => setConfirming(false)}>いいえ</Button>
        </div>
      )}

      {/* ボス表示 */}
      {bossImage && bossHp !== null && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{bossName || "謎のボス"}</h3>
          <img
            src={bossImage}
            alt="ボス"
            width="200"
            style={{ filter: bossHp === 0 ? "grayscale(100%)" : "none" }}
          />

          <Progress
            value={(bossHp / (maxHp || 1)) * 100}
            color={bossHp > 0 ? "red" : "green"}
            size="xl"
            style={{ maxWidth: 400, margin: "1rem auto" }}
          />
          <p>HP: {bossHp} / {maxHp}</p>

          {bossHp === 0 && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1.5rem"
            }}>
              <p style={{ fontSize: "2rem", fontWeight: "bold", color: "purple", margin: 0 }}>
                🎉 ボスを倒した！！
              </p>
              <Button color="teal" onClick={() => navigate("/boss-history")}>
                歴代ボスを確認
              </Button>
              <Button
                color="blue"
                onClick={() => {
                  localStorage.removeItem("bossData");
                  setBossName("");
                  setBossImage(null);
                  setBossHp(null);
                  setMaxHp(null);
                }}
              >
                新しいボスを設定
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BossPage;
