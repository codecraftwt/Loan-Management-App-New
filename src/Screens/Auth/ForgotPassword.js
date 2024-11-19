import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../Redux/Slices/authslice';
import Toast from 'react-native-toast-message';

export default function ForgotPassword({navigation}) {
  const dispatch = useDispatch();

  // Accessing forgotPasswordMessage and error from Redux state
  const forgotPasswordMessage = useSelector(
    state => state.auth.forgotPasswordMessage,
  );
  const error = useSelector(state => state.auth.error);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Validate Email Format
  const validateEmail = text => {
    setEmail(text);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(text)) {
      setEmailError('');
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  // Check if form is valid
  const isFormValid = () => email.length > 0 && !emailError;

  // Handle form submission (forgot password)
  const handleForgotPassword = async () => {
    if (isFormValid()) {
      try {
        // Dispatch the forgotPassword action and wait for it to complete
        const response = await dispatch(forgotPassword(email));

        // Check if the response is successful and contains the message
        if (
          response?.payload?.message === 'Verification code sent to your email'
        ) {
          // If the success message is returned, navigate to OTP screen
          navigation.navigate('OTP', {email});

          Toast.show({
            type: 'success',
            position: 'top',
            text1: response.payload.message, // Use the message from the response
          });
        } else {
          // If the message is not the expected success message, handle errors
          const errorMessage =
            response?.payload?.message ||
            'An error occurred. Please try again.';

          Toast.show({
            type: 'error',
            position: 'top',
            text1: errorMessage,
          });
        }
      } catch (error) {
        // Handle any errors that occur during the dispatch (e.g., network error)
        console.error('Error during forgot password:', error);

        Toast.show({
          type: 'error',
          position: 'top',
          text1: error?.message || 'An unexpected error occurred.',
        });
      }
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.headerText}>Forgot Password</Text>
      <Text style={styles.instructionText}>
        Enter your email address to receive an OTP.
      </Text>

      {/* Email Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        placeholderTextColor="#666666"
        value={email}
        onChangeText={validateEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueButton, {opacity: isFormValid() ? 1 : 0.5}]}
        onPress={handleForgotPassword}
        disabled={!isFormValid()}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
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
  headerText: {
    fontSize: 28,
    color: '#b80266',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 60,
    borderColor: '#f26fb7',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333333',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: '#b80266',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});
