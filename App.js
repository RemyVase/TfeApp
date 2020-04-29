import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './Navigation/Navigation';

export default function App() {
  return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    )
  }

