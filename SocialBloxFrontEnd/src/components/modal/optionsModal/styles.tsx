import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  overlayTouchable: {
    flex: 1,
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: moderateScale(15),
  },

  optionRow: {
    paddingVertical: moderateScale(12),
    flexDirection: 'row',
  },

  optionText: {
    fontSize: moderateScale(16),
    marginHorizontal: moderateScale(10),
  },

  cancelBtn: {
    marginTop: moderateScale(15),
    paddingVertical: moderateScale(12),
    backgroundColor: '#eee',
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },

  cancelText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});
export default styles;
