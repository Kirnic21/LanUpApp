import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

class ListModal extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.btnList} onPress={this.props.onPress}>
        <Icon
          name={this.props.icon}
          size={45}
          color="#18142F"
          style={styles.iconList}
        />
        <Text style={styles.textList}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  btnList: {
    backgroundColor: '#B6AED1',
    width: '100%',
    height: 90,
    borderRadius: 15,
    marginTop: 15,
    top: 10,
  },
  textList: {
    color: '#18142F',
    left: 70,
    top: -15,
    fontSize: 20,
  },
  iconList: {
    left: 20,
    top: '25%',
  },
});

export default ListModal;
