import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanByAadhar } from '../../Redux/Slices/loanSlice';

export default function Inward({ navigation }) {
  const user = useSelector(state => state.auth.user);
  const aadhaarNumber = user?.aadharCardNo;

  const dispatch = useDispatch();
  const { loans, totalAmount, loading, error } = useSelector((state) => state.loans);

  // Fetch loans when component mounts
  useEffect(() => {
    const fetchLoansData = async () => {
      try {
        if (aadhaarNumber) {
          await dispatch(getLoanByAadhar(aadhaarNumber));
        }
      } catch (err) {
        console.error('Error fetching loans:', err);
      }
    };

    fetchLoansData();
  }, [dispatch, aadhaarNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>My Taken Loans</Text>
      </View>

      {/* Display total amount */}
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>Total Loan Amount: {totalAmount} Rs</Text>
      </View>

      {/* List of loans */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <ScrollView style={styles.nameListContainer}>
          {loans.length === 0 ? (
            <Text style={styles.emptyText}>No loans found</Text>
          ) : (
            loans.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('LoanDetailScreen', { loanDetails: data })
                }
              >
                <View style={styles.dataCard}>
                  <View style={styles.dataContainer}>
                    <View>
                      <Icon
                        name="user"
                        size={30}
                        color="#FF6B35"
                        style={styles.userIcon}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.dataLabel}>
                        Full Name:{' '}
                        <Text style={styles.dataText}>{data.name}</Text>
                      </Text>
                      <Text style={styles.dataLabel}>
                        Loan Balance:{' '}
                        <Text style={styles.dataText}>{data.amount}</Text> Rs
                      </Text>

                      {/* Dynamically change the color of loan status text */}
                      <Text style={styles.dataLabel}>
                        Loan Status:{' '}
                        <Text
                          style={[
                            styles.dataText,
                            data.status === 'pending' ? styles.pendingStatus :
                              data.status === 'paid' ? styles.paidStatus :
                                styles.defaultStatus
                          ]}
                        >
                          {data.status}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerBar: {
    backgroundColor: '#FF6B35',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 1,
  },
  totalAmountContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBlock: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 50,
  },
  nameListContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  dataCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userIcon: {
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 0,
    marginTop: 4,
  },
  dataText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },

  // New Styles for Loan Status
  pendingStatus: {
    color: 'red', // Pending status will be red
    fontWeight: 'bold'
  },
  paidStatus: {
    color: 'green', // Paid status will be green
    fontWeight: 'bold'
  },
  defaultStatus: {
    color: '#333', // Default color for other statuses (if any)
  },
});
