import { useEffect } from "react";

function Bgm() {
  useEffect(() => {
    const bgm = new Audio("/Sounds/BGM.mp3");
    bgm.loop = true;
    bgm.volume = 0.1;

    const startBgm = () => {
      bgm.play().catch(err => console.error("BGM 再生失敗:", err));
      document.removeEventListener("click", startBgm);
    };

    document.addEventListener("click", startBgm);
    return () => bgm.pause();
  }, []);

  return null;
}

export default Bgm;
