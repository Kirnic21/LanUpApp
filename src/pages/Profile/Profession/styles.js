import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#18142F',
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContainerJob: {
    width: Dimensions.get('window').width - 80,
    flex: 0.6,
  },
  ContainerText: {
    width: Dimensions.get('window').width - 90,
    flex: 1,
    alignItems: 'center',
  },
  ContainerBtn: {
    width: Dimensions.get('window').width - 60,
    flex: 0.3,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  chip: {
    backgroundColor: '#FFFFFF5C',
    width: 100,
    marginRight: '2%',
    marginBottom: 5,
  },
  textChip: {
    color: '#18142F',
    fontSize: 16,
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 27,
    lineHeight: 40,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 20,
    textAlign: 'center',
    top: '8%',
    lineHeight: 40,
    letterSpacing: 0.4,
  },
  ActionButton: {
    left: 1,
  },
});

export default styles;
