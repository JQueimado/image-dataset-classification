"use client";

export default function Image({ params }: { params: { image: string } }) {
  const image = `/imgs/${params.image}`;

  const onMouseMove = (e: React.MouseEvent) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    console.log(x, y);
  };

  return (
    <main className="grid place-content-center h-full">
      <div className="rounded-lg bg-base-300 p-4 border-4 border-primary">
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
