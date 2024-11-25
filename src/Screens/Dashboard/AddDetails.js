import React, {useEffect, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  createLoan,
  getLoanByAadhar,
  updateLoan,
} from '../../Redux/Slices/loanSlice';
import Toast from 'react-native-toast-message';

export default function AddDetails({route, navigation}) {
  const dispatch = useDispatch();

  const {loans, error, loading} = useSelector(state => state.loans);

  // If we're editing an existing loan, load the existing loan data
  const {loanDetails} = route.params || {}; // Assuming loanDetails are passed when editing

  const [fullName, setFullName] = useState(loanDetails?.name || '');
  const [contactNo, setContactNo] = useState(loanDetails?.mobileNumber || '');
  const [aadharNo, setAadharNo] = useState(loanDetails?.aadhaarNumber || '');
  const [address, setAddress] = useState(loanDetails?.address || '');
  const [amount, setAmount] = useState(loanDetails?.amount.toString() || '');
  const [loanStartDate, setLoanStartDate] = useState(
    loanDetails?.loanStartDate || null,
  );
  const [loanEndDate, setLoanEndDate] = useState(
    loanDetails?.loanEndDate || null,
  );
  const [purpose, setPurpose] = useState(loanDetails?.purpose || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOldHistoryButton, setShowOldHistoryButton] = useState(false);
  const [countryCode, setCountryCode] = useState('IN'); // default to India
  const [callingCode, setCallingCode] = useState('91'); // default calling code

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const [profileImage, setProfileImage] = useState('');

  const [apiErrors, setApiErrors] = useState([]); // State to store API error messages

  // Get today's date (current date) for min date validation
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // 'yyyy-mm-dd' format for date picker

  // console.log('Loan data for editing: ', loanDetails);

  useEffect(() => {
    const userProfileImage = loans[0]?.userProfileImage;
    setProfileImage(userProfileImage);
  }, [loans, aadharNo]);

  // Function to validate form fields
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
    // Check if start date is before end date
    if (loanStartDate && loanEndDate && loanStartDate >= loanEndDate) {
      setErrorMessage('Loan start date must be before loan end date.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  // Function to handle form submission
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
        profileImage,
      };

      // console.log("Form data: ", newData);

      try {
        let response;
        if (loanDetails) {
          // If loanDetails exists, update the loan
          response = await dispatch(
            updateLoan({...newData, id: loanDetails._id}),
          );
          console.log('update API', loanDetails._id);
        } else {
          // Otherwise, create a new loan
          response = await dispatch(createLoan(newData));
        }

        if (
          createLoan.fulfilled.match(response) ||
          updateLoan.fulfilled.match(response)
        ) {
          console.log('Loan saved successfully');
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Loan saved successfully',
          });
          navigation.navigate('Outward');
        } else {
          if (response.payload && response.payload.errors) {
            setErrorMessage(response.payload.errors.join(', ')); // Set the errors from the API response
          }
        }
      } catch (error) {
        console.error('Error submitting data:', error.response.data.message);
        setErrorMessage('An error occurred while saving the loan.');
      }
    }
  };

  // Function to reset the form
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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleAadharChange = text => {
    const isValidAadhar = /^\d{0,12}$/.test(text);
    if (!isValidAadhar) return;
    setAadharNo(text);
    setShowOldHistoryButton(text.length === 12);

    if (text?.length === 12) {
      dispatch(getLoanByAadhar(text));
    }
  };

  const handleContactNoChange = text => {
    const mobilePattern = /^[0-9]{0,10}$/;
    if (mobilePattern.test(text) && text.length <= 10) {
      setContactNo(text);
    }
  };

  // Handle the loan start date change
  const handleLoanStartDateChange = date => {
    setLoanStartDate(date);
    setStartDatePickerVisible(false);
  };

  // Handle the loan end date change
  const handleLoanEndDateChange = date => {
    setLoanEndDate(date);
    setEndDatePickerVisible(false);
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
        <Text style={styles.headerText}>
          {loanDetails ? 'Edit Loan Details' : 'Add Loan Details'}
        </Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.msgText}>
          Fill the below form to {loanDetails ? 'update' : 'add'} loan
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          onBlur={dismissKeyboard}
          returnKeyType="next"
        />

        <View style={styles.phoneInputContainer}>
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

        {showOldHistoryButton && (
          <TouchableOpacity
            style={styles.oldHistoryButton}
            onPress={() => navigation.navigate('OldHistoryPage', {aadharNo})}>
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
            onChangeText={setAmount}
            onBlur={dismissKeyboard}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Text style={styles.rsText}>Rs</Text>
        </View>

        <TouchableOpacity onPress={() => setStartDatePickerVisible(true)}>
          <TextInput
            style={styles.input}
            placeholder="Loan Start Date"
            value={
              loanStartDate ? new Date(loanStartDate).toLocaleDateString() : ''
            }
            editable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleLoanStartDateChange}
          onCancel={() => setStartDatePickerVisible(false)}
          minimumDate={today} // Disable past dates
        />

        <TouchableOpacity onPress={() => setEndDatePickerVisible(true)}>
          <TextInput
            style={styles.input}
            placeholder="Loan End Date"
            value={
              loanEndDate ? new Date(loanEndDate).toLocaleDateString() : ''
            }
            editable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleLoanEndDateChange}
          onCancel={() => setEndDatePickerVisible(false)}
          minimumDate={loanStartDate || today} // End date must be after start date
        />

        <TextInput
          style={styles.textArea}
          placeholder="Purpose"
          value={purpose}
          onChangeText={setPurpose}
          onBlur={dismissKeyboard}
          multiline
          textAlignVertical="top"
        />

        {(errorMessage || error) && (
          <Text style={styles.errorText}>
            {errorMessage || error?.message || 'An unknown error occurred.'}
          </Text>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>
                {loanDetails ? 'Update' : 'Add'}
              </Text>
            )}
          </TouchableOpacity>

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
    backgroundColor: '#b80266',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    elevation: 5,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    flex: 1,
    marginLeft: 20,
  },
  msgText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
  },
  scrollViewContainer: {
    marginTop: 20,
    marginBottom: 20,
    // paddingBottom: 40,
    paddingHorizontal: 20,
  },
  input: {
    height: 42,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 15,
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
    backgroundColor: '#b80266',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  resetButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBlock: 20,
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
    backgroundColor: '#b80266',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  oldHistoryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    paddingVertical: 5,
    marginBottom: 10,
    position: 'relative',
    borderRadius: '10',
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
