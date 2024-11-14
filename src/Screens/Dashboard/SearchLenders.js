import React, {useState} from 'react';
import {View, TextInput, FlatList, Text, StyleSheet} from 'react-native';

const lenders = [
  {id: '1', name: 'Alice', loanAmount: 50000, interestRate: 10, duration: 12},
  {id: '2', name: 'Bob', loanAmount: 100000, interestRate: 9, duration: 24},
  {id: '3', name: 'Charlie', loanAmount: 20000, interestRate: 15, duration: 6},
];

const SearchLenders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLenders = lenders.filter(
    lender =>
      lender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lender.loanAmount.toString().includes(searchTerm),
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Search for Lenders</Text>
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search by lender name or loan amount"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Lender Cards */}
      <FlatList
        data={filteredLenders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>Loan Amount: ₹{item.loanAmount}</Text>
            <Text style={styles.cardText}>
              Interest Rate: {item.interestRate}%
            </Text>
            <Text style={styles.cardText}>
              Duration: {item.duration} months
            </Text>
          </View>
        )}
      />
    </View>
  );
};

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
    marginBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
});

export default SearchLenders;
