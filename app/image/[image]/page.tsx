"use client";

import { createRef, useState } from "react";

export default function Image({ params }: { params: { image: string } }) {
  const image = `/imgs/${params.image}`;
  /* 0:x0, 1:y0, 2:x1, 3:y1, 4:w, 5:h, 6:cx, 7:cy */
  const [mousePosition, setMousePosition] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0, 0, 0,
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

    let x0 = mousePosition[0];
    let y0 = mousePosition[1];

    let x1 = e.clientX - rect.left;
    let y1 = e.clientY - rect.top;

    let width = x1 - x0;
    if (width < 0) width *= -1;
    let hight = y1 - y0;
    if (hight < 0) hight *= -1;

    let cx = x0 + width / 2;
    let cy = y0 + hight / 2;
    setMousePosition([x0, y0, x1, y1, width, hight, cx, cy]);
  };

  return (
    <main className="relative grid place-content-center h-full">
      {visible && (
        <div className="absolute top-0 left-0">
          <h1>Box Cordinates:</h1>
          <h2 className="pl-4">X:{mousePosition[6]}</h2>
          <h2 className="pl-4">Y:{mousePosition[7]}</h2>
          <h2 className="pl-4"> Width:{mousePosition[4]}</h2>
          <h2 className="pl-4"> Hight:{mousePosition[5]}</h2>

          <h2 className="pl-4">X0:{mousePosition[0]}</h2>
          <h2 className="pl-4">Y0:{mousePosition[1]}</h2>
          <h2 className="pl-4">X1:{mousePosition[2]}</h2>
          <h2 className="pl-4">Y1:{mousePosition[3]}</h2>
        </div>
      )}
      <div className="relative rounded-lg bg-base-300 border-4 border-primary">
        <img
          ref={imageDom}
          onMouseDown={onMouseMove}
          onMouseMove={onDraw}
          className="m-auto"
          src={image}
          alt={params.image}
        />
        <div
          className={`border-2 border-error pointer-events-none`}
          style={{
            position: "absolute",
            top: mousePosition[1],
            left: mousePosition[0],
            minHeight: mousePosition[5],
            minWidth: mousePosition[4],
            visibility: visible ? "visible" : "hidden",
          }}
        ></div>
        <div
          className="border-2 border-error pointer-events-none min-h-2 min-w-2"
          style={{
            position: "absolute",
            top: mousePosition[7],
            left: mousePosition[6],
            transform: "translateX(-50%) translateY(-50%)",
            visibility: visible ? "visible" : "hidden",
          }}
        ></div>
      </div>
    </main>
  );
}
