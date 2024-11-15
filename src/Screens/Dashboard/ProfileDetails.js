import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PromptBox from '../PromptBox.js/Prompt';
import { logout } from '../../Redux/Slices/authslice';

const ProfileDetails = ({ route, navigation }) => {
  const { profileData } = route.params;

  const [isPromptVisible, setIsPromptVisible] = useState(false);

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
    console.log("Canceled logout");
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
      </View>

      {/* Profile Details */}
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <Icon
            name="user"
            size={50}
            color="#FF6B35"
            style={styles.profileIcon}
          />
          <Text style={styles.detailTextName}>{profileData?.userName}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="user" size={28} color="#FF6B35" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailText}>{profileData?.userName}</Text>
          </View>
        </View>

        <View style={styles.hrLine} />
        <View style={styles.row}>
          <Icon name="phone" size={28} color="#FF6B35" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailText}>{profileData?.mobileNo}</Text>
          </View>
        </View>

        <View style={styles.hrLine} />
        <View style={styles.row}>
          <Icon name="message-square" size={28} color="#FF6B35" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailText}>{profileData?.email}</Text>
          </View>
        </View>

        <View style={styles.hrLine} />
        <View style={styles.row}>
          <Icon
            name="credit-card"
            size={28}
            color="#FF6B35"
            style={styles.icon}
          />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Aadhar Card No</Text>
            <Text style={styles.detailText}>{profileData?.aadharCardNo}</Text>
          </View>
        </View>

        <View style={styles.hrLine} />
        <View style={styles.row}>
          <Icon name="map-pin" size={28} color="#FF6B35" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailText}>{profileData.address}</Text>
          </View>
        </View>
        <View style={styles.hrLine} />

        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Icon name="log-out" size={28} color="#FF6B35" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#FFF',
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
    fontFamily: 'Poppins-Regular',
    color: '#FF6B35',
    marginLeft: 18,
  },
  hrLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#FF6B35',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
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
    backgroundColor: '#FF6B35',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
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
    paddingBlock: 3
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
