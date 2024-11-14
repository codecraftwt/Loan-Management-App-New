import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function ForgotPassword({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');

  const validateMobile = text => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 10) {
      setMobileNumber(numericText);
      setMobileError(
        numericText.length < 10 ? 'Mobile number must be 10 digits.' : '',
      );
    }
  };

  const isFormValid = () => {
    return mobileNumber.length === 10;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.headerText}>Forgot Password</Text>
      <Text style={styles.instructionText}>
        Enter your mobile number to receive an OTP.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        placeholderTextColor="#666666"
        value={mobileNumber}
        onChangeText={validateMobile}
      />
      {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}

      <TouchableOpacity
        style={[styles.continueButton, {opacity: isFormValid() ? 1 : 0.5}]}
        onPress={() => {
          if (isFormValid()) {
            navigation.navigate('OTP');
          } else {
            alert('Please enter a valid mobile number.');
          }
        }}
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
    color: '#FF6B35',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  continueButton: {
    backgroundColor: '#FF6B35',
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
