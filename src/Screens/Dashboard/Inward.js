import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanByAadhar } from '../../Redux/Slices/loanSlice';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { logo } from '../../Assets';

export default function Inward({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const { loans, totalAmount, loading, error } = useSelector((state) => state.loans);

  const aadhaarNumber = user?.aadharCardNo;

  const [searchQuery, setSearchQuery] = useState('');

  // Filtered loans based on search query
  const filteredLoans = loans.filter((loan) =>
    loan.purpose.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search by name
  );

  const formatDate = (date) => moment(date).format('DD-MM-YYYY');

  useFocusEffect(
    React.useCallback(() => {
      if (aadhaarNumber) {
        dispatch(getLoanByAadhar(aadhaarNumber));
        console.log('API Call Triggered on Screen Focus');
      }
    }, [dispatch, aadhaarNumber])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>My Taken Loans</Text>
        <Image source={logo} style={styles.logo} />
      </View>



      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by purpose.."
          value={searchQuery}
          onChangeText={setSearchQuery} // Update search query on input change
        />
      </View>

      {/* List of loans */}
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#b80266" />
        </View>
      ) : (
        <>
          {/* Display total amount */}
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmountText}>Total Loan Amount: {totalAmount} Rs</Text>
          </View>

          <ScrollView style={styles.nameListContainer}>
            {filteredLoans.length === 0 ? (
              <Text style={styles.emptyText}>No loans found</Text>
            ) : (
              filteredLoans.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('LoanDetailScreen', { loanDetails: data, isEdit: false })
                  }
                >
                  <View style={styles.dataCard}>
                    <View style={styles.dataContainer}>
                      <View>
                        <Icon
                          name="account-circle"
                          size={35}
                          color="#b80266"
                          style={styles.userIcon}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.dataLabel}>
                          Purpose:{' '}
                          <Text style={styles.dataText}>{data?.purpose}</Text>
                        </Text>
                        <Text style={styles.dataLabel}>
                          Loan Balance:{' '}
                          <Text style={styles.dataText}>{data?.amount}</Text> Rs
                        </Text>

                        {/* Dynamically change the color of loan status text */}
                        <Text style={styles.dataLabel}>
                          Loan Status:{' '}
                          <Text
                            style={[
                              styles.dataText,
                              data.status === 'pending'
                                ? styles.pendingStatus
                                : data.status === 'paid'
                                  ? styles.paidStatus
                                  : styles.defaultStatus,
                            ]}
                          >
                            {data.status}
                          </Text>
                        </Text>
                        <Text style={styles.dataLabel}>
                          Loan Taken From:{' '}
                          <Text style={styles.dataText}>{data?.lenderId?.userName}</Text>
                        </Text>
                        <Text style={styles.dataLabel}>
                          Loan End Date:{' '}
                          <Text style={styles.dataText}>{formatDate(data?.loanEndDate)}</Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  totalAmountContainer: {
    paddingHorizontal: 18,
    marginTop: 10,
    borderBottomColor: '#ddd',
  },
  searchBarContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  totalAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b80266',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 50,
  },
  nameListContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  dataCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flex: 1,

  },
  userIcon: {
    marginHorizontal: 8,
  },
  textContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 3,
    marginLeft: 20,

  },
  dataText: {
    fontSize: 14,
    color: '#333',
  },

  // New Styles for Loan Status
  pendingStatus: {
    color: 'red', // Pending status will be red
    fontWeight: 'bold',
  },
  paidStatus: {
    color: 'green', // Paid status will be green
    fontWeight: 'bold',
  },
  defaultStatus: {
    color: '#333', // Default color for other statuses (if any)
  },
});
