"use client";

import { useState } from "react";

interface mousePosition {
  x: string;
  y: string;
}

interface Rectangle {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

export default function Image({ params }: { params: { image: string } }) {
  const image = `/imgs/${params.image}`;
  const [mousePosition, setMousePosition] = useState<mousePosition>({
    x: "0",
    y: "0",
  });

  const onMouseMove = (e: React.MouseEvent) => {
    let x = e.clientX;
    let y = e.clientY;

    console.log(x, y);
    setMousePosition({ x: x.toString(), y: y.toString() });
  };

  return (
    <main className="grid place-content-center h-full">
      <div className="relative rounded-lg bg-base-300 p-4 border-4 border-primary">
        <img
          onMouseMove={onMouseMove}
          className="m-auto"
          src={image}
          width={500}
          height={500}
          alt={params.image}
        />
        <div
          className={`min-w-[300px] min-h-[130px] border-2 border-error`}
          style={{
            position: "absolute",
            top: mousePosition.x,
            left: mousePosition.y,
          }}
        ></div>
      </div>
    </main>
  );
}
