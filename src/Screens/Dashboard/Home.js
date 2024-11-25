import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'; // Importing Feather icons for buttons
import {logo} from '../../Assets';
import {getLoanStats} from '../../Redux/Slices/loanSlice';
import {useDispatch, useSelector} from 'react-redux';
import useFetchUserFromStorage from '../../Redux/hooks/useFetchUserFromStorage';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const loanCount = useSelector(state => state.loans.loanStats);

  useFetchUserFromStorage();

  const aadhaarNumber = user?.aadhaarNumber || user?.aadharCardNo;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getLoanStats(aadhaarNumber));
    }, [dispatch, user, loanCount]),
  );

  // Static data for loan stats
  const loanStats = [
    {
      title: 'Loans Given',
      value: loanCount?.loansGivenCount || 0,
      icon: 'arrow-up-circle',
      backgroundColor: '#b80266',
    },
    {
      title: 'Loans Taken',
      value: loanCount?.loansTakenCount || 0,
      icon: 'arrow-down-circle',
      backgroundColor: '#4CAF50',
    },
    {
      title: 'Loans Paid',
      value: loanCount?.loansPaidCount || 0,
      icon: 'check-circle',
      backgroundColor: '#2196F3',
    },
    {
      title: 'Active Loans',
      value: loanCount?.loansPendingCount || 0,
      icon: 'clock',
      backgroundColor: 'gray',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#b80266" />

      {/* Header Section */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Home</Text>
        <Image source={logo} style={styles.logo} />
      </View>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {/* Main Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.welcomeText}>Welcome to the Loan App</Text>
          <Text style={styles.subtitle}>Track your loan activities</Text>

          <View style={styles.statsWrapper}>
            {loanStats.map((stat, index) => (
              <View
                key={index}
                style={[
                  styles.statCard,
                  {backgroundColor: stat.backgroundColor},
                ]}>
                <Icon name={stat.icon} size={36} color="#fff" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Subscribe Section */}
        <View style={styles.content}>
          <Text style={styles.additionalInfo}>
            For our premium featurers, please subscribe to our service
          </Text>

          {/* Subscribe Button */}
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => navigation.navigate('SubscriptionScreen')}>
            <Text style={styles.subscribeButtonText}>Subscribe Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBar: {
    height: 70,
    backgroundColor: '#b80266',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginBottom: 30,
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
  statsSection: {
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 15,
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  statCard: {
    width: '45%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  statTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  additionalInfo: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBlock: 20,
  },
  subscribeButton: {
    backgroundColor: '#b80266',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
