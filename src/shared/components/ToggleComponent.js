import React from "react";
import PropTypes from "prop-types";
import { Animated, Easing, TouchableOpacity } from "react-native";
import dimensions from "~/assets/Dimensions/index";

const knobOffset = dimensions(22);

export default class Toggle extends React.Component {
  static propTypes = {
    isOn: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    onColor: PropTypes.string,
    offColor: PropTypes.string
  };

  static defaultProps = {
    isOn: false,
    onColor: "limegreen",
    offColor: "gray"
  };

  state = {
    isOn: this.props.isOn,
    onColor: this.props.onColor,
    offColor: this.props.offColor,
    animatedValue: new Animated.Value(
      this.props.isOn ? knobOffset : dimensions(6)
    )
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOn !== this.props.isOn) {
      this.setState({ isOn: this.props.isOn }, () => {
        Animated.timing(this.state.animatedValue, {
          toValue: this.state.isOn ? knobOffset : dimensions(6),
          easing: Easing.elastic(0.7),
          duration: 100,
          useNativeDriver: true
        }).start();
      });
    }
  }

  handlePress() {
    this.setState({ isOn: !this.state.isOn }, () =>
      this.props.onToggle(this.state.isOn)
    );
  }

  render() {
    const { isOn, onColor, offColor } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          backgroundColor: isOn ? onColor : offColor,
          width: dimensions(40),
          height: dimensions(20),
          borderRadius: dimensions(32),
          paddingVertical: dimensions(3.5)
        }}
        onPress={() => this.handlePress()}
      >
        <Animated.View
          style={{
            width: dimensions(16),
            height: dimensions(16),
            backgroundColor: "#FFF",
            borderRadius: dimensions(32),

            transform: [
              {
                translateX: this.state.animatedValue
              }
            ]
          }}
        />
      </TouchableOpacity>
    );
  }
}
