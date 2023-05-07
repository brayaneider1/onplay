import firebase from "firebase";
import { firebaseConfig } from "../../common/utils/firebaseConfig";

firebase.initializeApp(firebaseConfig);

// Exporta una promesa para subir archivos multimedia a firebase storage 

export const UploadFirebase = ({ value }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storageRef = firebase.storage().ref(`Archivos/${value.name}`);
      const task = storageRef.put(value);
      task.on("state_changed", async (snapshot) => {
        resolve(await task.snapshot.ref.getDownloadURL());
      });
    }, 1000);
  });
};