import React from "react";

export default function Image({ params }: { params: { image: string } }) {
  const image = `/imgs/${params.image}`;
  return (
    <main className="flex place-items-center h-full">
      <div className="max-w-[80%] m-auto h-full">
        <img className="max-h-full max-w-full" src={image} alt={params.image} />
      </div>
    </main>
  );
}
