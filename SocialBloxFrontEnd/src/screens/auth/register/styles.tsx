import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  headerImage: { flex: 1, width: '100%' },
  headerTitle: {
    marginHorizontal: moderateScale(20),
    bottom: moderateScale(30),
  },
  inputContainer: {
    marginTop: moderateScale(30),
  },
  buttonContainer: {
    marginBottom: moderateScale(5),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(20),
    justifyContent: 'space-around',
  },
  genderButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  gapStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default styles;
