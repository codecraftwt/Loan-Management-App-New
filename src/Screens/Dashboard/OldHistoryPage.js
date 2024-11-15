import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanByAadhar } from '../../Redux/Slices/loanSlice';

const OldHistoryPage = ({ route, navigation }) => {
  const { aadharNo } = route.params; // Retrieve Aadhar number from navigation params

  const [expandedContractor, setExpandedContractor] = useState(null); // To track which contractor's details are expanded

  const dispatch = useDispatch();

  // Get loan details from Redux store
  const { loans, totalAmount, loading, error } = useSelector(state => state.loans);

  useEffect(() => {
    if (aadharNo) {
      // Dispatch action to fetch loans by Aadhar number when component mounts
      dispatch(getLoanByAadhar(aadharNo));
    }
  }, [aadharNo, dispatch]);

  const toggleDetails = (index) => {
    setExpandedContractor(expandedContractor === index ? null : index); // Toggle details for the clicked contractor
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
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
          <Text style={styles.aadharHeading}>Aadhar No: {aadharNo}</Text>
        </View>


        <>
          <Text style={styles.totalAmountText}>Total Loan Amount: {totalAmount} Rs</Text>

          {/* Render Loan details */}
          {loans && loans.map((loan, index) => (
            <View key={index} style={styles.detailsItem}>
              <TouchableOpacity
                onPress={() => toggleDetails(index)}
                style={styles.contractorNameContainer}
              >
                <Text style={styles.contractorName}>Contractor Name: {loan.contractorName}</Text>
              </TouchableOpacity>

              {expandedContractor === index && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailText}>Taken Loan: {loan.amount} Rs</Text>
                  <Text style={styles.detailText}>Pending Amount: {loan.pendingAmount} Rs</Text>
                  <Text style={styles.detailText}>Date: {loan.date}</Text>
                </View>
              )}
            </View>
          ))}
        </>

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
    marginTop: 14,
  },
  contractorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginVertical: 10,
  },
  detailsItem: {
    marginBottom: 15,
    marginLeft: 18,
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
  aadharHeading: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default OldHistoryPage;
