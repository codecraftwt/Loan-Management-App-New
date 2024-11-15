import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  applyLoan,
  calculateEmi,
  loanStatus,
  profileImage,
  searchBorrowers,
} from '../../Assets'; // Make sure these imports are correct

export default function Home() {
  const navigation = useNavigation();

  // Define the buttons array with images and screen names
  const buttons = [


    {
      title: 'Search Borrowers',
      screen: 'SearchLenders',
      image: require('../../Assets/search-borrowers.jpg'), // Ensure this image path is correct
    },
    {
      title: 'My Profile',
      screen: 'Profile',
      image: require('../../Assets/profile.jpg'), // Ensure this image path is correct
    },
    {
      title: 'Check Loan Status',
      screen: 'Inward',
      image: require('../../Assets/loan-status.jpg'), // Ensure this image path is correct
    },
    {
      title: 'Contractor Dashboard',
      screen: 'ContractorDashboard',
      image: require('../../Assets/loan-status.jpg'), // Ensure this image path is correct
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />


      {/* Header Bar */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cardsContainer}>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to our App</Text>
          <Text style={styles.subtitle}>
            Subscribe to give loans.
          </Text>
          <Text style={styles.subtitle}>
            Need a loan? Just use our service!
          </Text>

          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => navigation.navigate('SubscriptionScreen')}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>

          {/* Render Cards */}
          <View style={styles.cardsWrapper}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(button.screen)}>
                <Image source={button.image} style={styles.cardImage} />
                <Text style={styles.cardText}>{button.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBar: {
    backgroundColor: '#FF6B35',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subscribeButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    width: '80%',
    marginBlock: 20,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#53258f',
    marginBottom: 10,
    textAlign: 'center', // Ensure centered alignment
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  cardsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  card: {
    // backgroundColor: '#FF6B35',
    backgroundColor: '#faf2f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 120,
    width: 130,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginHorizontal: 0, // Add spacing between cards
  },
  cardImage: {
    width: 80,
    height: 70,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  cardText: {
    // color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
});
