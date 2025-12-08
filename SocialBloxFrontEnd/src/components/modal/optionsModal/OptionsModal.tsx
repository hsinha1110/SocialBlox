import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { IMAGES } from '../../../constants/Images';

interface OptionModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  title: string;
  titleDelete: string;
  titleEdit: string;
}

const OptionModal: React.FC<OptionModalProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  title,
  titleDelete,
  titleEdit,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Click outside to close */}
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />

        <View style={styles.modalBox}>
          <Text style={styles.title}>{title}</Text>

          {/* EDIT POST */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => {
              onClose(); // Close first
              onEdit(); // Then call edit
            }}
          >
            <Image source={IMAGES.pencil} style={{ width: 20, height: 20 }} />
            <Text style={styles.optionText}>{titleEdit}</Text>
          </TouchableOpacity>

          {/* DELETE POST */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => {
              onClose(); // Close first
              onDelete(); // Then call delete
            }}
          >
            <Image source={IMAGES.delete} style={{ width: 20, height: 20 }} />
            <Text style={[styles.optionText, { color: 'red' }]}>
              {titleDelete}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OptionModal;
