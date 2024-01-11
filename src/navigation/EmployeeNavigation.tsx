import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/employee/EmployeeHomeScreen';
import AttendanceScreen from '../screens/employee/EmployeeAttendanceScreen';
import { EmployeeStackParams } from '../../types/employee/navigation';
import ProfileScreen from '../screens/employee/ProfileScreen';

const EmployeeStack = createNativeStackNavigator<EmployeeStackParams>();

const EmployeeNavigation = () => {
  return (
    <EmployeeStack.Navigator screenOptions={{headerShown:false}}>
      <EmployeeStack.Screen name="EMPLOYEE_HOME" component={Home} />
      <EmployeeStack.Screen name="EMPLOYEE_ATTENDANCE" component={AttendanceScreen} />
      <EmployeeStack.Screen name="EMPLOYEE_PROFILE" component={ProfileScreen} />
    </EmployeeStack.Navigator>
  )
}

export default EmployeeNavigation 