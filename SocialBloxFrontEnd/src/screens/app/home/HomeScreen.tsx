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
} from '../../../redux/asyncThunk/auth.asyncThunk';
import { IMAGES } from '../../../constants/Images';
import styles from './styles';
import OptionModal from '../../../components/modal/optionsModal/OptionsModal';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../../constants/ScreenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [id, setId] = useState<string | null>(null);
  const [count, setCount] = useState<number>();

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.post,
  );

  useEffect(() => {
    const fetchId = async () => {
      try {
        const stored = await AsyncStorage.getItem('userId');
        if (stored) {
          setId(stored);
          console.log('User ID from AsyncStorage:', stored);
        }
      } catch (e) {
        console.log('Error reading userId from AsyncStorage', e);
      }
    };
    fetchId();
  }, []);

  // unified current user id (use store first, then AsyncStorage)

  // initial posts load
  useEffect(() => {
    dispatch(getPostThunk()).catch(err => console.log('get posts err', err));
  }, [dispatch]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          'http://192.168.1.40:8200/socialapp/api/post/comment/getcomments',
        );

        const result = await response.json(); // Convert response to JSON
        setCount(result?.data?.length || 0);
        console.log('Full Response:', result);

        if (result?.data) {
          result.data.forEach((item: any) => {
            console.log(item._id);
          });
        }
      } catch (error) {
        console.log('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);
  const onLikePress = async (item: any) => {
    console.log('LIKE PRESSED ITEM 👉', item);

    try {
      if (!id) {
        console.log('No userId available. Please login.');
        return;
      }
      const res = await dispatch(
        getPostLikeByIdThunk({
          id: item._id,
          body: { userId: id },
        } as any),
      ).unwrap();

      console.log('Like API response:', res);

      // refresh posts to reflect updated likes
      await dispatch(getPostThunk()).unwrap();
    } catch (err) {
      console.log('Like error:', err);
    }
  };

  // 1) Simple: render होने पे console में पोस्ट और उसकी comments दिखाओ
  const renderItem = ({ item }: any) => {
    // debug prints
    console.log('RENDER POST ITEM 👉', item);
    console.log('item._id:', item._id);
    console.log('item.comments (from post object):', item?.comments);

    return (
      <View style={styles.card}>
        {/* header */}
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
          <TouchableOpacity
            onPress={() => {
              setSelectedPost(item);
              setOpenModal(true);
            }}
          >
            <Image source={IMAGES.dots} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>

        {/* caption, image */}
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

        {/* actions */}
        <View style={styles.actionRow}>
          <View style={styles.actionItem}>
            <TouchableOpacity onPress={() => onLikePress(item)}>
              <Image source={IMAGES.like} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.actionText}>
              {Array.isArray(item?.likes) ? item.likes.length : 0} Likes
            </Text>
          </View>

          <View style={styles.actionItem}>
            {/* WHEN pressing comment icon: navigate + ALSO print comments from API */}
            <TouchableOpacity
              onPress={async () => {
                // 1) print whatever is present on item
                console.log(
                  'NAVIGATE -> item.comments (local):',
                  item?.comments,
                );

                // 2) fetch from server to be sure (if your API supports filter by postId)
                try {
                  const resp = await fetch(
                    `http://192.168.1.40:8200/socialapp/api/post/comment/getcomments?postId=${item._id}`,
                  );
                  const json = await resp.json();
                  console.log('COMMENTS FROM API for postId', item._id, json);
                } catch (e) {
                  console.log('Error fetching comments from API', e);
                }

                // 3) then navigate to CommentScreen as before
                navigation.navigate(SCREEN_NAMES.CommentScreen, {
                  postId: item._id,
                  userId: item.userId,
                  username: item.username,
                });
              }}
            >
              <Image source={IMAGES.comments} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.actionText}>
              <Text style={styles.actionText}>{count} Comments</Text>
            </Text>
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
          // refresh posts after delete
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
