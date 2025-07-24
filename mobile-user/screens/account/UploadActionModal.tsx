import {
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

interface UploadActionModalProps {
  modalVisible: boolean;
  handleModalVisibility: () => void;
  handleSetProfileImage: (img: any) => void;
}

const OptionsCard = ({
  name,
  size,
  color,
  onPress,
}: {
  name: string;
  size: number;
  color: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.optionCardContainer} onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

const UploadActionModal: React.FC<UploadActionModalProps> = ({
  modalVisible,
  handleModalVisibility,
  handleSetProfileImage,
}) => {
  // Request Camera Permission for Android
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take pictures.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const OptionsClick = async (mode: 'camera' | 'library' | 'delete') => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      if (mode === 'camera') {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
          Alert.alert('Camera permission denied');
          return;
        }

        const result = await launchCamera(options);
        handleResponse(result);
        handleModalVisibility();
      } else if (mode === 'library') {
        const result = await launchImageLibrary(options);
        handleResponse(result);
        handleModalVisibility();
      } else if (mode === 'delete') {
        handleSetProfileImage(null);
        handleModalVisibility();
      }
    } catch (error) {
      console.error('Media selection error:', error);
    }
  };

  const handleResponse = (result: any) => {
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('Gallery Error: ', result.errorMessage);
    } else {
      const imageUri = result.assets?.[0]?.uri;
      console.log('Library image URI:', imageUri);
      handleSetProfileImage(imageUri || null);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handleModalVisibility();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.closeIconWrapper}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => handleModalVisibility()}
            >
              <Ionicons
                name={'close'}
                size={20}
                color={'#000000'}
                style={styles.closeIconStyle}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.optionCardWrapper}>
            <OptionsCard
              name={'camera-outline'}
              onPress={() => OptionsClick('camera')}
              color={'#FF4433'}
              size={40}
              key={'camera-outline'}
            />
            <OptionsCard
              name={'document-attach-outline'}
              onPress={() => OptionsClick('library')}
              color={'#FF4433'}
              size={40}
              key={'document-attach-outline'}
            />
            <OptionsCard
              name={'trash'}
              onPress={() => OptionsClick('delete')}
              color={'#000000'}
              size={40}
              key={'trash'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UploadActionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeIconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
  closeIconContainer: {
    top: -30,
    right: -20,
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: '#d0d0d0',
  },
  closeIconStyle: {
    padding: 5,
  },
  optionCardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
  },
  optionCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#E5E4E2',
    borderRadius: 7,
    marginHorizontal: 5,
    height: 85,
    width: 85,
  },
});
