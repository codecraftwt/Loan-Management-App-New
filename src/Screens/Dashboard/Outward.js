import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getLoanByLender, updateLoanStatus} from '../../Redux/Slices/loanSlice';
import moment from 'moment';
import {logo} from '../../Assets';
import PromptBox from '../PromptBox.js/Prompt';
import Toast from 'react-native-toast-message';

export default function Outward({navigation}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const {lenderLoans, loading, error} = useSelector(state => state.loans);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  useEffect(() => {
    dispatch(getLoanByLender());
  }, [dispatch]);

  // Filter the loans based on the search query
  const filteredLoans = lenderLoans?.filter(loan =>
    loan?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = date => moment(date).format('DD-MM-YYYY');

  // Show the prompt when updating the status
  const handleStatusUpdate = loan => {
    setSelectedLoan(loan);
    setIsPromptVisible(true);
  };

  const handleConfirm = async () => {
    const newStatus = selectedLoan.status === 'pending' ? 'paid' : 'pending';
    try {
      await dispatch(
        updateLoanStatus({loanId: selectedLoan._id, status: newStatus}),
      )
        .unwrap()
        .then(() => {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Loan status updated successfully',
          });
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: error.message || 'Error updating loan status',
      });
    } finally {
      setIsPromptVisible(false);
    }
  };

  const handleCancel = () => {
    setSelectedLoan(null);
    setIsPromptVisible(false);
  };

  // Pull-to-refresh logic
  const onRefresh = async () => {
    // setRefreshing(true);
    await dispatch(getLoanByLender());
    // setRefreshing(false);
  };

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
        onPress={() => navigation.navigate('AddDetails', {})}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator size="large" color="#b80266" style={styles.loader} />
      )}

      {/* Loan List */}
      <ScrollView
        style={styles.nameListContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Pass the refreshing state
            onRefresh={onRefresh} // Call onRefresh function when pull-to-refresh happens
          />
        }>
        {loading === false && filteredLoans?.length === 0 ? (
          <Text style={styles.emptyText}>No loans found</Text>
        ) : (
          filteredLoans?.map((loan, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('LoanDetailScreen', {
                  loanDetails: loan,
                  isEdit: true,
                })
              }>
              <View style={styles.dataCard}>
                <View style={styles.dataContainer}>
                  {loan?.profileImage ? (
                    <Image
                      source={{uri: loan?.profileImage}}
                      style={styles.userImage}
                    />
                  ) : (
                    <Icon
                      name="account-circle"
                      size={40}
                      color="#b80266"
                      style={styles.userIcon}
                    />
                  )}

                  <View style={styles.textContainer}>
                    <Text style={styles.dataLabel}>
                      Full Name:{' '}
                      <Text style={styles.dataText}>{loan.name}</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Loan Amount:{' '}
                      <Text style={styles.dataText}>{loan.amount} Rs</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Status: <Text style={styles.dataText}>{loan.status}</Text>
                    </Text>
                    <Text style={styles.dataLabel}>
                      Loan End Date:{' '}
                      <Text style={styles.dataText}>
                        {formatDate(loan.loanEndDate)}
                      </Text>
                    </Text>
                  </View>

                  {/* Status Update Icon */}
                  <TouchableOpacity
                    style={styles.statusUpdateButton}
                    onPress={() => handleStatusUpdate(loan)}>
                    <Icon
                      name={
                        loan.status === 'pending'
                          ? 'check-box-outline-blank'
                          : 'check-box'
                      }
                      size={28}
                      color={loan.status === 'pending' ? '#b80266' : '#4CAF50'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Prompt Box for Status Change */}
      <PromptBox
        visible={isPromptVisible}
        message={`Are you sure you want to change the status to ${
          selectedLoan?.status === 'pending' ? 'paid' : 'pending'
        }?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
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
    flex: 1,
  },
  headerBar: {
    backgroundColor: '#b80266',
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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
  plusButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#b80266',
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
    borderRadius: 18,
    padding: 10,
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
    marginHorizontal: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
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
  statusUpdateButton: {
    marginLeft: 10,
    marginRight: 5,
  },
});
