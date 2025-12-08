import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  headerContainer: { flex: 0.2, width: '100%' },
  headerImage: { flex: 1, width: '100%' },
  headerTitle: {
    marginHorizontal: moderateScale(20),
    bottom: moderateScale(30),
  },
  inputContainer: {
    marginTop: moderateScale(30),
  },
  buttonContainer: {
    marginTop: moderateScale(180),
  },
  mainContainer: {
    flex: 0.8,
    paddingHorizontal: moderateScale(20),
    justifyContent: 'space-around',
  },
});
export default styles;
