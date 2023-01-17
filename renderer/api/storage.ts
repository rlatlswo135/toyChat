import { fbApp, fbStorage } from "./firebase";
import { ref, uploadString, uploadBytes } from "firebase/storage";

export const uploadFile = async (file: string) => {
  try {
    const storageRef = ref(fbStorage, `profile/test`);
    uploadString(storageRef, file).then((item) => {
      console.log("uploadtest", item);
    });
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
