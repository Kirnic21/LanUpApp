import * as React from "react";
import { View, Text } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <Menu
        ref={this.setMenuRef}
        button={<Icon onPress={this.showMenu} name="more-vert" size={25} style={{ color: '#FFF' }} />}
      >
        {this.props.children}
      </Menu>
    );
  }
}
