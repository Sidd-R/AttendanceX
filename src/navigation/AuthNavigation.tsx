import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import ProfileDetails from '../screens/auth/ProfileDetails';

const authStack = createNativeStackNavigator();

const AuthNavigation = (props:any) => {
  return (
    <authStack.Navigator screenOptions={{headerShown:false}}>
      <authStack.Screen name="login" component={Login} 
      // initialParams={{...props}} 
      />
      <authStack.Screen name="profileDetails" component={ProfileDetails} 
      // initialParams={{...props}} 
      />
    </authStack.Navigator>
  )
}

export default AuthNavigation