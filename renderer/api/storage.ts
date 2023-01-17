import { fbApp, fbStorage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";

export function base64ToArrayBuffer(base64: string) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export const uploadFile = async (file: string) => {
  try {
    const storageRef = ref(fbStorage, `test-image`);
    // const arb = Uint8Array.from(atob(file));
    const res = await fetch(file);
    const arb = base64ToArrayBuffer(file.split(",")[1]);
    const blob = await res.blob();

    console.log("uploadfile -> 전");
    await uploadBytes(storageRef, arb, {
      contentType: "image/png",
    }).then((item) => console.log("item", item));
    console.log("uploadfile -> 후");
    return;
    // { contentType: type }
    // return result;
  } catch (err: any) {
    console.log("err");
    console.error(err);
    return err.code;
  }
};
