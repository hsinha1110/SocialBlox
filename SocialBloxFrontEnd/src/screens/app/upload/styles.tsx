import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  postContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 1.5,
  },
  buttonContainer: {
    height: Dimensions.get('window').height / 1.18,
    alignItems: 'flex-end',
    width: '100%',
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: Colors.white,
    width: '90%',
  },
  titleStyle: { color: Colors.black },
  postImageStyle: {
    width: '90%',
    marginHorizontal: 20,
    height: 200,
    borderRadius: 10,
    position: 'absolute',
  },
  removeButton: {
    backgroundColor: Colors.white,
    position: 'absolute',
    alignItems: 'flex-end',
  },
  removeImage: {
    width: 20,
    height: 20,
  },
  addButtonStyle: {
    backgroundColor: Colors.black,
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
  plusIcon: { width: 20, height: 20, tintColor: Colors.white },
  disabledButton: {
    height: moderateScale(45),
    backgroundColor: Colors.gray,
    width: '90%',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(30),
  },
});
export default styles;
