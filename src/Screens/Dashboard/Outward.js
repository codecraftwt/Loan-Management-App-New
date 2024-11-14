import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Outward({ navigation }) {
  const [formData, setFormData] = useState([]);

  // Fetch data from the mock API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://6645f7a451e227f23aad333e.mockapi.io/api/data');
        const data = await response.json();
        setFormData(data);  // Set the fetched data into formData state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);  // The empty dependency array ensures this runs once when the component mounts

  const handleFormDataUpdate = newData => {
    setFormData(prevData => [...prevData, newData]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>My Given Loans</Text>
      </View>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() =>
          navigation.navigate('AddDetails', {
            updateFormData: handleFormDataUpdate,  // Passing the update function to AddDetails screen
          })
        }
      >
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>

      <ScrollView style={styles.nameListContainer}>
        {formData.length === 0 ? (
          <Text style={styles.emptyText}>No given loans</Text>
        ) : (
          formData.map((data, index) => (
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
                      <Text style={styles.dataText}>{data.loanBalance}</Text> Rs
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
    top: 75, 
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
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
    marginTop: 70, 
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
    marginBottom: 6
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
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
  }
});
