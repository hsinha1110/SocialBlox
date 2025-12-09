import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: moderateScale(20),
  },

  listContainer: {
    paddingBottom: moderateScale(50),
  },

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(280),
  },

  emptyImage: {
    width: moderateScale(100),
    height: moderateScale(100),
  },

  emptyText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  // ========== CARD ==========
  card: {
    backgroundColor: '#fff',
    padding: moderateScale(12),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(10),
    elevation: 3,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(10),
  },

  userName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    flex: 1,
  },

  caption: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(14),
  },

  postImage: {
    width: '100%',
    height: moderateScale(200),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
  },

  noImageText: {
    marginTop: moderateScale(10),
    fontStyle: 'italic',
    color: 'gray',
  },

  // ========== ACTION ROW ==========
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: moderateScale(15),
  },

  actionItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },

  icon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },

  actionText: {
    marginHorizontal: moderateScale(10),
    fontSize: moderateScale(14),
  },
  titleStyle: { color: Colors.black },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    color: Colors.black,
  },
});
