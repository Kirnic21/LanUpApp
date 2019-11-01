import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import ImageOutline from "~/assets/images/outline.png";
import FastImage from "react-native-fast-image";

const PhotoGalleryEmptyState = ({ onPictureAdd }) => {
  return (
    <View styles={styles.container}>
      <View style={styles.emptyStateContainer}>
        <View style={styles.emptyStateBird}>
          <FastImage source={ImageOutline} width={192} height={142} />
        </View>
        <View style={styles.emptyStateContainerMessage}>
          <Text style={styles.emptyStateTitle}>Galeria vazia!</Text>
          <Text style={styles.emptyStateSubTitle}>Adicione midias</Text>
        </View>
        <TouchableOpacity onPress={onPictureAdd} style={styles.emptyStateCameraContainer}>
          <MaterialCommunityIcons name="image-plus" size={38} color="#707070" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyStateContainer: {
    alignItems: 'center',
    width
  },
  emptyStateBird: {
    paddingTop: 88,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyStateContainerMessage: {
    paddingTop: 46,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyStateTitle: {
    color: '#707070',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  emptyStateSubTitle: {
    color: '#ACACAC',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  },
  emptyStateCameraContainer: {
    width: 81,
    height: 81,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    marginTop: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  }
})

export default PhotoGalleryEmptyState