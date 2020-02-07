import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { keyframes, stagger } from "popmotion";
import dimensions from "~/assets/Dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";

const COUNT = 1;
const DURATION = 1100;
const initialPhase = { scale: 1, opacity: 1 };
const constructAnimations = () =>
  [...Array(COUNT).keys()].map(() => initialPhase);
class ButtonPulse extends React.Component {
  state = {
    animations: constructAnimations(),
    startAnimations: false
  };
  componentDidMount() {
    this.animateCircles();
  }

  animateCircles = () => {
    const actions = Array(COUNT).fill(
      keyframes({
        values: [initialPhase, { scale: 1.1, opacity: 1 }, { scale: 1 }],
        duration: DURATION,
        loop: Infinity,
        yoyo: Infinity
      })
    );

    stagger(actions, DURATION / COUNT).start(animations => {
      this.setState({ animations });
    });
  };

  static defaultProps = {
    startAnimations: false
  };

  render() {
    const { animations } = this.state;
    const {
      circleStyle,
      titleStyle,
      title,
      styleButton,
      startAnimations,
      children,
      onPress
    } = this.props;
    return (
      <View style={styles.container}>
        {startAnimations ? (
          <View>
            {animations.map(({ opacity, scale }, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.circle,
                  { transform: [{ scale }], opacity },
                  circleStyle
                ]}
              ></Animated.View>
            ))}
          </View>
        ) : (
          <></>
        )}
        <View style={{ position: "absolute" }}>
          <TouchableOpacity style={[styles.btn, styleButton]} onPress={onPress}>
            {children}
            <Text style={[titleStyle]}>{title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    backgroundColor: "#FFF",
    height: dimensions(125),
    width: dimensions(125),
    borderRadius: dimensions(180)
  },
  btn: {
    backgroundColor: "#FFF",
    width: dimensions(115),
    height: dimensions(115),
    borderRadius: dimensions(160),
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ButtonPulse;
