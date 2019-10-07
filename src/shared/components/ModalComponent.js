import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Modal, {
  ModalContent, SlideAnimation, ModalTitle, ModalFooter,
} from 'react-native-modals';

export default class ModalComponent extends Component {
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Show Modal"
          onPress={() => {
            this.setState({ visible: true });
          }}
        />
        <Modal
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
        >
          <ModalContent>
            {this.props}
          </ModalContent>
        </Modal>
      </View>
    );
  }
}
