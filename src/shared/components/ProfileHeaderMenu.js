import * as React from "react";
import { View } from "react-native";
import { Button, Paragraph, Menu, Divider, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
    return (
      <Provider>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Menu
            style={{ position: "absolute", left: "48%", top: "-40%" }}
            visible={this.state.visible}
            onDismiss={this._closeMenu}
            anchor={
              <Icon
                name="more-vert"
                size={25}
                color="#FFF"
                onPress={this._openMenu}
              />
            }
          >
            {this.props.children}
          </Menu>
        </View>
      </Provider>
    );
  }
}
