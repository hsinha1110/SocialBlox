import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors'; // Adjust according to your theme

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: moderateScale(15),
  },

  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    color: Colors.black,
  },

  username: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginBottom: moderateScale(15),
    color: Colors.black,
  },

  commentsList: {
    flexGrow: 1,
    paddingBottom: moderateScale(15),
  },

  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.gray,
    padding: moderateScale(10),
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(8),
    elevation: 3,
    justifyContent: 'space-between',
  },

  avatar: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(12),
  },
  dots: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(20),
    left: moderateScale(5),
  },

  commentUser: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: Colors.black,
  },

  commentText: {
    fontSize: moderateScale(14),
    color: Colors.black,
    marginTop: moderateScale(2),
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(15),
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    fontSize: moderateScale(16),
  },

  postButton: {
    backgroundColor: Colors.black,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
    marginLeft: moderateScale(10),
  },

  buttonText: {
    color: Colors.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default styles;
