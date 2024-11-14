import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('7058730875');
  const [password, setPassword] = useState('123456');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
      navigation.navigate('BottomNavigation'); 
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
        {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}

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
              name={passwordVisible ? "eye-off-outline" : "eye-outline"} 
              size={25} 
              color={'#FFA36C'} 
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
      
      <TouchableOpacity 
        style={[styles.loginButton, { opacity: isFormValid() ? 1 : 0.5 }]} 
        onPress={handleLogin}
        disabled={!isFormValid()} 
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      <View style={styles.linksContainer}>
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
    color: '#FF6B35',
    fontFamily: 'Montserrat-Bold',
    textAlign:'center',
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
  loginButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    height: 50,
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
