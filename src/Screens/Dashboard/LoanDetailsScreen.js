// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// export default function LoanDetailScreen({route, navigation}) {
//   const {loanDetails} = route.params;

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerBar}>
//         <Text style={styles.headerText}>Profile</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.detailTitle}>Loan Details</Text>

//       <View style={styles.detailsContainer}>
//         <View style={styles.iconContainer}>
//           <Icon name="user" size={60} color="#FFF" style={styles.profileIcon} />
//         </View>
//         <Text style={styles.name}>{loanDetails.fullName}</Text>
//         <Text style={styles.detailText}>
//           Contact No: {loanDetails.contactNo}
//         </Text>
//         <Text style={styles.detailText}>
//           Aadhar Card No: {loanDetails.aadharNo}
//         </Text>
//         <Text style={styles.detailText}>
//           Loan Amount: {loanDetails.loanAmount} Rs
//         </Text>
//         <Text style={styles.detailText}>Address: {loanDetails.address}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     padding: 20,
//   },
//   backButton: {
//     backgroundColor: '#FF6B35',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     marginBottom: 20,
//   },
//   backButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   detailTitle: {
//     fontSize: 20,
//     fontFamily: 'Montserrat-Bold',
//     color: '#333333',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   detailsContainer: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   iconContainer: {
//     backgroundColor: '#FF6B35',
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   profileIcon: {
//     color: '#FFF',
//   },
// detailText: {
//   fontSize: 16,
//   fontFamily: 'Poppins-Regular',
//   color: '#333333',
//   marginBottom: 10,
//   // marginLeft:
//   // textAlign: 'center',
// },
// name: {
//   fontSize: 18,
//   fontFamily: 'Montserrat-Bold',
//   color: '#333333',
//   marginBottom: 10,
// },
//   headerBar: {
//     backgroundColor: '#FF6B35',
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 15,
//     borderBottomEndRadius: 15,
//     borderBottomStartRadius: 15,
//   },
//   headerText: {
//     color: '#FFFFFF',
//     fontSize: 20,
//     fontFamily: 'Montserrat-Bold',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
// import Icon from 'react-native-vector-icons/Feather';

export default function LoanDetailScreen({route, navigation}) {
  const {loanDetails} = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Loan Details</Text>
      </View>

      {/* ScrollView for the content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Info Section */}
        <View style={styles.profileInfo}>
          <Icon
            name="user"
            size={50}
            color="#FF6B35"
            style={styles.profileIcon}
          />
          <Text style={styles.name}>{loanDetails.fullName}</Text>
        </View>

        {/* Loan Details */}
        <View style={styles.optionsContainer}>
          {/* Full Name */}
          <View style={styles.row}>
            <Icon name="user" size={28} color="#FF6B35" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{loanDetails.fullName}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Contact No */}
          <View style={styles.row}>
            <Icon name="phone" size={28} color="#FF6B35" style={styles.icon} />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Contact No</Text>
              <Text style={styles.value}>{loanDetails.contactNo}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={styles.row}>
            <Icon
              name="credit-card"
              size={28}
              color="#FF6B35"
              style={styles.icon}
            />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Aadhar Card No</Text>
              <Text style={styles.value}>{loanDetails.aadharNo}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Loan Balance */}
          <View style={styles.row}>
            <Icon
              name="credit-card"
              size={28}
              color="#FF6B35"
              style={styles.icon}
            />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Loan Balance</Text>
              <Text style={styles.value}>{loanDetails.loanAmount} Rs</Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* Total Installment */}
          <View style={styles.row}>
            <Icon
              name="calendar"
              size={28}
              color="#FF6B35"
              style={styles.icon}
            />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Total Installment</Text>
              <Text style={styles.value}>{loanDetails.installments}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Address */}
          <View style={styles.row}>
            <Icon
              name="map-pin"
              size={28}
              color="#FF6B35"
              style={styles.icon}
            />
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{loanDetails.address}</Text>
            </View>
          </View>

          <View style={styles.separator} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  headerBar: {
    backgroundColor: '#FF6B35',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#FF6B35',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 16,
  },
  profileIcon: {
    backgroundColor: '#FFA36C',
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  optionsContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: 10,
  },
  optionsContainer: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginRight: 5,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    // marginLeft: 20,
  },
  dataContainer:{
    marginLeft:10
  }
});
