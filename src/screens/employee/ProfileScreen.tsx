import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Layout, Text } from '@ui-kitten/components'
import React from 'react'

export default function ProfileScreen() {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <Text category='h1'>PROFILE</Text>  
       <Button
         onPress={() => {
           AsyncStorage.clear()
         }}>
         <Text> LOgouut</Text>  
         </Button>
    </Layout>
   )
}