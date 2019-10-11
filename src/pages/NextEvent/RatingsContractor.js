import React, { Component } from 'react';
import { View } from 'native-base';
import {
  StyleSheet,
  Image,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { CheckBox } from 'react-native-elements';
import image from '../../assets/images/Girl.jpg';

class RatingsContractor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      starCountOne: 0,
      starCountTwo: 0,
      checked: false,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onStarRatingPressOne(ratingOne) {
    this.setState({
      starCountOne: ratingOne,
    });
  }

  onStarRatingPressTwo(ratingTwo) {
    this.setState({
      starCountTwo: ratingTwo,
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={styles.ContainerImg}>
          <Image source={image} style={styles.Img} />
          <Text style={styles.TitleImg}>Cláudia</Text>
          <Text style={styles.subTitle}>Avalie sua experiência</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.ContainerStar}
          data={[
            {
              key: '1',
              titleOne: 'Gestão',
              titleTwo: 'Alimentação',
              titleThree: 'Estrutura',
            },
          ]}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.titleOne}>
                {item.titleOne}
              </Text>
              <View style={[styles.ratingStarOne, styles.Star]}>
                <StarRating
                  style
                  animation="pulse"
                  disabled={false}
                  emptyStar="star"
                  emptyStarColor="#C5B9EE"
                  fullStarColor="#FFCC00"
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                  onPress={() => {
                    this.setState({
                      op: 0,
                    });
                  }}
                />
              </View>
              <Text style={styles.titleTwo}>
                {item.titleTwo}
              </Text>
              <View style={[styles.ratingStarTwo, styles.Star]}>
                <StarRating
                  style
                  animation="pulse"
                  disabled={false}
                  emptyStar="star"
                  emptyStarColor="#C5B9EE"
                  fullStarColor="#FFCC00"
                  maxStars={5}
                  rating={this.state.starCountOne}
                  selectedStar={ratingOne => this.onStarRatingPressOne(ratingOne)}
                />
              </View>
              <Text style={styles.titleThree}>
                {item.titleThree}
              </Text>
              <View style={[styles.ratingStarThree, styles.Star]}>
                <StarRating
                  style
                  animation="pulse"
                  disabled={false}
                  emptyStar="star"
                  emptyStarColor="#C5B9EE"
                  fullStarColor="#FFCC00"
                  maxStars={5}
                  rating={this.state.starCountTwo}
                  selectedStar={ratingTwo => this.onStarRatingPressTwo(ratingTwo)}
                />
              </View>
              <View style={styles.ContainerInput}>
                <KeyboardAvoidingView behavior="padding">
                  <TextInput
                    placeholder="Ótimo Contratante"
                    placeholderTextColor="#FFF"
                    style={styles.TextInput}
                  />
                  <TextInput
                    style={styles.TextArea}
                    underlineColorAndroid="transparent"
                    placeholder="Alguma coisa..."
                    placeholderTextColor="#FFF"
                    numberOfLines={10}
                    multiline
                  />
                </KeyboardAvoidingView>

              </View>
              <View style={styles.ContainerCheckbox}>
                <CheckBox
                  title="Recomendo trabalhar junto"
                  iconType="MaterialIcons"
                  textStyle={{ color: '#8A98BA' }}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    left: -10,
                  }}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                  checked={this.state.checked}
                  uncheckedIcon="check-box-outline-blank"
                  checkedIcon="check-box"
                  uncheckedColor="#8A98BA"
                  checkedColor="#8A98BA"
                  size={25}
                />
              </View>
            </View>
          )}
          keyExtractor={item => item.key}
        />
        <View style={styles.ContainerBtnNext}>
          <TouchableOpacity style={styles.BtnNext}>
            <Text style={styles.BtnTextNext}>Concluir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#18142F',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ContainerImg: {
    top: '1%',
    height: 170,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  TitleImg: {
    color: '#865FC0',
    fontSize: 25,
    top: 6,
    letterSpacing: 1.2,
  },
  ContainerStar: {
    width: 350,
    top: '4%',
    alignItems: 'center',
  },
  subTitle: {
    color: '#8391B2',
    fontSize: 16,
    letterSpacing: 0.5,
    top: 20,
  },
  ratingStarOne: {
    top: 25,
    marginBottom: 30,
  },
  titleOne: {
    color: '#FFF',
    fontSize: 18,
    top: 15,
    left: 10,
  },
  ratingStarTwo: {
    top: 26,
  },
  titleTwo: {
    color: '#FFF',
    fontSize: 18,
    top: 17,
    left: 8,
  },
  Star: {
    width: 320,
    paddingHorizontal: 20,
    borderRadius: 60,
    backgroundColor: '#1E1A35',
    paddingVertical: 13,
  },
  ratingStarThree: {
    top: 55,
  },
  titleThree: {
    color: '#FFF',
    fontSize: 18,
    top: 49,
    left: 8,
  },
  ContainerInput: {
    width: 320,
    height: 500,
    top: 85,
    alignItems: 'center',
  },
  TextInput: {
    backgroundColor: '#23203F',
    borderColor: '#8A98BA',
    borderWidth: 2,
    borderRadius: 35,
    width: 320,
    padding: 20,
    height: 60,
    color: '#FFF',
  },
  TextArea: {
    top: 30,
    height: 210,
    borderWidth: 2,
    width: 320,
    borderColor: '#8A98BA',
    borderRadius: 35,
    backgroundColor: '#23203F',
    padding: 20,
    textAlignVertical: 'top',
    color: '#FFF',
  },
  ContainerCheckbox: {
    top: -120,
    height: 50,
    width: 320,
  },
  ContainerBtnNext: {
    height: 60,
    width: 240,
    top: -55,
  },
  BtnNext: {
    backgroundColor: '#865FC0',
    borderWidth: 2,
    borderRadius: 30,
    height: 55,
  },
  BtnTextNext: {
    color: '#FFF',
    textAlign: 'center',
    top: 15,
    fontSize: 15,
    letterSpacing: 1,
  },
});

export default RatingsContractor;
