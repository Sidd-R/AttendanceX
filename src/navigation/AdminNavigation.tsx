import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminHome from '../screens/admin/AdminHomeScreen'

const AdminStack = createNativeStackNavigator()

const AdminNavigation = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen name="AdminHome" component={AdminHome}/>
    </AdminStack.Navigator>
  )
}

export default AdminNavigation