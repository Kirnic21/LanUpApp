import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
  btnRegister: {
    backgroundColor: '#46C5F3'
  },
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-around'
  },
  Btn: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 55,
  },
  textTitle: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'Helvetica Now Micro',
    fontWeight: '600',
  },
  textSubtitle: {
    marginTop: 20,
    marginBottom: 20,
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'Helvetica Now Micro',
    fontWeight: '700'
  },
  TextInput: {
    width: Dimensions.get('window').width - 100,
    height: 51
  },
});

export default styles;