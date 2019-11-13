import React from "react";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import ImageResizer from "react-native-image-resizer";

class ImageSelector extends React.Component {
  onActionSheetPress = index => {
    switch (index) {
      case 0:
        this.openGallery();
        break;
      case 1:
        this.openCamera();
      default:
        break;
    }
  };

  openGallery = () => {
    const { width, height } = this.props;
    ImagePicker.openPicker({
      width: width,
      height: height,
      cropping: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      includeBase64: true
    }).then(this.onImageSelected);
  };

  openCamera = () => {
    const { width, height } = this.props;
    ImagePicker.openCamera({
      width: width,
      height: height,
      cropping: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      includeBase64: true
    }).then(this.onImageSelected);
  };

  onImageSelected = image => {
    const { width, height } = this.props;
    ImageResizer.createResizedImage(image.path, width, height, "JPEG", 20)
      .then(response => {
        const file = {
          type: image.mime,
          uri: response.uri,
          name: response.name,
          data: image.data
        };
        this.props.onImageSelected(file);
      })
      .catch(err => alert("Erro ao carregar a imagem"));
  };

  render() {
    const { title } = this.props;
    return (
      <ActionSheet
        ref={o => (this.ActionSheet = o)}
        title={title}
        options={["Galeria", "Câmera", "Cancelar"]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={this.onActionSheetPress}
      />
    );
  }
}

ImageSelector.defaultProps = {
  title: "Onde está sua imagem?"
};

export default ImageSelector;
