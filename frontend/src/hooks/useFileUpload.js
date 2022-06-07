import storage from "../firebase.config"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { toast } from "react-toastify"

export const useFileUpload = (path) => {
  const uploadFile = async (file) => {
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, `${path}/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    const imageUrl = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl)
          })
        }
      )
    }).catch((error) => {
      toast.error("File is not uploaded.")
    })
    return imageUrl
  }
  return { uploadFile }
}