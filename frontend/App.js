import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import 'web-streams-polyfill';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import AuthorizationScreen from './screens/AuthorizationScreen/AuthorizationScreen';
import AuthorizationAcceptScreen from './screens/AuthorizationAcceptScreen/AuthorizationAcceptScreen';
import PremiumScreen from './screens/PremiumScreen/PremiumScreen';
import PremiumFreeScreen from './screens/PremiumFreeScreen/PremiumFreeScreen'
import ChooseCityScreen from './screens/ChooseCityScreen/ChooseCityScreen';
import ChoosePreferencesScreen from './screens/ChoosePreferencesScreen/ChoosePreferencesScreen';
import { TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="AuthorizationScreen" component={AuthorizationScreen} />
          <Stack.Screen name="AuthorizationAcceptScreen" component={AuthorizationAcceptScreen} />
          <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
          <Stack.Screen name="PremiumFreeScreen" component={PremiumFreeScreen} />
          <Stack.Screen name="ChooseCityScreen" component={ChooseCityScreen} />
          <Stack.Screen name="ChoosePreferencesScreen" component={ChoosePreferencesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}