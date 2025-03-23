import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import 'web-streams-polyfill';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import AuthorizationScreen from './screens/AuthorizationScreen/AuthorizationScreen';

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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}