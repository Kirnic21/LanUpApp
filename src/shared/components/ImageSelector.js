import React from "react";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import ImageResizer from "react-native-image-resizer";

class ImageSelector extends React.Component {
  onActionSheetPress = (index) => {
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
    const { width, height, cropperCircleOverlay } = this.props;
    ImagePicker.openPicker({
      width: width,
      height: height,
      cropping: true,
      cropperCircleOverlay: cropperCircleOverlay,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then(this.onImageSelected);
  };

  openCamera = () => {
    const { width, height, cropperCircleOverlay } = this.props;
    ImagePicker.openCamera({
      width: width,
      height: height,
      cropping: true,
      cropperCircleOverlay: cropperCircleOverlay,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then(this.onImageSelected);
  };

  onImageSelected = (image) => {
    let divider = 1;
    if (image.size > 300000) {
      divider = image.size / 300000;
    }
    ImageResizer.createResizedImage(
      image.path,
      image.width / divider,
      image.height / divider,
      "JPEG",
      100,
      0,
      null
    )
      .then((response) => {
        const file = {
          type: image.mime,
          uri: response.uri,
          name: response.name,
          data: image.data,
        };
        this.props.onImageSelected(file);
      })
      .catch((err) => alert("Erro ao carregar a imagem"));
  };

  render() {
    const { title } = this.props;
    return (
      <ActionSheet
        ref={(o) => (this.ActionSheet = o)}
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
  title: "Onde está sua imagem?",
};

export default ImageSelector;
