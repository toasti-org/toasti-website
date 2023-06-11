"use client";

import { useEffect, useRef } from "react";

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<{ x: number; y: number; z: number }[]>([]);

  const setCanvasExtents = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const { clientWidth, clientHeight } = document.body;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
    }
  };

  const makeStars = (count: number) => {
    const out = [];
    for (let i = 0; i < count; i++) {
      const s = {
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      };
      out.push(s);
    }
    return out;
  };

  const clear = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  const putPixel = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    brightness: number
  ) => {
    const intensity = brightness * 255;
    const rgb = `rgb(${intensity},${intensity},${intensity})`;
    context.fillStyle = rgb;
    context.fillRect(x, y, 2, 2);
  };

  const moveStars = (distance: number) => {
    const count = starsRef.current.length;
    for (let i = 0; i < count; i++) {
      const s = starsRef.current[i];
      s.z -= distance;
      while (s.z <= 1) {
        s.z += 1000;
      }
    }
  };

  const init = (time: number) => {
    let prevTime = time;
    const canvas = canvasRef.current;

    const tick = (time: number) => {
      let elapsed = time - prevTime;
      prevTime = time;

      moveStars(elapsed * 0.1);

      const context = canvas!.getContext("2d");
      if (context) {
        clear(context);

        const cx = canvas!.width / 2;
        const cy = canvas!.height / 2;

        const count = starsRef.current.length;
        for (let i = 0; i < count; i++) {
          const star = starsRef.current[i];

          const x = cx + star.x / (star.z * 0.001);
          const y = cy + star.y / (star.z * 0.001);

          if (x < 0 || x >= canvas!.width || y < 0 || y >= canvas!.height) {
            continue;
          }

          const d = star.z / 1000.0;
          const b = 1 - d * d;

          putPixel(context, x, y, b);
        }
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      setCanvasExtents();
      window.addEventListener("resize", setCanvasExtents);
      starsRef.current = makeStars(10000);
      requestAnimationFrame(init);
    }

    return () => {
      window.removeEventListener("resize", setCanvasExtents);
    };
  });

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
  );
};

export default StarField;
