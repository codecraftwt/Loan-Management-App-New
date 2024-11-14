import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const LoanRequest = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = (loanAmount, interestRate, durationMonths) => {
    const principal = loanAmount;
    const rateOfInterest = interestRate / 12 / 100;
    const numberOfInstallments = durationMonths;

    const emi =
      (principal *
        rateOfInterest *
        Math.pow(1 + rateOfInterest, numberOfInstallments)) /
      (Math.pow(1 + rateOfInterest, numberOfInstallments) - 1);
    return emi;
  };

  const handleLoanRequest = () => {
    // Calculate EMI based on user input
    const calculatedEMI = calculateEMI(
      Number(loanAmount),
      Number(interestRate),
      Number(duration),
    );
    setEmi(calculatedEMI);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Apply for a Loan</Text>
      </View>

      <View style={styles.loanForm}>
        <Text style={styles.TitleText}>Calculate Loan EMI</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter loan amount"
          keyboardType="numeric"
          value={loanAmount}
          onChangeText={setLoanAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter annual interest rate (%)"
          keyboardType="numeric"
          value={interestRate}
          onChangeText={setInterestRate}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter loan duration (in months)"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
        <TouchableOpacity style={styles.button} onPress={handleLoanRequest}>
          <Text style={styles.buttonText}>Calculate EMI</Text>
        </TouchableOpacity>
      </View>

      {emi && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            Your Monthly EMI: ₹{emi.toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerBar: {
    backgroundColor: '#FF6B35',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  TitleText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginBlock: 10,
  },
  loanForm: {
    padding: 25,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 40,
    marginBlock: 20,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default LoanRequest;
