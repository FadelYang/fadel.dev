import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Every time the route changes, fire the bar
    setLoading(true);
    setProgress(20);

    const t1 = setTimeout(() => setProgress(60), 100);
    const t2 = setTimeout(() => setProgress(85), 300);
    const t3 = setTimeout(() => setProgress(100), 500);
    const t4 = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="absolute bottom-0 left-0 h-0.5 bg-violet-500 transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
        opacity: loading ? 1 : 0,
        transition: progress === 100
          ? "width 200ms ease-out, opacity 300ms ease 200ms"
          : "width 300ms ease-out",
      }}
    />
  );
}