import {
  StyleSheet,
} from 'react-native';

module.exports = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1E90FF',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionArea: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSelectionArea: {
    flexDirection: 'row',
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    height: 170,
    width: 170,
    borderRadius:50,
  },
  questionText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  },
  button: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 20,
    marginLeft: 60,
    marginRight: 60,
    justifyContent: 'center',
    borderRadius:17,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },

});
