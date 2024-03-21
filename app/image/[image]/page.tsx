"use client";

import { createRef, useEffect, useState } from "react";

export default function ImagePage({ params }: { params: { image: string } }) {
  const image = `/imgs/${params.image}`;
  const imageComp = new Image();
  imageComp.src = image;
  const width = 600;
  const hight = 800;
  /* 0:x0, 1:y0, 2:x1, 3:y1, 4:w, 5:h, 6:cx, 7:cy */
  const [mousePosition, setMousePosition] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [areas, setAreas] = useState<Array<Array<Number>>>([[]]);
  const [draw, setDraw] = useState<boolean>(false);

  const canvasDom = createRef<HTMLCanvasElement>();

  const onMouseClick = (e: React.MouseEvent) => {
    if (!canvasDom.current) return;
    if (!draw) {
      var rect = canvasDom.current.getBoundingClientRect();
      let x0 = e.clientX - rect.left;
      let y0 = e.clientY - rect.top;
      setMousePosition([x0, y0, 0, 0]);
      drawSquare();
      setDraw(true);
    } else if (draw) {
      setDraw(false);
    } else {
      setDraw(false);
      setMousePosition([0, 0, 0, 0]);
      drawSquare();
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!draw || !canvasDom.current) return;
    var rect = canvasDom.current.getBoundingClientRect();

    let x0 = mousePosition[0];
    let y0 = mousePosition[1];

    let x1 = e.clientX - rect.left;
    let y1 = e.clientY - rect.top;

    let width = x1 - x0;
    /* if (width < 0) width *= -1; */
    let hight = y1 - y0;
    /* if (hight < 0) hight *= -1; */

    let cx = x0 + width / 2;
    let cy = y0 + hight / 2;
    setMousePosition([x0, y0, x1, y1, width, hight, cx, cy]);
    drawSquare();
  };

  const drawSquare = () => {
    let canvasComp = canvasDom.current;
    if (!canvasComp) return;
    let DrawContext = canvasComp.getContext("2d");
    if (!DrawContext) return;
    DrawContext.clearRect(0, 0, canvasComp.width, canvasComp.height);
    DrawContext.drawImage(imageComp, 0, 0, width, hight);
    DrawContext.strokeStyle = "#f00";
    DrawContext.strokeRect(
      mousePosition[0],
      mousePosition[1],
      mousePosition[4],
      mousePosition[5]
    );
  };

  useEffect(() => {
    /*Set Canvas Size*/
    let canvasComp = canvasDom.current;
    if (!canvasComp) return;
    canvasComp.width = width;
    canvasComp.height = hight;
    canvasComp.getContext("2d")?.drawImage(imageComp, 0, 0, width, hight);
  }, []);

  return (
    <main className="relative grid place-content-center h-full">
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

      <div className="relative rounded-lg bg-base-300 border-4 border-primary">
        <canvas
          ref={canvasDom}
          onMouseMove={onMouseMove}
          onMouseDown={onMouseClick}
        ></canvas>
      </div>
    </main>
  );
}
