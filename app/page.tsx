import UploadForm from "./UploadForm";
import fs from "fs";
import path from "path";
import Image from "next/image";

interface Images {
  names: string[];
}

export default function Home() {
  const images: Images = { names: [] };
  try {
    images.names = fs.readdirSync(
      path.join(process.cwd(), "/public/imgs")
    ) as string[];
    console.log(images.names);
  } catch (e) {}

  return (
    <main className="relative w-full">
      <div className="absoulute top-0 left-0 right-0 w-1/6 min-h-screen bg-base-300">
        <h1 className="text-center">Images</h1>
        <UploadForm />
        <div className="overflow-x">
          {images?.names.map((dir, i) => (
            <Image
              src={`/imgs/${dir}`}
              width={500}
              height={500}
              alt={"image"}
              key={i}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
