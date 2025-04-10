import React, {useEffect} from 'react';

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
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import MyRoutesScreen from './screens/MyRoutesScreen/MyRoutesScreen';
import DoneRoutesScreen from './screens/DoneRoutesScreen/DoneRoutesScreen';
import LikeRoutesScreen from './screens/LikeRoutesScreen/LikeRoutesScreen';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen';
import RecommendationsRoutesScreen from './screens/RecommendationsRoutesScreen/RecommendationsRoutesScreen';
import MainScreen from './screens/MainScreen/MainScreen';
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
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="MyRoutesScreen" component={MyRoutesScreen} />
          <Stack.Screen name="DoneRoutesScreen" component={DoneRoutesScreen} />
          <Stack.Screen name="LikeRoutesScreen" component={LikeRoutesScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
          <Stack.Screen name="RecommendationsRoutesScreen" component={RecommendationsRoutesScreen}/>
          <Stack.Screen name="MainScreen" component={MainScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}