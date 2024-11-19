import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {resetPassword} from '../../Redux/Slices/authslice';

export default function CreatePass({navigation, route}) {
  const {email, otp} = route.params; // Access email and otp passed from OTP screen
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const dispatch = useDispatch();

  const validatePassword = password => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    return password.length >= 6 && hasLetters && hasDigits;
  };

  const handleApply = async () => {
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Passwords do not match!',
      });
      return;
    }

    if (validatePassword(newPassword)) {
      // Dispatch resetPassword action
      const result = await dispatch(
        resetPassword({email, otp, newPassword}),
      ).unwrap();

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Password reset successfully',
      });

      // If password reset is successful, navigate to the Login screen
      navigation.navigate('Login');
    } else {
      Toast.show({
        type: 'info',
        position: 'top',
        text1:
          'Password must be at least 6 characters long and contain both letters and digits.',
      });
    }
  };

  const isButtonDisabled = !validatePassword(newPassword) || !confirmPassword;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.headerText}>Create New Password</Text>
      <Text style={styles.instructionText}>
        Please enter a new password below.
      </Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#666666"
          value={newPassword}
          onChangeText={setNewPassword}
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

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={!confirmVisible}
          placeholderTextColor="#666666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
          <Ionicons
            name={confirmVisible ? 'eye-off-outline' : 'eye-outline'}
            size={25}
            color={'#f26fb7'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.applyButton, {opacity: isButtonDisabled ? 0.5 : 1}]}
        onPress={handleApply}
        disabled={isButtonDisabled}>
        <Text style={styles.applyButtonText}>Apply</Text>
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
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f26fb7',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: 60,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333333',
  },
  icon: {
    paddingHorizontal: 10,
  },
  applyButton: {
    backgroundColor: '#b80266',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});
