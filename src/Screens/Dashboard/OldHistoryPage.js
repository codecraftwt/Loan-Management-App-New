import React, {useState} from 'react'; // Add useState here
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const OldHistoryPage = ({navigation}) => {
  const [expandedContractor, setExpandedContractor] = useState(null); // To track which contractor's details are expanded

  const toggleDetails = index => {
    setExpandedContractor(expandedContractor === index ? null : index); // Toggle details for the clicked contractor
  };

  return (
    <>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Old History Details</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <Icon
            name="user"
            size={50}
            color="#FF6B35"
            style={styles.profileIcon}
          />
          <Text style={styles.detailTextName}>Rony leo</Text>
          <Text style={styles.aadharHeading}>Aadhar No 123456789090</Text>
        </View>

        <View style={styles.row}>
          <Icon name="user" size={28} color="#FF6B35" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Full Name</Text>
            <Text style={styles.detailText}>Rony leo</Text>
          </View>
        </View>
        <View style={styles.hrLine} />

        <View style={styles.row}>
          <Icon name="phone" size={28} color="#FF6B35" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Contact No</Text>
            <Text style={styles.detailText}>123456789</Text>
          </View>
        </View>
        <View style={styles.hrLine} />

        <View style={styles.row}>
          <Icon name="map-pin" size={28} color="#FF6B35" style={styles.icon} />
          <View style={styles.dataContainer}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailText}>
              Building Number : 64 Street Address
              : 88,
              {/* Post Code : 226698 */}
            </Text>
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
              <Text style={styles.detailLabel}>Loan Balance</Text>
              <Text style={styles.detailText}>6000 Rs</Text>
            </View>
          </View>
          <View style={styles.separator} />
        <View style={styles.hrLine} />

        <View style={styles.detailsItem}>
          {/* Contractor 1 */}
          <TouchableOpacity
            onPress={() => toggleDetails(1)}
            style={styles.contractorNameContainer}>
            <Text style={styles.contractorName}>Contractor Name: Jack</Text>
          </TouchableOpacity>
          {expandedContractor === 1 && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Taken Loan: 2000 Rs</Text>
              <Text style={styles.detailText}>Pending Amount: 2000 Rs</Text>
              <Text style={styles.detailText}>Date: 1 Nov 2024</Text>
            </View>
          )}

          {/* Contractor 2 */}
          <TouchableOpacity
            onPress={() => toggleDetails(2)}
            style={styles.contractorNameContainer}>
            <Text style={styles.contractorName}>Contractor Name: John</Text>
          </TouchableOpacity>
          {expandedContractor === 2 && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Taken Loan: 4000 Rs</Text>
              <Text style={styles.detailText}>Pending Amount: 3000 Rs</Text>
              <Text style={styles.detailText}>Date: 5 Nov 2024</Text>
            </View>
          )}
        </View>
        <View style={styles.hrLine} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  contractorNameContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    // marginBottom: 5,
    marginTop: 14,
  },
  contractorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  hrLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#FF6B35',
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
  detailTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#333333',
    marginBottom: 15,
  },
  detailTextName: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#333333',
  },
  detailsItem: {
    marginBottom: 15,
    marginLeft: 18,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  detailsContainer: {
    paddingLeft: 20,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginRight: 5,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    // marginLeft: 20,
  },
  dataContainer: {
    marginLeft: 10,
  },
  aadharHeading: {
    fontSize: 18
  }
});

export default OldHistoryPage;
