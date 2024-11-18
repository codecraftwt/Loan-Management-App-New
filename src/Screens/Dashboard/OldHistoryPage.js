import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanByAadhar } from '../../Redux/Slices/loanSlice';

const OldHistoryPage = ({ route, navigation }) => {
  const { aadharNo } = route.params; // Retrieve Aadhar number from navigation params

  const [expandedLoanIndex, setExpandedLoanIndex] = useState(null); // To track which loan's details are expanded

  const dispatch = useDispatch();

  // Get loan details from Redux store
  const { loans, totalAmount, loading, error } = useSelector(state => state.loans);

  useEffect(() => {
    if (aadharNo) {
      // Dispatch action to fetch loans by Aadhar number when component mounts
      try {
        dispatch(getLoanByAadhar(aadharNo));

      } catch (error) {
        console.log(error, "Error")
      }
    }
  }, [aadharNo, dispatch]);

  const toggleDetails = (index) => {
    setExpandedLoanIndex(expandedLoanIndex === index ? null : index); // Toggle details for the clicked loan
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  const borrower = loans && loans[0];

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

      {
        error ? (
          <Text style={styles.emptyText}>{error.message}</Text>
        ) : (
          <View style={styles.container}>
            <View style={styles.profileInfo}>
              <Icon
                name="user"
                size={50}
                color="#FF6B35"
                style={styles.profileIcon}
              />
              <Text style={styles.detailTextName}>{borrower?.name}</Text>
              <Text style={styles.aadharHeading}>Aadhar No: {aadharNo || borrower?.aadhaarNumber}</Text>
              <Text style={styles.detailText}>Mobile: {borrower?.mobileNumber}</Text>
              <Text style={styles.detailText}>Address: {borrower?.address}</Text>
            </View>

            <Text style={styles.totalAmountText}>Total Loan Amount: {totalAmount} Rs</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Render Loan details */}
              {loans && loans.map((loan, index) => (
                <View key={loan._id} style={styles.loanItem}>
                  <TouchableOpacity
                    onPress={() => toggleDetails(index)}
                    style={styles.loanNameContainer}
                  >
                    <Text style={styles.loanName}>Loan Reason: {loan?.purpose} ({loan?.amount} Rs)</Text>
                    <Icon name={expandedLoanIndex === index ? 'chevron-up' : 'chevron-down'} size={18} color="#FF6B35" />
                  </TouchableOpacity>

                  {expandedLoanIndex === index && (
                    <View style={styles.loanDetailsContainer}>
                      <Text style={styles.loanDetailText}>Loan Amount: {loan?.amount} Rs</Text>
                      <Text style={styles.loanDetailText}>Start Date: {new Date(loan?.loanStartDate).toLocaleDateString()}</Text>
                      <Text style={styles.loanDetailText}>End Date: {new Date(loan?.loanEndDate).toLocaleDateString()}</Text>
                      <Text style={styles.loanDetailText}>Status: {loan?.status}</Text>

                      {/* Lender details */}
                      <Text style={styles.lenderDetailTitle}>Loan given by</Text>
                      <View style={styles.lenderDetailsContainer}>
                        <Text style={styles.lenderDetailText}>Lender: {loan?.lenderId?.userName}</Text>
                        <Text style={styles.lenderDetailText}>Email: {loan?.lenderId?.email}</Text>
                        <Text style={styles.lenderDetailText}>Mobile: {loan?.lenderId?.mobileNo}</Text>
                      </View>

                      {/* Agreement and Digital Signature Links */}
                      <TouchableOpacity onPress={() => Linking.openURL(loan?.agreement)} style={styles.linkButton}>
                        <Text style={styles.linkText}>View Agreement</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Linking.openURL(loan?.digitalSignature)} style={styles.linkButton}>
                        <Text style={styles.linkText}>View Digital Signature</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )
      }

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  headerBar: {
    backgroundColor: '#FF6B35',
    height: 70,
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
    top: 20,
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
    fontWeight: 'bold',
    backgroundColor: '#FFF',
    color: '#FF6B35',
    padding: 10,
    paddingHorizontal: 18,
    margin: 5,
    borderRadius: 10,
  },
  detailTextName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  detailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loanItem: {
    marginBottom: 20,
  },
  loanNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loanName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  loanDetailsContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  loanDetailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  lenderDetailTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 12,
  },
  lenderDetailsContainer: {
    paddingLeft: 20,
    marginTop: 6,
    marginBottom: 12,
  },
  lenderDetailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  linkButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    marginBottom: 0,
  },
  linkText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 60,
  },
});

export default OldHistoryPage;
