import * as ImagePicker from 'react-native-image-picker';
import { v4 as uuidv4 } from 'uuid'
import "react-native-get-random-values"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../config'

export const pickImage = async () => {
    let result = ImagePicker.launchImageLibrary();
    return result;
}

export const uploadImage = async (uri, path, fName) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileName = fName || uuidv4();
    const imageRef = ref(storage, `${path}/${fileName}.jpeg`);

    const snapshot = await uploadBytes(imageRef, blob, {
        contentType: "image/jpeg",
    });

    blob.close();
    const url = await getDownloadURL(snapshot.ref);
    return { url, fileName };
}

