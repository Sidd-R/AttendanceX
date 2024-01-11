import React, { useEffect } from 'react';
// import { LoginParams } from "../../types";
import {Button, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import {StyleSheet, ImageProps, View, Alert} from 'react-native';
// import LoadingIndicator from "../../components/LoadingIndicator";
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {NativeStackNavigatorProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkAuth from '../../utils/checkAuth';
import SplashScreen from 'react-native-splash-screen';
// //
export default function Login({navigation, route}: any) {

  const Authenticate = async () => {
    const authState = await checkAuth();
    console.log('authState', authState);
    
    // setAppState(authState);
    if (authState !== 0)
      navigation.replace(authState === 1 ? 'EMPLOYEE_NAVIGATION' : 'ADMIN_NAVIGATION')
  };


  useEffect(() => {
    let k = setTimeout(async () => {
      await Authenticate();
      SplashScreen.hide();
    }, 200);  
    return () => {
      clearTimeout(k);
    };
  }, []);

  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [employeeId, setEmployeeId] = React.useState<string>('');

  const submit = async () => {
    if (employeeId === '') {
      Alert.alert('Please enter employee id');
      return;
    }

    setSubmitted(true);

    console.log('req', Config.BASE_URL + 'login.php');

    const RequestData = {
      empid: employeeId,
      deviceid: await DeviceInfo.getUniqueId(),
    }

    await axios
      .post(Config.BASE_URL + 'login.php', RequestData)
      .then(res => res.data)
      .then(async res => {
        console.log(res);
        switch (res.status) {
          case 1:
            await AsyncStorage.setItem('token', res.token);
            await AsyncStorage.setItem('isAdmin', '0');
            await Authenticate();
            break;
          case 2:
            navigation.push('profileDetails', {empid: employeeId});
            break;
          case 5:
            await AsyncStorage.setItem('token', res.token);
            await AsyncStorage.setItem('isAdmin', '1');
            await Authenticate();
            break;
          default:
            Alert.alert('Error', res.message ?? 'Something went wrong');
            break;
        }
      })
      .catch(err => {
        console.log('1', err);
        Alert.alert('Network Error');
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '15%',
        gap: 60,
      }}
      level="2">
      <Text category="h1">LOGIN</Text>
      <Input
        placeholder="Employee Id"
        size="large"
        disabled={submitted}
        onChangeText={val => setEmployeeId(val)}
        value={employeeId}
        status="primary"
      />
      {submitted ? (
        <Button
          style={{margin: 2}}
          appearance="filled"
          // accessoryLeft={LoadingIndicator}
          size="large">
          LOADING
        </Button>
      ) : (
        <Button
          onPress={submit}
          style={{margin: 2}}
          appearance="filled"
          size="large">
          SUBMIT
        </Button>
      )}
    </Layout>
  );
}
