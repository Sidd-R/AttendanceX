import React from 'react';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import LoadingIndicator from '../../components/LoadingIndicator';
// import { ProfileDetailsParams } from "../../types";
import {Alert} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { setItemAsync } from "expo-secure-store";
// import * as Application from "expo-application";

export default function ProfileDetails({navigation, route}: any) {
  console.log('profile details');

  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  const submit = async () => {
    if (name === '' || email === '') {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    setSubmitted(true);
    const data = {
      name: name.trim(),
      email: email.trim(),
      empid: route.params.empid,
      deviceid: await DeviceInfo.getUniqueId(),
    };
    console.log(data);

    await axios
      .post(Config.BASE_URL + 'firstLogin.php', data)
      .then(res => res.data)
      .then(async res => {
        await AsyncStorage.setItem('token', res.token);
        await AsyncStorage.setItem('isAdmin', '0');
        // axios.defaults.headers.common['Authorization'] = res.token;
        navigation.replace('EMPLOYEE_NAVIGATION');
        // route.params.setAppState(res.status);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', err.message);
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
      <Text category="h1">PROFILE INFO</Text>
      <Input
        placeholder="Name"
        size="large"
        onChangeText={val => setName(val)}
        value={name}
        status="primary"
        disabled={submitted}
      />
      <Input
        placeholder="Email"
        size="large"
        onChangeText={val => setEmail(val)}
        value={email}
        status="primary"
        disabled={submitted}
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
