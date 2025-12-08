import React, { FC } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

interface NoInternetProps {
  show: boolean;
}

const NoInternet: FC<NoInternetProps> = ({ show }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <Modal visible={show} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Connection Error</Text>
            <Text style={styles.modalText}>
              Oops! Looks like your device is not connected to the Internet.
            </Text>
            <Text style={styles.modalTextSmile}>😔</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    marginTop: 30,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 30,
    marginHorizontal: 10,
  },
  modalTextSmile: {
    fontSize: 35,
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

export default NoInternet;
