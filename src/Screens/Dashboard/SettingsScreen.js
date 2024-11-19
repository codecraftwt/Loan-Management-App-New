import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  // Logout function (this can be customized to perform actual logout operations)
  const handleLogout = () => {
    // Example: Clear authentication data and navigate to Login screen
    navigation.navigate('Login'); // Replace with your login screen name
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.settingsOptions}>
        <TouchableOpacity style={styles.option}>
          <Icon name="user" size={24} color="#b80266" />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="bell" size={24} color="#b80266" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="shield" size={24} color="#b80266" />
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="credit-card" size={24} color="#b80266" />
          <Text style={styles.optionText}>Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="settings" size={24} color="#b80266" />
          <Text style={styles.optionText}>App Preferences</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Icon name="log-out" size={24} color="#b80266" />
          <Text style={styles.logOutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    backgroundColor: '#b80266',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsOptions: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  logOutText: {
    fontSize: 16,
    color: '#b80266',
    marginLeft: 10,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 10,
    padding: 10,
  },
});
