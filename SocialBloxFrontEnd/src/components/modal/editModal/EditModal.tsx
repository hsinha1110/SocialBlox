import React, { FC } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';

interface EditModalProps {
  visible: boolean;
  value: string;
  loading?: boolean;
  onChangeText: (text: string) => void;
  onCancel: () => void;
  onUpdate: () => void;
}

const EditModal: FC<EditModalProps> = ({
  visible,
  value,
  loading = false,
  onChangeText,
  onCancel,
  onUpdate,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Edit Comment</Text>

            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChangeText}
              placeholder="Edit your comment"
              multiline
            />

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onCancel}
                disabled={loading}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.updateBtn, loading && { opacity: 0.6 }]}
                onPress={onUpdate}
                disabled={loading}
              >
                <Text style={styles.updateText}>
                  {loading ? 'Updating...' : 'Update'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default EditModal;
