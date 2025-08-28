import { useState } from "react";
import "./App.css";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";

function GachaPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const gachaPools = {
    文系: ["夏目漱石『吾輩は猫である』",
    "太宰治『人間失格』",
    "川端康成『雪国』",
    "芥川龍之介『羅生門』",
    "村上春樹『ノルウェイの森』",
    "中島敦『山月記』",
    "宮沢賢治『銀河鉄道の夜』",
    "志賀直哉『城の崎にて』",
    // 古文単語ゾーン
    "あし【解説】『悪し』が語源で、悪いという意味",
    "いと【解説】『とても』の意。いとおかし、で有名",
    "あはれ【解説】『しみじみと趣深い』。共感や感動を表す",
    "つれづれ【解説】『退屈』。兼好法師の日常感",
    "をかし【解説】『趣がある』。清少納言が多用",
    "かなし【解説】『愛おしい』。今の悲しいとは違う",
    "いとけなし【解説】『幼い』",
    "いまめかし【解説】『現代風だ』当時の流行を指す",
    "すずろなり【解説】『なんとなく』。徒然草にも出る",
    "うし【解説】『つらい・いやだ』。現代の牛とは別物",],
    理系: [ "E=mc^2【解説】質量とエネルギーの関係。物理学のアイドル式",
    "三平方の定理【解説】中学で習うため、バカの一つ覚えのように使う人多数",
    "マクスウェル方程式【解説】電磁気学の聖書。これがわかれば博士号も近い？",
    "相対性理論【解説】速すぎると時間も曲がる。ラノベの元ネタ感もある",
    "ニュートンの運動方程式【解説】りんごに導かれた男の偉業",
    "熱力学第二法則【解説】エントロピーは増大する。つまり部屋は勝手に散らかる",
    "ボイルの法則【解説】気体は押せば縮む。当たり前だけど大発見",
    "DNA二重らせん【解説】分子生物学のアイドル。ワトソンとクリックがドヤ顔",
    "ブラックホール【解説】光さえ逃げられない。中二病の代名詞",
    "カオス理論【解説】バタフライ効果。テスト前に部屋を掃除するのもこれのせい",
    "超弦理論【解説】物理界の厨二設定。多次元すぎて誰も理解していない",
    "進化論【解説】ダーウィン先生。生存戦略は適者生存、オタク界隈も同じ",
    "シュレーディンガーの猫【解説】生死が同時。量子力学と哲学の悪ふざけ",
    "ラプラスの悪魔【解説】すべてを予見できる存在。受験勉強で欲しい能力No.1",
    "ハッブルの法則【解説】宇宙は膨張している。財布の中身は収縮している",
    "統計力学【解説】数が多ければなんとかなる理論。大学生の出席にも適用可",
    "フーリエ級数展開【解説】波を全部サイン・コサインで分解。音楽も数学に変換可能",
    "ボルツマン方程式【解説】カオスな粒子の大運動会",
    "シュレーディンガー方程式【解説】量子を操る呪文",
    "オームの法則【解説】中学理科の友達。V=IRで世界が回る",],
    格言: [
      "厳しいって from2024 by ジョージメンズコーチ",
      "勉強してください！by 河野げんと",
      "10分以内にスマホを捨てろ そうすれば人生いい方向にいく", 
      "為せば成る、為さねばならない",
    "思い立ったが吉日 by 昔の偉い人",
    // 迷言ゾーン（全体の3割くらい）
    "徹夜は最強のサプリ by GPT",
    "3日坊主を120回繰り返せば1年続く by GPT",
    "茨の道？道あるじゃん、歩けよ。 byなんJ民",
    "ストレスで勉強にならないくらいならシ〇った方がいい by限界受験生2024",
    ],
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
    }, 2000); // 2秒回転
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>ガチャを選んでください</h2>
      <div style={{ margin: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Button onClick={() => rollGacha("文系")} color="blue">Type-文系</Button>
        <Button onClick={() => rollGacha("理系")} color="green">Type-理系</Button>
        <Button onClick={() => rollGacha("格言")} color="pink">Type-格言</Button>
      </div>

      {selectedType && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{selectedType}ガチャの結果！</h3>
          <motion.div
            animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
            transition={isSpinning ? { repeat: Infinity, duration: 0.5, ease: "linear" } : {}}
            style={{
              display: "inline-block",
              fontSize: "2rem",
              marginTop: "1rem",
            }}
          >
            {isSpinning ? "🎲" : result}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default GachaPage;
