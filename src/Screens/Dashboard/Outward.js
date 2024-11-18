import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanByLender } from '../../Redux/Slices/loanSlice';
import moment from 'moment';
import { logo } from '../../Assets';

export default function Outward({ navigation }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const { lenderLoans, loading, error } = useSelector(state => state.loans);

  useEffect(() => {
    dispatch(getLoanByLender());
  }, [dispatch]);

  // Filter the loans based on the search query
  const filteredLoans = lenderLoans?.filter(loan =>
    loan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date) => moment(date).format('DD-MM-YYYY');

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>My Given Loans</Text>
        <Image source={logo} style={styles.logo} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Plus Button */}
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() =>
          navigation.navigate('AddDetails', {
          })
        }
      >
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator size="large" color="#FF6B35" style={styles.loader} />
      )}

      {/* Loan List */}
      <ScrollView style={styles.nameListContainer}>
        {filteredLoans?.length === 0 ? (
          <Text style={styles.emptyText}>No loans found</Text>
        ) : (
          filteredLoans?.map((loan, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('LoanDetailScreen', { loanDetails: loan, isEdit: true })
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
                      Status: <Text style={styles.dataText}>{loan.status}</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Loan End Date: <Text style={styles.dataText}>{formatDate(loan.loanEndDate)}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  headerBar: {
    backgroundColor: '#FF6B35',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
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
  plusButton: {
    position: 'absolute',
    top: 95,
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
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 50,
  },
  dataCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
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
    marginHorizontal: 10,
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
  loader: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
