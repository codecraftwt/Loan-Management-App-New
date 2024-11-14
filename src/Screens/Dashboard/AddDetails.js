import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';

export default function AddDetails({ route, navigation }) {
  const { updateFormData } = route.params;

  const [fullName, setFullName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [address, setAddress] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [installments, setInstallments] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOldHistoryButton, setShowOldHistoryButton] = useState(false);
  const [countryCode, setCountryCode] = useState('IN'); // default to India
  const [callingCode, setCallingCode] = useState('91'); // default calling code

  const validateForm = () => {
    if (
      !fullName ||
      !contactNo ||
      !aadharNo ||
      !address ||
      !loanAmount ||
      !installments
    ) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
      setErrorMessage('Loan amount should be a positive number.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const newData = {
        name: fullName,
        contactNo,
        aadharCardNo: aadharNo,
        address,
        loanBalance: parseFloat(loanAmount),
        Installments: parseInt(installments),
      };

      try {
        const response = await fetch('https://6645f7a451e227f23aad333e.mockapi.io/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Data submitted successfully:', data);
          updateFormData(newData);
          navigation.goBack();
        } else {
          console.error('Failed to submit data:', response.status);
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  const resetForm = () => {
    setFullName('');
    setContactNo('');
    setAadharNo('');
    setAddress('');
    setLoanAmount('');
    setInstallments('');
    setErrorMessage('');
    setShowOldHistoryButton(false);
  };

  const handleFullNameChange = text => {
    const namePattern = /^[a-zA-Z\s]*$/;
    if (namePattern.test(text)) {
      setFullName(text);
    }
  };

  const handleContactNoChange = text => {
    const mobilePattern = /^[0-9]*$/;
    if (mobilePattern.test(text)) {
      setContactNo(text);
    }
  };

  const handleLoanAmountChange = text => {
    const amountPattern = /^[0-9]*\.?[0-9]*$/;
    if (amountPattern.test(text)) {
      setLoanAmount(text);
    }
  };

  const handleTotalInstallmentsChange = text => {
    const amountPattern = /^[0-9]*\.?[0-9]*$/;
    if (amountPattern.test(text)) {
      setInstallments(text);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleAadharChange = text => {
    if (/^\d{0,12}$/.test(text)) {
      setAadharNo(text);
      setShowOldHistoryButton(text.length === 12);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Details</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={handleFullNameChange}
          onBlur={dismissKeyboard}
          returnKeyType="next"
        />

        <View style={styles.phoneInputContainer}>
          {/* Country Picker Icon */}
          <TouchableOpacity
            style={styles.countryPickerContainer}
            onPress={() => setCountryCode('')}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withCallingCode
              onSelect={country => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.inputCode}
            placeholder={`  +${callingCode} Contact Number`}
            value={contactNo}
            onChangeText={handleContactNoChange}
            keyboardType="numeric"
            returnKeyType="next"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Aadhar Card No"
          value={aadharNo}
          onChangeText={handleAadharChange}
          onBlur={dismissKeyboard}
          keyboardType="numeric"
          returnKeyType="next"
        />

        {/* Conditionally render the "Old history" button */}
        {showOldHistoryButton && (
          <TouchableOpacity
            style={styles.oldHistoryButton}
            onPress={() => navigation.navigate('OldHistoryPage')}>
            <Text style={styles.oldHistoryButtonText}>Old History</Text>
          </TouchableOpacity>
        )}

        <TextInput
          style={styles.textArea}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          onBlur={dismissKeyboard}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.loanAmountWrapper}>
          <TextInput
            style={styles.loanAmountInput}
            placeholder="Loan Balance"
            value={loanAmount}
            onChangeText={handleLoanAmountChange}
            onBlur={dismissKeyboard}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Text style={styles.rsText}>Rs</Text>
        </View>

        <View style={styles.loanAmountWrapper}>
          <TextInput
            style={styles.loanAmountInput}
            placeholder="Total Installments"
            value={installments}
            onChangeText={handleTotalInstallmentsChange}
            onBlur={dismissKeyboard}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Text style={styles.rsText}></Text>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.buttonsContainer}>
          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

          {/* Reset Button */}
          <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerBar: {
    backgroundColor: '#FF6B35',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollViewContainer: {
    marginTop: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  loanAmountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    position: 'relative',
  },
  loanAmountInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
  },
  rsText: {
    position: 'absolute',
    right: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  resetButton: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  oldHistoryButton: {
    backgroundColor: '#FF6B35',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  oldHistoryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    marginTop: 10,
    position: 'relative', 
  },

  inputCode: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 35, 
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 16,
  },

  countryPickerContainer: {
    position: 'absolute',
    left: 10, 
    zIndex: 1,
    top: 8, 
  },
});
