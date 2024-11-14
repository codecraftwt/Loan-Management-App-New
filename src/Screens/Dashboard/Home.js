import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView, // Import ScrollView for scrolling effect
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
      title: 'Apply for Loan',
      screen: 'LoanRequest',
      image: loanStatus, // Ensure this image path is correct
    },
    {
      title: 'Calculate EMI',
      screen: 'LoanRequest',
      image: loanStatus, // Ensure this image path is correct
    },
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
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* <Text style={styles.welcomeText}>Welcome to LoanHub</Text> */}
        <Text style={styles.subtitle}>
          Apply for a loan, track your loan status, and manage your profile.
        </Text>

        {/* Scrollable Cards Container */}
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {/* Render Cards in Pairs */}
          {buttons.map((button, index) => (
            <View style={styles.cardWrapper} key={index}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate(button.screen)}>
                <Image source={button.image} style={styles.cardImage} />
                <Text style={styles.cardText}>{button.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
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
    paddingTop: 15,
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
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap the cards to create new rows
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  cardWrapper: {
    width: '50%', // Two cards per row
    paddingHorizontal: 10,
    marginBottom: 20, // Space between rows
  },
  card: {
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 150, // Card height
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    width: 70, // Image size
    height: 70,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
