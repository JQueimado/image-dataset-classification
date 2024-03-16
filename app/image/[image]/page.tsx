"use client";

import { createRef, useState } from "react";

export default function Image({ params }: { params: { image: string } }) {
  const image = `/imgs/${params.image}`;
  const [mousePosition, setMousePosition] = useState<Array<number>>([
    0, 0, 0, 0,
  ]);
  const [draw, setDraw] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const imageDom = createRef<HTMLImageElement>();

  const onMouseMove = (e: React.MouseEvent) => {
    if (!imageDom.current) return;
    if (!draw && !visible) {
      var rect = imageDom.current.getBoundingClientRect();
      let x0 = e.clientX - rect.left;
      let y0 = e.clientY - rect.top;
      setMousePosition([x0, y0, 0, 0]);
      setDraw(true);
      setVisible(true);
    } else if (draw && visible) {
      setDraw(false);
    } else {
      setVisible(false);
      setDraw(false);
      setMousePosition([0, 0, 0, 0]);
    }
  };

  const onDraw = (e: React.MouseEvent) => {
    if (!draw || !imageDom.current) return;
    var rect = imageDom.current.getBoundingClientRect();
    let x1 = e.clientX - rect.left;
    let y1 = e.clientY - rect.top;
    setMousePosition([mousePosition[0], mousePosition[1], x1, y1]);
  };

  return (
    <main className="grid place-content-center h-full">
      <div className="relative rounded-lg bg-base-300 border-4 border-primary">
        <img
          ref={imageDom}
          onMouseDown={onMouseMove}
          onMouseMove={onDraw}
          className="m-auto"
          src={image}
          width={500}
          height={500}
          alt={params.image}
        />
        <div
          className={`border-2 border-error pointer-events-none`}
          style={{
            position: "absolute",
            top: mousePosition[1],
            left: mousePosition[0],
            minHeight: mousePosition[3] - mousePosition[1],
            minWidth: mousePosition[2] - mousePosition[0],
            visibility: visible ? "visible" : "hidden",
          }}
        ></div>
      </div>
    </main>
  );
}
