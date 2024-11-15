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
import { useDispatch } from 'react-redux';
import { createLoan } from '../../Redux/Slices/loanSlice';

export default function AddDetails({ route, navigation }) {

  const dispatch = useDispatch()

  const [fullName, setFullName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loanStartDate, setLoanStartDate] = useState('');
  const [loanEndDate, setLoanEndDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOldHistoryButton, setShowOldHistoryButton] = useState(false);
  const [countryCode, setCountryCode] = useState('IN'); // default to India
  const [callingCode, setCallingCode] = useState('91'); // default calling code

  const [apiErrors, setApiErrors] = useState([]);  // State to store API error messages

  const validateForm = () => {
    if (
      !fullName ||
      !contactNo ||
      !aadharNo ||
      !address ||
      !amount ||
      !loanStartDate ||
      !loanEndDate ||
      !purpose
    ) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setErrorMessage('Amount should be a positive number.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const newData = {
        name: fullName,
        mobileNumber: contactNo,
        aadhaarNumber: aadharNo,
        address,
        amount: parseFloat(amount),
        loanStartDate,
        loanEndDate,
        purpose,
      };

      console.log("Form data : ", newData);

      try {
        console.log("API call")
        const response = await dispatch(createLoan(newData));

        // Check if the dispatch was successful or failed
        if (createLoan.fulfilled.match(response)) {
          console.log("Loan created successfully");
          navigation.goBack();
        } else {
          // If the action fails, store the error messages in state
          console.error('Failed to create loan:', resultAction.payload);
          if (resultAction.payload && resultAction.payload.errors) {
            setApiErrors(resultAction.payload.errors);  // Set the errors from the API response
          }
        }

      }
      catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  const resetForm = () => {
    setFullName('');
    setContactNo('');
    setAadharNo('');
    setAddress('');
    setAmount('');
    setLoanStartDate('');
    setLoanEndDate('');
    setPurpose('');
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
    const mobilePattern = /^[0-9]{0,10}$/;
    if (mobilePattern.test(text) && text.length <= 10) {
      setContactNo(text);
    }
  };


  const handleAmountChange = text => {
    const amountPattern = /^[0-9]*\.?[0-9]*$/;
    if (amountPattern.test(text)) {
      setAmount(text);
    }
  };

  const handleLoanStartDateChange = text => {
    setLoanStartDate(text);
  };

  const handleLoanEndDateChange = text => {
    setLoanEndDate(text);
  };

  const handlePurposeChange = text => {
    setPurpose(text);
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
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.msgText}>Fill the below form to add loan</Text>
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
            onPress={() => navigation.navigate('OldHistoryPage', { aadharNo })}>
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
            placeholder="Amount"
            value={amount}
            onChangeText={handleAmountChange}
            onBlur={dismissKeyboard}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Text style={styles.rsText}>Rs</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Loan Start Date"
          value={loanStartDate}
          onChangeText={handleLoanStartDateChange}
          onBlur={dismissKeyboard}
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          placeholder="Loan End Date"
          value={loanEndDate}
          onChangeText={handleLoanEndDateChange}
          onBlur={dismissKeyboard}
          returnKeyType="next"
        />

        <TextInput
          style={styles.textArea}
          placeholder="Purpose"
          value={purpose}
          onChangeText={handlePurposeChange}
          onBlur={dismissKeyboard}
          multiline
          textAlignVertical="top"
        />

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
      </ScrollView>
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
    marginLeft: 20
    // textAlign: 'center',
  },
  msgText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
    // textAlign: 'center',
  },
  scrollViewContainer: {
    marginTop: 20,
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 42,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 15
  },
  textArea: {
    height: 90,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 15,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  loanAmountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    position: 'relative',
  },
  loanAmountInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 15,
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
    backgroundColor: '#fc9960',
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
    borderColor: '#ccc',
    paddingVertical: 5,
    marginBottom: 10,
    position: 'relative',
    borderRadius: '10'
  },

  inputCode: {
    flex: 1,
    height: 42,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 48,
    paddingRight: 10,
    borderRadius: 10,
    fontSize: 15,
  },

  countryPickerContainer: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    top: 8,
  },
});
