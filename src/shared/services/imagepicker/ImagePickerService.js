import ImagePicker from 'react-native-image-picker';

const options = {
    customButtons: [],
    mediaType: 'photo',
    maxWidth: 1024,
    maxHeight: 768,
    quality: 0.5,
    videoQuality: 'low',
    storageOptions: {
        skipBackup: true
    }
};

export const loadFromGallery = () => new Promise(resolve =>
    ImagePicker.launchImageLibrary(options, response => response.didCancel ? resolve() : resolve(response.data)))

export const loadFromCamera = () => new Promise(resolve =>
    ImagePicker.launchCamera(options, response => response.didCancel ? resolve() : resolve(response.data)))