import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import PromptBox from '../PromptBox.js/Prompt';
import { logout } from '../../Redux/Slices/authslice';
import useFetchUserFromStorage from '../../Redux/hooks/useFetchUserFromStorage';
import { logo } from '../../Assets';


export default function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Getting user data from Redux store
  const user = useSelector(state => state.auth.user);

  useFetchUserFromStorage();

  const aadhaarNumber = user?.aadhaarNumber || user?.aadharCardNo;


  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const navigateToProfileDetails = () => {
    navigation.navigate('ProfileDetails', { profileData: user });
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
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

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Profile</Text>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Profile Information */}
        <View style={styles.profileInfo}>
          <Icon
            name="user"
            size={60}
            color="#b80266"
            style={styles.profileIcon}
          />
          {/* Displaying user data*/}
          {user ? (
            <>
              <Text style={styles.profileName}>{user.userName}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </>
          ) : (
            <ActivityIndicator size="small" color="#b80266" />
          )}
        </View>

        {/* Settings Section */}
        <View style={styles.profileContent}>
          <View style={styles.optionsContainer}>
            {/* Settings Option */}
            <TouchableOpacity
              style={styles.option}
              onPress={navigateToSettings}
            >
              <Icon name="settings" size={20} color="#333333" />
              <Text style={styles.optionText}>Settings</Text>
            </TouchableOpacity>

            {/* Profile Option */}
            <TouchableOpacity
              style={styles.option}
              onPress={navigateToProfileDetails}>
              <Icon name="user" size={20} color="#333333" />
              <Text style={styles.optionText}>Personal Details</Text>
            </TouchableOpacity>

            {/* Loan History Option */}
            <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate('OldHistoryPage', { aadhaarNumber }); }} >
              <Icon name="file-text" size={20} color="#333333" />
              <Text style={styles.optionText}>Loan History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate('HelpAndSupportScreen'); }}>
              <Icon name="help-circle" size={20} color="#333333" />
              <Text style={styles.optionText}>Help & Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Prompt */}
      <PromptBox
        visible={isPromptVisible}
        message="Are you sure you want to logout?"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
    backgroundColor: '#f5f5f5',
  },
  headerBar: {
    backgroundColor: '#b80266',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    elevation: 5,
    position: 'relative',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  logo: {
    width: 80,
    height: 40,
    position: 'absolute',
    right: 0,
    top: 15,
  },
  profileContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileIcon: {
    backgroundColor: '#FFA36C',
    padding: 15,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#333333',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333333',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#b80266',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 40,
    marginBlock: 20,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
