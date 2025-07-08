import { type FC, useEffect, useState } from "react";
import { cn } from "../utils/cn";

const FadeOutMessage: FC = () => {
  const [visible, setVisible] = useState(true);
  const [next, setNext] = useState(false);
  const [next2, setNext2] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const nextTimer = setTimeout(() => setNext(true), 1500); // 表示後0.5秒でフェードアウト開始
    const next2Timer = setTimeout(() => setNext2(true), 2000); // 表示後0.5秒でフェードアウト開始
    const fadeTimer = setTimeout(() => setFading(true), 2500); // 表示後0.5秒でフェードアウト開始
    const hideTimer = setTimeout(() => setVisible(false), 3000); // フェード後完全に非表示
    return () => {
      clearTimeout(nextTimer);
      clearTimeout(next2Timer);

      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-10",
        "flex size-full items-center justify-center px-4 py-2",
        "bg-[white] text-white shadow-lg",
        "transform transition-opacity duration-700 ease-out",
        fading ? "opacity-0" : "opacity-100",
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center duration-500",
          next2 ? "translate-y-[-1000px]" : "",
        )}
      >
        <div
          className={cn(
            "absolute size-[300px] rounded-full bg-tozai-line-sky transition-transform duration-500",
            next ? "scale-100" : "scale-1000",
          )}
        />
        <p className="z-10 w-[242px] animate-scale-up">
          {"モノレポ！".split("").map((str, i) => (
            <span
              key={str}
              className="inline-block animate-bounce-once font-bold text-5xl"
              style={{ animationDelay: `${i * 75 + 800}ms` }}
            >
              {str}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default FadeOutMessage;
