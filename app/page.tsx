import UploadForm from "./UploadForm";

// export const getServerSideProps = (async () => {
//   const images: Images = { names: [] };
//   try {
//     images.names = fs.readdirSync(
//       path.join(process.cwd(), "/public/imgs")
//     ) as string[];
//     console.log(images.names);
//     return { props: { images } };
//   } catch (e) {
//     return { props: { images } };
//   }
// }) satisfies GetServerSideProps<{ images: Images }>;

export default function Home() {
  return (
    <main className="relative w-full">
      <div className="absoulute top-0 left-0 right-0 w-1/6 min-h-screen bg-base-300">
        <h1 className="text-center">Images</h1>
        <UploadForm />
        <div className="overflow-x">
          {/* {images?.names.map((dir) => (
            <Image
              src={`/imgs/${dir}`}
              width={500}
              height={500}
              alt={"image"}
            />
          ))} */}
        </div>
      </div>
    </main>
  );
}
