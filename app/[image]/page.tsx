import React from "react";

export default function Image({ params }: { params: { image: string } }) {
  return <div>{params.image}</div>;
}
