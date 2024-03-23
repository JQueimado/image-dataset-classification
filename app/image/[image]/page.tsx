"use client";

import { createRef, useEffect, useMemo, useState } from "react";

export default function ImagePage({ params }: { params: { image: string } }) {
  /* Consts */
  const image = `/imgs/${params.image}`;
  const width = 600;
  const hight = 800;

  /* Memo */
  const imageComp = useMemo<HTMLImageElement>(() => {
    const img = new Image();
    img.src = image;
    return img;
  }, [image]);

  /* State */
  /* 0:x0, 1:y0, 2:x1, 3:y1, 4:w, 5:h, 6:cx, 7:cy */
  const [mousePosition, setMousePosition] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [areas, setAreas] = useState<Array<Array<number>>>([]);
  const [draw, setDraw] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const canvasDom = createRef<HTMLCanvasElement>();

  const onMouseClick = (e: React.MouseEvent) => {
    if (!canvasDom.current) return;
    if (!draw && !visible) {
      var rect = canvasDom.current.getBoundingClientRect();
      let x0 = e.clientX - rect.left;
      let y0 = e.clientY - rect.top;
      setMousePosition([x0, y0, 0, 0]);
      setDraw(true);
      setVisible(true);
    } else if (draw) {
      setDraw(false);
    } else {
      setDraw(false);
      setMousePosition([0, 0, 0, 0]);
      setVisible(false);
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
  };

  const onAddClick = (e: any) => {
    areas.push(mousePosition);
    setAreas(areas);
    setMousePosition([0, 0, 0, 0, 0, 0, 0, 0]);
    setVisible(false);
  };

  const deleteArea = (i: number) => {
    areas.splice(i, 1);
    setAreas(areas);
  };

  useEffect(() => {
    let canvasComp = canvasDom.current;
    if (!canvasComp) return;
    let DrawContext = canvasComp.getContext("2d");
    if (!DrawContext) return;
    DrawContext.clearRect(0, 0, canvasComp.width, canvasComp.height);
    //Draw image
    DrawContext.drawImage(imageComp, 0, 0, width, hight);
    //Draw Squares
    DrawContext.lineWidth = 2;
    DrawContext.strokeStyle = "#00f";
    DrawContext.setLineDash([12, 15]);
    areas.forEach((area) => {
      DrawContext.strokeRect(area[0], area[1], area[4], area[5]);
    });
    DrawContext.setLineDash([]);
    //Draw current
    DrawContext.strokeStyle = "#f00";
    DrawContext.strokeRect(
      mousePosition[0],
      mousePosition[1],
      mousePosition[4],
      mousePosition[5]
    );
  }, [mousePosition, areas]);

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

      {areas.length > 0 && (
        <div className="overflow-y-auto absolute top-0 right-0 w-[25%] h-full max-h-full bg-base-200">
          <table className="table ">
            <thead>
              <tr>
                <th>Area</th>
                <th>Width</th>
                <th>Hight</th>
                <th>CenterX</th>
                <th>CenterY</th>
                <th>Delete</th>
              </tr>
            </thead>
            {areas.map((area, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{area[4].toFixed(2)}</td>
                <td>{area[5].toFixed(2)}</td>
                <td>{area[6].toFixed(2)}</td>
                <td>{area[7].toFixed(2)}</td>
                <td>
                  <button
                    className="btn"
                    onClick={(e: any) => {
                      deleteArea(i);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}

      <div className="relative rounded-lg bg-base-300 border-4 border-primary">
        <canvas
          ref={canvasDom}
          onMouseMove={onMouseMove}
          onMouseDown={onMouseClick}
        ></canvas>
      </div>
      <button className="btn" onClick={onAddClick}>
        Add
      </button>
    </main>
  );
}
