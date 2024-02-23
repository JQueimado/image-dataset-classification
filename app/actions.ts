"use server";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

export async function addFile(prevState: any, formData: FormData) {
  try {
    const files: File[] | null = formData.getAll("files") as unknown as File[];

    if (!files) {
      return { msg: "No File" };
    }

    files.forEach(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = `public/imgs/${file.name}`;
      await writeFile(path, buffer);
    });
    console.log(files);
    revalidatePath("/");
    return { msg: "ok" };
  } catch (e) {
    return { msg: "error" };
  }
}
