import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config";

export const uploadPhoto = async (image, folder, photoId = nanoid()) => {
  const avatar = await fetch(image);
  const blobPhoto = await avatar.blob();

  const imagesRef = ref(storage, `${folder}/${photoId}`);

  await uploadBytesResumable(imagesRef, blobPhoto);
  const url = await getDownloadURL(imagesRef);

  return url;
};
