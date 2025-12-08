import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  addCommentAsyncThunk,
  deleteCommentByIdThunk,
  getCommentsThunk,
  updateCommentByIdAsyncThunk,
} from '../../../redux/asyncThunk/auth.asyncThunk';
import styles from './styles';
import ScreenWrapper from '../../../components/globals/ScreenWrapper';
import { AppDispatch } from '../../../redux/store';
import { Comment, CommentScreenParams } from '../../../types/types';
import { IMAGES } from '../../../constants/Images';
import OptionModal from '../../../components/modal/optionsModal/OptionsModal';
import EditCommentModal from '../../../components/modal/editModal/EditModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommentScreen: React.FC = () => {
  const route = useRoute();
  const { postId, userId, username } = route.params as CommentScreenParams;

  const dispatch = useDispatch<AppDispatch>();
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await dispatch(getCommentsThunk({ postId })).unwrap();
        const commentIds = response.data.map((item: any) => item._id);
        console.log(commentIds, '......comments id');
        // Save IDs in async storage
        await AsyncStorage.setItem('commentIds', JSON.stringify(commentIds));
        setComments(response.data);
      } catch (err) {
        console.log('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [dispatch, postId]);

  const handlePostComment = async () => {
    if (newComment.trim()) {
      setLoading(true);
      setError(null);
      const commentData = {
        userId,
        postId,
        comment: newComment,
        username,
      };

      try {
        await dispatch(addCommentAsyncThunk(commentData)).unwrap();
        setNewComment('');

        const updatedComments = await dispatch(
          getCommentsThunk({ postId }),
        ).unwrap();
        setComments(updatedComments.data);
      } catch (err) {
        setError('Failed to add comment');
        console.log('Failed to add comment:', err);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Validation', 'Comment cannot be empty');
    }
  };
  const handleDeleteComments = async () => {
    if (selectedComment?._id) {
      try {
        await dispatch(
          deleteCommentByIdThunk({ commentId: selectedComment._id }),
        ).unwrap();

        // Local state se bhi comment hata do
        setComments(prev =>
          prev.filter(comment => comment._id !== selectedComment._id),
        );

        setOpenModal(false);
        setSelectedComment(null);
      } catch (err) {
        console.log('Delete error:', err);
        Alert.alert('Error', 'Failed to delete comment');
        setOpenModal(false);
      }
    } else {
      setOpenModal(false);
    }
  };
  const handleUpdateComment = async () => {
    if (!selectedComment) return;

    try {
      setEditLoading(true);

      await dispatch(
        updateCommentByIdAsyncThunk({
          commentId: selectedComment._id,
          comment: editText,
        }),
      ).unwrap();

      // Local UI update
      setComments(prev =>
        prev.map(c =>
          c._id === selectedComment._id ? { ...c, comment: editText } : c,
        ),
      );

      // Close modal
      setEditModalVisible(false);
      setSelectedComment(null);
    } catch (err) {
      console.log('Error updating comment:', err);
      Alert.alert('Error', 'Failed to update comment');
    } finally {
      setEditLoading(false);
    }
  };
  return (
    <ScreenWrapper style={styles.container}>
      <Text style={styles.title}>Comments for Post</Text>
      <Text style={styles.username}>{username}</Text>

      {/* Loading State */}
      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <FlatList
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.commentsList}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
              }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.commentUser}>{item.username}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelectedComment(item);
                setOpenModal(true);
              }}
            >
              <Image source={IMAGES.dots} style={styles.dots} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={newComment}
          onChangeText={setNewComment}
        />

        {newComment.trim() && (
          <TouchableOpacity
            style={styles.postButton}
            onPress={handlePostComment}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <OptionModal
        title="Comments Options"
        titleEdit="Edit Comment"
        titleDelete="Delete Comment"
        visible={openModal}
        onClose={() => setOpenModal(false)}
        onEdit={() => {
          if (selectedComment) {
            setEditText(selectedComment.comment);
            setEditModalVisible(true);
          }
        }}
        onDelete={handleDeleteComments}
      />

      <EditCommentModal
        visible={editModalVisible}
        value={editText}
        onChangeText={setEditText}
        onCancel={() => {
          setEditModalVisible(false);
          setSelectedComment(null);
        }}
        onUpdate={handleUpdateComment}
      />
    </ScreenWrapper>
  );
};

export default CommentScreen;
