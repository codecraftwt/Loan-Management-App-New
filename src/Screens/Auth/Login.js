import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Slices/authslice';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Get loading and error states from Redux store
  const { isLoading, error } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  const validateMobile = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 10) {
      setMobileNumber(numericText);
      setMobileError(numericText.length < 10 ? 'Mobile number must be 10 digits.' : '');
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    setPasswordError(text.length < 6 ? 'Password must be at least 6 characters.' : '');
  };

  const isFormValid = () => {
    return mobileNumber.length === 10 && password.length >= 6;
  };

  const handleLogin = () => {
    if (isFormValid()) {
      // Dispatch login action and handle response states
      dispatch(login({ emailOrMobile: mobileNumber, password }))
        .unwrap() // Automatically resolves on success or throws on failure
        .then((response) => {
          // On success, show a success toast and navigate to BottomNavigation
          // Toast.show({
          //   type: 'success',
          //   position: 'top',
          //   text1: 'Login Successful',
          // });
          navigation.navigate('BottomNavigation');
        })
        .catch((error) => {
          // Log the error for debugging (useful during development)
          console.error("Error ->", error);

          // Show an error toast based on the structure of the error
          const errorMessage = error || error.message || 'Invalid credentials or network error. Please try again.';

          Toast.show({
            type: 'error',
            position: 'top',
            text1: errorMessage,
          });
        });
    } else {
      alert('Please fill in all fields correctly.');
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.welcomeText}>Welcome to LoanHub</Text>
      <Text style={styles.headerText}>Login to Continue</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          placeholderTextColor="#666666"
          value={mobileNumber}
          onChangeText={validateMobile}
        />
        {mobileError ? <Text style={styles.mobileErrorText}>{mobileError}</Text> : null}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            placeholderTextColor="#666666"
            value={password}
            onChangeText={validatePassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={25}
              color={'#f26fb7'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      <TouchableOpacity
        style={[styles.loginButton, { opacity: isFormValid() ? 1 : 0.5 }]}
        onPress={handleLogin}
        disabled={!isFormValid() || isLoading} // Disable button while logging in
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        {/* Sign in with Google Button */}
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7JaI54p1i3v3WAoqEiQE1Jduquut71TkNSKSTNoixuv9DQQGdj61Ex_10nv6NM5wIhY&usqp=CAU' }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Forgot Password?
        </Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Register')}
        >
          Create an Account
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
    color: '#b80266',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginBottom: 18,
  },
  headerText: {
    fontSize: 22,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 34,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f26fb7',
    borderWidth: 1,
    borderRadius: 8,
    height: 55,
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
  loginButton: {
    backgroundColor: '#b80266',
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  linksContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    color: '#b80266',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginTop: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 8,
    height: 55,
    justifyContent: 'center',
    marginTop: 5,
    paddingHorizontal: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    marginTop: 5
  },
  mobileErrorText: {
    color: 'red',
    marginTop: -20,
    paddingBlock: 5,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  }
});
