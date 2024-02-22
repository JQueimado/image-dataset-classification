import { writeFile } from "fs/promises";

export async function POST(request: Request) {
  try {
    const formdata = await request.formData();
    const files: File[] | null = formdata.getAll("files") as unknown as File[];

    if (!files) {
      return Response.json({ msg: "No File" });
    }

    files.forEach(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = `public/imgs/${file.name}`;
      await writeFile(path, buffer);
    });

    return Response.json({ msg: "ok" });
  } catch (e) {
    return Response.json({ msg: "Error" });
  }
}
