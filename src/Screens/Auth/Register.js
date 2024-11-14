// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// export default function Register({navigation}) {
//   const [name, setName] = useState('');
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const [nameError, setNameError] = useState('');
//   const [aadharError, setAadharError] = useState('');
//   const [mobileError, setMobileError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const validateName = text => {
//     setName(text);
//     if (text.length < 1) {
//       setNameError('Name is required.');
//     } else {
//       setNameError('');
//     }
//   };

//   const validateAadhar = text => {
//     const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//     if (numericText.length <= 12) {
//       setAadharNumber(numericText);
//       setAadharError(
//         numericText.length < 12 ? 'Aadhar number must be 12 digits.' : '',
//       );
//     }
//   };

//   const validateMobile = text => {
//     const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//     if (numericText.length <= 10) {
//       setMobileNumber(numericText);
//       setMobileError(
//         numericText.length < 10 ? 'Mobile number must be 10 digits.' : '',
//       );
//     }
//   };

//   const validatePassword = text => {
//     setPassword(text);
//     if (text.length < 6) {
//       setPasswordError('Password must be at least 6 characters.');
//     } else {
//       setPasswordError('');
//     }
//   };

//   const isFormValid = () => {
//     return (
//       name &&
//       aadharNumber.length === 12 &&
//       mobileNumber.length === 10 &&
//       password.length >= 6
//     );
//   };

//   const handleRegister = () => {
//     if (isFormValid()) {
//       navigation.navigate('Login');
//     } else {
//       alert('Please fill in all fields correctly.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <Text style={styles.welcomeText}>Create an Account</Text>
//       <Text style={styles.headerText}>Register to LoanHub</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           placeholderTextColor="#666666"
//           value={name}
//           onChangeText={validateName}
//         />
//         {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

//         <TextInput
//           style={styles.input}
//           placeholder="Aadhar Card Number"
//           keyboardType="numeric"
//           placeholderTextColor="#666666"
//           value={aadharNumber}
//           onChangeText={validateAadhar}
//         />
//         {aadharError ? (
//           <Text style={styles.errorText}>{aadharError}</Text>
//         ) : null}

//         <TextInput
//           style={styles.input}
//           placeholder="Mobile Number"
//           keyboardType="phone-pad"
//           placeholderTextColor="#666666"
//           value={mobileNumber}
//           onChangeText={validateMobile}
//         />
//         {mobileError ? (
//           <Text style={styles.errorText}>{mobileError}</Text>
//         ) : null}

//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Password"
//             secureTextEntry={!passwordVisible}
//             placeholderTextColor="#666666"
//             value={password}
//             onChangeText={validatePassword}
//           />
//           <TouchableOpacity
//             onPress={() => setPasswordVisible(!passwordVisible)}>
//             <Ionicons
//               name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
//               size={25}
//               color={'#FFA36C'}
//               style={styles.icon}
//             />
//           </TouchableOpacity>
//         </View>
//         {passwordError ? (
//           <Text style={styles.errorText}>{passwordError}</Text>
//         ) : null}
//       </View>

//       <TouchableOpacity
//         style={[styles.registerButton, {opacity: isFormValid() ? 1 : 0.5}]}
//         onPress={handleRegister}
//         disabled={!isFormValid()}>
//         <Text style={styles.registerButtonText}>Create Account</Text>
//       </TouchableOpacity>

//       <View style={styles.linksContainer}>
//         <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
//           Already have an account? Login
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   welcomeText: {
//     fontSize: 28,
//     color: '#FF6B35',
//     fontFamily: 'Montserrat-Bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 22,
//     color: '#333',
//     fontFamily: 'Montserrat-Bold',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 30,
//   },
//   input: {
//     height: 60,
//     borderColor: '#FFA36C',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 20,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//     color: '#333333',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#FFA36C',
//     borderWidth: 1,
//     borderRadius: 8,
//     height: 60,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//     color: '#333333',
//   },
//   icon: {
//     paddingHorizontal: 10,
//   },
//   registerButton: {
//     backgroundColor: '#FF6B35',
//     borderRadius: 8,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//     elevation: 4,
//   },
//   registerButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontFamily: 'Poppins-Bold',
//   },
//   linksContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   link: {
//     color: '#FF6B35',
//     fontSize: 14,
//     fontFamily: 'Poppins-SemiBold',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//     marginTop: -10,
//     marginBottom: 10,
//   },
// });



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [nameError, setNameError] = useState('');
  const [aadharError, setAadharError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateName = text => {
    setName(text);
    if (text.length < 1) {
      setNameError('Name is required.');
    } else {
      setNameError('');
    }
  };

  const validateAadhar = text => {
    const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (numericText.length <= 12) {
      setAadharNumber(numericText);
      setAadharError(
        numericText.length < 12 ? 'Aadhar number must be 12 digits.' : ''
      );
    }
  };

  const validateMobile = text => {
    const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (numericText.length <= 10) {
      setMobileNumber(numericText);
      setMobileError(
        numericText.length < 10 ? 'Mobile number must be 10 digits.' : ''
      );
    }
  };

  const validatePassword = text => {
    setPassword(text);
    if (text.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = () => {
    return (
      name &&
      aadharNumber.length === 12 &&
      mobileNumber.length === 10 &&
      password.length >= 6
    );
  };

  const handleRegister = async () => {
    if (isFormValid()) {
      const payload = {
        name: name,
        aadharCardNo: aadharNumber,
        mobileNo: mobileNumber,
        password: password,
      };

      try {
        // Make the API call
        const response = await fetch('https://6645f7a451e227f23aad333e.mockapi.io/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User registered successfully:', data);
          // Navigate to the Login screen
          navigation.navigate('Login');
        } else {
          alert('Failed to register. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.welcomeText}>Create an Account</Text>
      <Text style={styles.headerText}>Register to LoanHub</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#666666"
          value={name}
          onChangeText={validateName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Aadhar Card Number"
          keyboardType="numeric"
          placeholderTextColor="#666666"
          value={aadharNumber}
          onChangeText={validateAadhar}
        />
        {aadharError ? (
          <Text style={styles.errorText}>{aadharError}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          placeholderTextColor="#666666"
          value={mobileNumber}
          onChangeText={validateMobile}
        />
        {mobileError ? (
          <Text style={styles.errorText}>{mobileError}</Text>
        ) : null}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            placeholderTextColor="#666666"
            value={password}
            onChangeText={validatePassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={25}
              color={'#FFA36C'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.registerButton, { opacity: isFormValid() ? 1 : 0.5 }]}
        onPress={handleRegister}
        disabled={!isFormValid()}
      >
        <Text style={styles.registerButtonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 28,
    color: '#FF6B35',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    height: 60,
    borderColor: '#FFA36C',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333333',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFA36C',
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333333',
  },
  icon: {
    paddingHorizontal: 10,
  },
  registerButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  linksContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    color: '#FF6B35',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: -10,
    marginBottom: 10,
  },
});
