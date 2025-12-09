import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../../components/globals/ScreenWrapper';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  getPostThunk,
  deletePostByIdThunk,
  getPostLikeByIdThunk,
  getCommentsThunk,
  followUserThunk,
} from '../../../redux/asyncThunk/auth.asyncThunk';
import { IMAGES } from '../../../constants/Images';
import styles from './styles';
import OptionModal from '../../../components/modal/optionsModal/OptionsModal';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../../constants/ScreenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../../../components/globals/AppButton';
import Colors from '../../../constants/Colors';
import { FONTS } from '../../../constants/Fonts';
import { moderateScale } from 'react-native-size-matters';

const HomeScreen: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [id, setId] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

  // map of postId -> comment count
  const [commentsCountMap, setCommentsCountMap] = useState<
    Record<string, number>
  >({});

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.post,
  );

  // Load userId from AsyncStorage once
  useEffect(() => {
    const fetchId = async () => {
      try {
        const stored = await AsyncStorage.getItem('userId');
        if (stored) {
          setId(stored);
        }
      } catch (e) {
        console.error('Error reading userId from AsyncStorage', e);
      }
    };
    fetchId();
  }, []);

  // Fetch posts and comments
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await dispatch(getPostThunk()).unwrap();
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, [dispatch]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await dispatch(getCommentsThunk()).unwrap();
        const comments = res?.data || [];
        setCount(comments.length);
        const commentMap: Record<string, number> = {};
        comments.forEach((item: any) => {
          commentMap[item.postId] = (commentMap[item.postId] || 0) + 1;
        });
        setCommentsCountMap(commentMap);
      } catch (err) {
        console.error('Error fetching comments via thunk:', err);
      }
    };
    fetchComments();
  }, [dispatch]);

  const onLikePress = async (item: any) => {
    if (!id) {
      console.log('No userId available. Please login.');
      return;
    }

    try {
      const res = await dispatch(
        getPostLikeByIdThunk({
          id: item._id,
          body: { userId: id },
        } as any),
      ).unwrap();
      console.log('Like API response:', res);
      await dispatch(getPostThunk()).unwrap();
    } catch (err) {
      console.log('Like error:', err);
    }
  };

  // const handleFollow = async (item: any) => {
  //   console.log('......follow');
  //   if (id && item.userId !== id) {
  //     try {
  //       const response = await dispatch(
  //         followUserThunk({ userId: id, followUserId: item.userId }),
  //       ).unwrap();
  //       console.log('Followed user successfully', response);

  //       // Refresh posts to update followers
  //       await dispatch(getPostThunk()).unwrap();
  //     } catch (error) {
  //       console.log('Error following user:', error);
  //     }
  //   }
  // };

  const renderItem = ({ item }: any) => {
    const commentCount = commentsCountMap[item._id] ?? 0;
    // Check if the current user is following the post owner
    const isFollowing =
      Array.isArray(item.followers) && item.followers.includes(id);

    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Image
            style={styles.profileImage}
            source={{
              uri: item.profilePic
                ? item.profilePic
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
            }}
          />
          <Text style={styles.userName}>{item.username}</Text>
          {item.userId === id && (
            <TouchableOpacity
              onPress={() => {
                setSelectedPost(item);
                setOpenModal(true);
              }}
            >
              <Image source={IMAGES.dots} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          )}
          {/* {item.userId !== id && !isFollowing && (
            <TouchableOpacity onPress={() => handleFollow(item)}>
              <AppButton
                title="Follow"
                style={{ width: 120, bottom: moderateScale(20) }}
                titleStyle={{ color: Colors.white, fontFamily: FONTS.Bold }}
              />
            </TouchableOpacity>
          )} */}
          {item.userId !== id && isFollowing && (
            <TouchableOpacity onPress={() => {}}>
              <AppButton
                title="Following"
                style={{
                  width: 120,
                  bottom: moderateScale(20),
                  backgroundColor: Colors.gray,
                }}
                titleStyle={{ color: Colors.white, fontFamily: FONTS.Bold }}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
        {item?.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.postImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.noImageText}>No image for this post</Text>
        )}
        <View style={styles.actionRow}>
          <View style={styles.actionItem}>
            <TouchableOpacity onPress={() => onLikePress(item)}>
              <Image
                source={
                  item.likes?.includes(id) ? IMAGES.like_fill : IMAGES.like
                }
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.actionText}>
              {Array.isArray(item?.likes) ? item.likes.length : 0} Likes
            </Text>
          </View>

          <View style={styles.actionItem}>
            <TouchableOpacity
              onPress={async () => {
                navigation.navigate(SCREEN_NAMES.CommentScreen, {
                  postId: item._id,
                  userId: item.userId,
                  username: item.username,
                });
              }}
            >
              <Image source={IMAGES.comments} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.actionText}>{commentCount} Comments</Text>
          </View>
        </View>
      </View>
    );
  };

  const handleDeletePost = () => {
    if (selectedPost?._id) {
      dispatch(deletePostByIdThunk({ postId: selectedPost._id }))
        .unwrap()
        .then(() => {
          console.log('Deleted post:', selectedPost._id);
          setOpenModal(false);
          dispatch(getPostThunk()).catch(e => console.log(e));
        })
        .catch(err => console.log('Delete error:', err));
    } else {
      setOpenModal(false);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>SocialBlox</Text>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}

      {error && !loading && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item: any, index) =>
              item._id?.toString() || index.toString()
            }
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No posts found</Text>
              </View>
            }
          />

          <OptionModal
            title="Post Options"
            titleEdit="Edit Post"
            titleDelete="Delete Post"
            visible={openModal}
            onClose={() => setOpenModal(false)}
            onEdit={() => {
              setOpenModal(false);
              if (selectedPost) {
                navigation.navigate(SCREEN_NAMES.UploadScreen, {
                  editMode: true,
                  postId: selectedPost._id,
                  caption: selectedPost.caption,
                  imageUrl: selectedPost.imageUrl,
                });
              }
            }}
            onDelete={handleDeletePost}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default HomeScreen;
