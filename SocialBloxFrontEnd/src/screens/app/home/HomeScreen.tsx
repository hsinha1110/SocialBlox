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
} from '../../../redux/asyncThunk/auth.asyncThunk';
import { IMAGES } from '../../../constants/Images';
import styles from './styles';
import OptionModal from '../../../components/modal/optionsModal/OptionsModal';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../../constants/ScreenNames';

const HomeScreen: FC = () => {
  const [postId, setPostId] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [count, setCount] = useState<number>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.post,
  );
  console.log(userName, 'userName');
  console.log(postId, 'postId');
  console.log(userId, 'userId');

  useEffect(() => {
    dispatch(getPostThunk())
      .unwrap()
      .then((res: any) => {
        console.log(res, '...get post thunk');
        if (res?.data?.[0]?.username) {
          setPostId(res.data[0]._id);
          setUserName(res.data[0].username);
          setUserId(res.data[0].userId);
        }
      })
      .catch(err => console.log(err, '...err'));
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

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Image
          style={styles.profileImage}
          source={{
            uri: item.profilePic
              ? item.profilePic
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png', // fallback
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
          <TouchableOpacity>
            <Image source={IMAGES.like} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.actionText}>
            {item?.likes?.length || 0} Likes
          </Text>
        </View>

        <View style={styles.actionItem}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.CommentScreen, {
                postId: item._id,
                userId: item.userId,
                username: item.username,
              })
            }
          >
            <Image source={IMAGES.comments} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.actionText}>{count} Comments</Text>
        </View>
      </View>
    </View>
  );

  const handleDeletePost = () => {
    if (selectedPost?._id) {
      dispatch(deletePostByIdThunk({ postId: selectedPost._id }))
        .unwrap()
        .then(() => {
          console.log('Deleted post:', selectedPost._id);
          setOpenModal(false);
        })
        .catch(err => console.log('Delete error:', err));
    } else {
      setOpenModal(false);
    }
  };

  return (
    <ScreenWrapper>
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
