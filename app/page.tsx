"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  /* State */
  const [files, setFiles] = useState<File>();
  /* On Submit */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files) return;
    try {
      const data = new FormData();
      data.set("files", files);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(async (response) => {
        console.log("ok");
      });
    } catch (e) {}
  };

  return (
    <main className="relative w-full">
      <div className="absoulute top-0 left-0 right-0 w-1/6 min-h-screen bg-base-300">
        <h1 className="text-center">Images</h1>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => setFiles(e.target.files?.[0])}
          />
          <input className="btn" type="submit" value="Upload" />
        </form>
        <div className="overflow-x"></div>
      </div>
    </main>
  );
}
