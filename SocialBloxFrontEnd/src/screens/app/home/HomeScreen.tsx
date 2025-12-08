import React, { FC, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../../components/globals/ScreenWrapper';
import { AppDispatch, RootState } from '../../../redux/store';
import { getPostThunk } from '../../../redux/asyncThunk/auth.asyncThunk';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.post,
  );

  useEffect(() => {
    dispatch(getPostThunk()); // Fetch posts once
  }, [dispatch]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      <Text style={styles.caption}>{item.caption}</Text>
    </View>
  );

  return (
    <ScreenWrapper>
      {loading && <ActivityIndicator size="large" color="black" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ padding: 10, flexGrow: 1 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No posts found</Text>
            </View>
          }
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 2,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});

export default HomeScreen;
