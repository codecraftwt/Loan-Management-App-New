import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PromptBox from '../PromptBox.js/Prompt';
import {
  logout,
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

  const [isPromptVisible, setIsPromptVisible] = useState(false);

  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to track temporary edited data
  const [editedData, setEditedData] = useState({
    userName: profileData?.userName,
    mobileNo: profileData?.mobileNo,
    email: profileData?.email,
    address: profileData?.address,
  });

  const [profileImage, setProfileImage] = useState(
    profileData?.profileImage || null,
  );

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

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User canceled image picker');
    } else if (response.errorCode) {
      console.error(response.errorMessage);
    } else {
      const source = {uri: response.assets[0].uri};
      setProfileImage(source);
      const fileData = response.assets[0];
      dispatch(updateUserProfile(fileData))
        .unwrap()
        .then(() => {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Profile Image Updated Successfully',
          });
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: error.message || 'Profile Update Failed',
          });
        });
    }
  };

  const handleLogout = () => {
    setIsPromptVisible(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      setIsPromptVisible(false);
      navigation.replace('Login');
    }, 200);
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
              {profileImage ? (
                <Image source={profileImage} style={styles.profileImage} />
              ) : (
                <Icon
                  name="user"
                  size={50}
                  color="#b80266"
                  // style={styles.profileIcon}
                />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.detailTextName}>{profileData?.userName}</Text>
        </View>

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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  profileIcon: {
    backgroundColor: '#FFA36C',
    padding: 15,
    borderRadius: 40,
  },
  editIcon: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  input: {
    height: 40,
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
