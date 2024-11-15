import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanByLender } from '../../Redux/Slices/loanSlice'; // Adjust path as needed
import moment from 'moment'; // You can use moment to format dates

export default function Outward({ navigation }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(''); // State to handle search input
  const { lenderLoans, loading, error } = useSelector(state => state.loans);

  useEffect(() => {
    // Dispatching the action to fetch loans by lender when the component mounts
    dispatch(getLoanByLender());
  }, [dispatch]);

  // If data is still loading or if there's an error
  if (loading) {
    return <Text style={styles.emptyText}>Loading...</Text>;
  }

  // Filter the loans based on the search query
  const filteredLoans = lenderLoans?.filter(loan =>
    loan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>My Given Loans</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name..."
          value={searchQuery}
          onChangeText={setSearchQuery} // Update search query on input change
        />
      </View>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() =>
          navigation.navigate('AddDetails', {
            // You can adjust based on how you want to pass data
          })
        }
      >
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>

      <ScrollView style={styles.nameListContainer}>
        {filteredLoans?.length === 0 ? (
          <Text style={styles.emptyText}>No loans found</Text>
        ) : (
          filteredLoans?.map((loan, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('LoanDetailScreen', { loanDetails: loan })
              }
            >
              <View style={styles.dataCard}>
                <View style={styles.dataContainer}>
                  <Icon
                    name="user"
                    size={30}
                    color="#FF6B35"
                    style={styles.userIcon}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.dataLabel}>
                      Full Name: <Text style={styles.dataText}>{loan.name}</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Loan Amount: <Text style={styles.dataText}>{loan.amount} Rs</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Purpose: <Text style={styles.dataText}>{loan.purpose}</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Status: <Text style={styles.dataText}>{loan.status}</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Loan Start Date: <Text style={styles.dataText}>{moment(loan.loanStartDate).format('LL')}</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Loan End Date: <Text style={styles.dataText}>{moment(loan.loanEndDate).format('LL')}</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Aadhaar Number: <Text style={styles.dataText}>{loan.aadhaarNumber}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: 10,
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
  plusButton: {
    position: 'absolute',
    top: 85,
    right: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
  plusButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  nameListContainer: {
    marginBlock: 10,
    paddingHorizontal: 15,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 50,
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
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 0,
    marginLeft: 10,
  },
  dataText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 0,
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
});
