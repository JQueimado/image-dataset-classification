"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addFile } from "@/app/actions";

const initialState = {
  msg: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" aria-disabled={pending}>
      Upload
    </button>
  );
}

export default function UploadForm() {
  const [state, formAction] = useFormState(addFile, initialState);
  return (
    <form action={formAction}>
      <input
        type="file"
        id="files"
        name="files"
        className="file-input file-input-bordered w-full max-w-xs"
        required
        multiple
      />
      <SubmitButton />
      <p aria-live="polite" role="status">
        {state?.msg}
      </p>
    </form>
  );
}
