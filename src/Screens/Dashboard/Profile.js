// Profile.js (Main Screen)
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import PromptBox from '../PromptBox.js/Prompt';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const navigation = useNavigation();  
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const fetchMostRecentProfileData = async () => {
    try {
      const response = await axios.get(
        'https://6645f7a451e227f23aad333e.mockapi.io/api/users',
      );

      const sortedData = response.data.sort((a, b) => b.id - a.id);
      const mostRecentUserId = sortedData[0].id; 

      const profileResponse = await axios.get(
        `https://6645f7a451e227f23aad333e.mockapi.io/api/users/${mostRecentUserId}`,
      );

      setProfileData(profileResponse.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchMostRecentProfileData();
  }, []);

  // Function to navigate to the ProfileDetails screen
  const navigateToProfileDetails = () => {
    navigation.navigate('ProfileDetails', { profileData });
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const handleLogout =() => {
    setIsPromptVisible(true);
  }

  const handleConfirmLogout = () =>{
    setTimeout(() =>{
      setIsPromptVisible(false);
      navigation.replace('Login')
    }, 200)
  };

  const handleCancelLogout = () => {
    setTimeout(() =>{
      setIsPromptVisible(false);
      console.log("canceled logout")
    },200);
  };


  return (
    <>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Profile Information */}
      <View style={styles.profileInfo}>
        <Icon
          name="user"
          size={60}
          color="#FF6B35"
          style={styles.profileIcon}
        />
        {/* Displaying fetched profile name */}
        <Text style={styles.profileName}>
          {profileData ? profileData.name : 'Loading...'}
        </Text>
        {/* Displaying fetched profile email */}
        <Text style={styles.profileEmail}>
          {profileData ? profileData.email : 'Loading...'}
        </Text>
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
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <Icon name="file-text" size={20} color="#333333" />
            <Text style={styles.optionText}>Loan History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => {}}>
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
    backgroundColor: '#FFF',
  },
  headerBar: {
    backgroundColor: '#FF6B35',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
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
    backgroundColor: '#FF6B35',
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
