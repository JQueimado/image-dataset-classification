"use client";
import React from "react";

export default function Image({ params }: { params: { image: string } }) {
  const image = `/imgs/${params.image}`;

  const onMouseMove = (e: React.MouseEvent) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    console.log(x, y);
  };

  return (
    <main className="grid place-content-center h-full border-2 border-succsses">
      <div className="border-2 border-error">
        <img
          onMouseMove={onMouseMove}
          className="m-auto"
          src={image}
          width={500}
          height={500}
          alt={params.image}
        />
      </div>
    </main>
  );
}
