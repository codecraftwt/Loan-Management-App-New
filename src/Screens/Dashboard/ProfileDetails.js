import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PromptBox from '../PromptBox.js/Prompt';
import {
  deleteProfileImage,
  logout,
  removeUserDeviceToken,
  updateUser,
  updateUserProfile,
} from '../../Redux/Slices/authslice';
import {useDispatch, useSelector} from 'react-redux';
import useFetchUserFromStorage from '../../Redux/hooks/useFetchUserFromStorage';
import Toast from 'react-native-toast-message';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const ProfileDetails = ({route, navigation}) => {
  // const { profileData } = route.params;

  const dispatch = useDispatch();

  const profileData = useSelector(state => state.auth.user);

  useFetchUserFromStorage();

  const isLoading = useSelector(state => state.auth.loading);

  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [isDeleteImagePromptVisible, setIsDeleteImagePromptVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);

  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to track temporary edited data
  const [editedData, setEditedData] = useState({
    userName: profileData?.userName,
    mobileNo: profileData?.mobileNo,
    email: profileData?.email,
    address: profileData?.address,
  });

  // Handle profile image change
  const handleChangeProfileImage = () => {
    Alert.alert('Change Profile Picture', 'Choose an option', [
      {text: 'Camera', onPress: openCamera},
      {text: 'Gallery', onPress: openGallery},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const openCamera = () => {
    launchCamera(
      {mediaType: 'photo', cameraType: 'front', quality: 1, saveToPhotos: true},
      response => handleImageResponse(response),
    );
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response =>
      handleImageResponse(response),
    );
  };

  const handleImageResponse = async response => {
    if (response.didCancel) {
      console.log('User canceled image picker');
    } else if (response.errorCode) {
      console.error(response.errorMessage);
    } else {
      try {
        setLoading(true);
        // Get the file data from the image picker
        const fileData = response.assets[0];
        const {uri, type, fileName} = fileData;

        // Create FormData to send to the API
        const formData = new FormData();
        formData.append('profileImage', {
          uri,
          type,
          name: fileName || 'profile_image.jpg', // Default name if none is provided
        });

        // Send the image to your backend API
        await dispatch(updateUserProfile(formData)) // Dispatch action to upload image
          .unwrap()
          .then(() => {
            setLoading(false);
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Profile Image Updated Successfully',
            });
          })
          .catch(error => {
            setLoading(false);
            Toast.show({
              type: 'error',
              position: 'top',
              text1: error.message || 'Profile Update Failed',
            });
          });
      } catch (error) {
        console.error('Error while handling image response:', error);
        setLoading(false);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Something went wrong while updating the profile image.',
        });
      }
    }
  };

  const handleLogout = () => {
    setIsPromptVisible(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await dispatch(removeUserDeviceToken({}));

      dispatch(logout());

      setTimeout(() => {
        setIsPromptVisible(false);
        navigation.replace('Login');
      }, 200);
    } catch (error) {
      console.error('Error during logout process:', error);
    }
  };

  const handleCancelLogout = () => {
    setIsPromptVisible(false);
    console.log('Canceled logout');
  };

  // Toggle between edit and view mode
  const toggleEditMode = () => {
    setIsEditing(prevState => !prevState);
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      const response = await dispatch(updateUser(editedData)).unwrap();
      setIsEditing(false);

      Toast.show({
        type: 'success',
        position: 'top',
        text1: response.messsage || 'Profile Edited Successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Profile Edit Failed',
        text2: error?.message || 'An error occurred while saving your changes.',
      });
    }
  };

  // Handle profile deletion
  const handleDeleteProfileImage = () => {
    setIsDeleteImagePromptVisible(true);
  };

  const handleConfirmDeleteImage = async () => {
    try {
      await dispatch(deleteProfileImage()).unwrap();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Profile image deleted successfully',
      });
      setIsDeleteImagePromptVisible(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Failed to delete profile image',
        text2: error?.message || 'An error occurred while deleting the image.',
      });
      setIsDeleteImagePromptVisible(false);
    }
  };

  const handleCancelDeleteImage = () => {
    setIsDeleteImagePromptVisible(false);
  };

  return (
    <>
      {/* Header Bar with Back Button */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Personal Details</Text>
        <TouchableOpacity onPress={toggleEditMode} style={styles.editIcon}>
          <Icon name="edit" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <ScrollView style={styles.container}>
        <View style={styles.profileInfo}>
          {/* Profile Image */}
          <TouchableOpacity onPress={handleChangeProfileImage}>
            <View style={styles.profileImageContainer}>
              {profileData?.profileImage ? (
                <Image
                  source={{uri: profileData.profileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <Icon name="user" size={50} color="#b80266" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.detailTextName}>{profileData?.userName}</Text>

          {/* Delete Profile Image Button */}
          {profileData?.profileImage && (
            <TouchableOpacity
              style={styles.deleteImageButton}
              onPress={handleDeleteProfileImage}>
              <Icon name="trash" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {isLoading ||
          (loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#b80266" />
            </View>
          ))}

        {/* Editable Name Field */}
        <View style={styles.row}>
          <Icon name="user" size={28} color="#b80266" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedData.userName}
                onChangeText={text =>
                  setEditedData({...editedData, userName: text})
                }
              />
            ) : (
              <Text style={styles.detailText}>{profileData?.userName}</Text>
            )}
          </View>
        </View>

        <View style={styles.hrLine} />

        {/* Editable Phone Field */}
        <View style={styles.row}>
          <Icon name="phone" size={28} color="#b80266" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedData.mobileNo}
                onChangeText={text =>
                  setEditedData({...editedData, mobileNo: text})
                }
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.detailText}>{profileData?.mobileNo}</Text>
            )}
          </View>
        </View>

        <View style={styles.hrLine} />

        {/* Editable Email Field */}
        <View style={styles.row}>
          <Icon
            name="message-square"
            size={28}
            color="#b80266"
            style={styles.icon}
          />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedData.email}
                onChangeText={text =>
                  setEditedData({...editedData, email: text})
                }
              />
            ) : (
              <Text style={styles.detailText}>{profileData?.email}</Text>
            )}
          </View>
        </View>

        <View style={styles.hrLine} />

        {/* Non-editable Aadhaar Number */}
        <View style={styles.row}>
          <Icon
            name="credit-card"
            size={28}
            color="#b80266"
            style={styles.icon}
          />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Aadhar Card No</Text>
            <Text style={styles.detailText}>{profileData?.aadharCardNo}</Text>
          </View>
        </View>

        <View style={styles.hrLine} />

        {/* Editable Address Field */}
        <View style={styles.row}>
          <Icon name="map-pin" size={28} color="#b80266" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Address</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedData.address}
                onChangeText={text =>
                  setEditedData({...editedData, address: text})
                }
              />
            ) : (
              <Text style={styles.detailText}>{profileData?.address}</Text>
            )}
          </View>
        </View>

        <View style={styles.hrLine} />

        {/* Edit/Save Button */}
        {isEditing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleSaveChanges}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Icon name="log-out" size={28} color="#b80266" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* PromptBox to confirm logout */}
      <PromptBox
        visible={isPromptVisible}
        message="Are you sure you want to logout?"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      {/* PromptBox for deleting profile image */}
      <PromptBox
        visible={isDeleteImagePromptVisible}
        message="Are you sure you want to delete your profile image?"
        onConfirm={handleConfirmDeleteImage}
        onCancel={handleCancelDeleteImage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#b80266',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 16,
  },
  profileImageContainer: {
    marginBottom: 10,
    borderRadius: 50,
    overflow: 'hidden',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileIcon: {
    backgroundColor: '#FFA36C',
    padding: 15,
    borderRadius: 40,
  },
  deleteImageButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#b80266',
    borderRadius: 15,
    padding: 5,
  },
  detailTextName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editIcon: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 5,
    flex: 1,
  },
  editButton: {
    // marginBlock: 10,
    paddingVertical: 10,
    backgroundColor: '#b80266',
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b80266',
    marginLeft: 18,
  },
  hrLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#b80266',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 16,
  },
  profileIcon: {
    backgroundColor: '#FFA36C',
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
  },
  headerBar: {
    backgroundColor: '#b80266',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    padding: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  detailTextName: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333333',
    paddingBlock: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
    marginBottom: 8,
  },
  dataContainer: {
    marginLeft: 10,
  },
});

export default ProfileDetails;
