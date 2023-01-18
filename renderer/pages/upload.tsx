import React, { useState } from "react";
import { testUpload } from "../api/storage";

export default function upload() {
  const [img, setImg] = useState<File | null>(null);

  const test = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const upload = async (e: any) => {
    e.preventDefault();
    console.log("1");
    if (!img) return;
    console.log("2");
    const result = await testUpload(img);
    console.log("result", result);
  };

  return (
    <form onSubmit={(e) => upload(e)}>
      <input type="file" placeholder="파일" onChange={(e) => test(e)} />
      <button type="submit" onClick={(e) => upload(e)}>
        upload
      </button>
    </form>
  );
}
