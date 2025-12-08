import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: moderateScale(12),
    color: Colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(8),
    fontSize: moderateScale(14),
    marginBottom: moderateScale(16),
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(10),
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  updateBtn: {
    flex: 1,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    backgroundColor: '#5A3FFF', // EngineerCodewala jaisa purple
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  updateText: {
    color: Colors.white,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});

export default styles;
