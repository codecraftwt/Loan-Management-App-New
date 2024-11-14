import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import SplashScreen from '../Screens/Auth/Splash';
import Register from '../Screens/Auth/Register';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import OTP from '../Screens/Auth/OTP';
import CreatePass from '../Screens/Auth/CreatePass';
import BottomNavigation from './BottomNavigation';
import LoanRequest from '../Screens/Dashboard/LoanRequest';
import SearchLenders from '../Screens/Dashboard/SearchLenders';
import Outward from '../Screens/Dashboard/Outward';  // Import the Outward screen
import AddDetails from '../Screens/Dashboard/AddDetails';
import LoanDetailScreen from '../Screens/Dashboard/LoanDetailsScreen';
import ProfileDetails from '../Screens/Dashboard/ProfileDetails';
import OldHistoryPage from '../Screens/Dashboard/OldHistoryPage';
import SettingsScreen from '../Screens/Dashboard/SettingsScreen';


const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="CreatePass" component={CreatePass} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />

      <Stack.Screen name="LoanRequest" component={LoanRequest} />
      <Stack.Screen name="SearchLenders" component={SearchLenders} />

      <Stack.Screen name="Outward" component={Outward} />
      <Stack.Screen name="AddDetails" component={AddDetails} />
      <Stack.Screen name="LoanDetailScreen" component={LoanDetailScreen} />

      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="OldHistoryPage" component={OldHistoryPage} />

      <Stack.Screen name = "Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
