import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

export default function LoanDetailScreen({ route, navigation }) {
  const { loanDetails, isEdit } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  // Format dates using moment
  const formatDate = (date) => moment(date).format('DD-MM-YYYY');

  // Default profile icon
  const defaultProfileIcon = <Icon name="user" size={50} color="#FFFFFF" style={styles.profileIcon} />;

  // Check if the user has an image or fall back to the default icon
  const profileImage = loanDetails.profileImage
    ? { uri: loanDetails.profileImage }
    : null;

  const handleEdit = () => {
    navigation.navigate('AddDetails', { loanDetails }); // Navigate to Edit Screen
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}

      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Loan Details</Text>
        {/* Edit Icon */}
        {
          isEdit && (
            <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
              <Icon name="edit" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )
        }

      </View>

      {/* ScrollView for loan details */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Loan Information */}
        <View style={styles.loanInfoContainer}>
          <Text style={styles.loanTitle}>Loan Overview</Text>

          {/* Profile Section */}
          <View style={styles.profileInfo}>
            {profileImage ? (
              <Image source={profileImage} style={styles.profileImage} />
            ) : (
              defaultProfileIcon // Default profile icon when no image is found
            )}
            <Text style={styles.name}>{loanDetails.name}</Text>
          </View>

          {/* Full Name */}
          <View style={styles.row}>
            <Icon name="user" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{loanDetails.name}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Contact No */}
          <View style={styles.row}>
            <Icon name="phone" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Contact No</Text>
              <Text style={styles.value}>{loanDetails.mobileNumber}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Aadhar No */}
          <View style={styles.row}>
            <Icon name="credit-card" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Aadhar Card No</Text>
              <Text style={styles.value}>{loanDetails.aadhaarNumber}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Loan Balance */}
          <View style={styles.row}>
            <Icon name="dollar-sign" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Loan Amount</Text>
              <Text style={styles.value}>{loanDetails.amount} Rs</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Loan Status */}
          <View style={styles.row}>
            <Icon name="check-circle" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Loan Status</Text>
              <Text style={styles.value}>{loanDetails.status}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Purpose */}
          <View style={styles.row}>
            <Icon name="book" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Purpose</Text>
              <Text style={styles.value}>{loanDetails.purpose}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Start Date */}
          <View style={styles.row}>
            <Icon name="calendar" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Loan Start Date</Text>
              <Text style={styles.value}>{formatDate(loanDetails.loanStartDate)}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* End Date */}
          <View style={styles.row}>
            <Icon name="calendar" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Loan End Date</Text>
              <Text style={styles.value}>{formatDate(loanDetails.loanEndDate)}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Address */}
          <View style={styles.row}>
            <Icon name="map-pin" size={28} color="#b80266" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{loanDetails.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  editButton: {
    position: 'absolute',
    right: 20,
    top: 30
  },

  headerBar: {
    backgroundColor: '#b80266',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },

  scrollContainer: {
    paddingBottom: 20,
  },

  profileInfo: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#b80266',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFA36C',
  },

  profileIcon: {
    backgroundColor: '#FFA36C',
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  loanInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    paddingVertical: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  loanTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#b80266',
    marginBottom: 15,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  icon: {
    marginRight: 12,
  },

  dataContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },

  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: 8,
  },
});
