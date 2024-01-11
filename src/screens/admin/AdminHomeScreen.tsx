import React from 'react';
import HomeHeader from '../../components/admin/HomeHeader';
import { Divider, Icon, Layout, Text } from '@ui-kitten/components';
import {
  StyleSheet,
  Dimensions,
  Pressable,
  ImageBackground,
  ImageProps,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Section {
  title: string;
  icon: string;
  path: '/(employee)' | '/location' | '/attendance';
}

const sections: Section[] = [
{
  title: 'Employee',
  icon: 'people-outline',
  path: '/(employee)',
},
{
  title: 'Location',
  icon: 'map-outline',
  path: '/location',
},
{
  title: 'Attendance',
  icon: 'file-text-outline',
  path: '/attendance',

}
]

const AdminHome = () => {
  const employeeRef = React.useRef<Icon<Partial<ImageProps>>>(null);
  const locationRef = React.useRef<Icon<Partial<ImageProps>>>(null);
  const attendanceRef = React.useRef<Icon<Partial<ImageProps>>>(null);
  // const infiniteAnimationIconRef = React.useRef<Icon<Partial<ImageProps>>>();
  // const noAnimationIconRef = React.useRef();

  // React.useEffect(() => {
  //   infiniteAnimationIconRef.current?.startAnimation();
  // }, []);
  return (
    <Layout style={styles.container} level="2">
      <Text category="h2" style={{ marginVertical: 12 }}>
        Hey Admin,
      </Text>
      <Layout style={styles.main} level="2">
        {/* {sections.map((section) => (<Pressable
          onPress={() => {
            setTimeout(() => {
              router.push(section.path);
            }, 1000);
            zoomIconRef.current?.startAnimation();
          }}
          style={styles.boxContainer}
        >
          <ImageBackground
            source={require('../assets/images/blueflame.jpeg')}
            style={styles.box}
          >
            <Text category="h4" style={{ color: 'white' }}>
              Attendance
            </Text>
            <Icon
              style={styles.iconContainer}
              name="file-text-outline"
              animation={'zoom'}
              ref={zoomIconRef}
            />
          </ImageBackground>
        </Pressable>))} */}
        <Pressable
          onPress={() => {
            setTimeout(() => {
            // router.push('/(employee)');
            }, 1000);
            employeeRef.current?.startAnimation();
          }}
          style={styles.boxContainer}
        >
          {/* <ImageBackground
            source={require('../assets/images/blueflame.jpeg')}
            style={styles.box}
          >
            <Text category="h4" style={{ color: 'white' }}>
              Employee
            </Text>
              <Icon style={styles.iconContainer} name="people-outline" animation={'zoom'} ref={employeeRef} />
          </ImageBackground> */}
        </Pressable>
        <Pressable
          onPress={() => {
            setTimeout(() => {
              // router.push('/location');
            }, 1000);
            locationRef.current?.startAnimation();
          }}
          style={styles.boxContainer}
        >
          {/* <ImageBackground
            source={require('../assets/images/blueflame.jpeg')}
            style={styles.box}
          >
            <Text category="h4" style={{ color: 'white' }}>
              Location
            </Text>
              <Icon style={styles.iconContainer}  name="map-outline" animation={'zoom'} ref={locationRef} />
          </ImageBackground> */}
        </Pressable>
        <Pressable
          onPress={() => {
            setTimeout(() => {
              // router.push('/attendance');
            }, 1000);
            attendanceRef.current?.startAnimation();
          }}
          style={styles.boxContainer}
        >
          {/* <ImageBackground
            source={require('../assets/images/blueflame.jpeg')}
            style={styles.box}
          >
            <Text category="h4" style={{ color: 'white' }}>
              Attendance
            </Text>
            <Icon
              style={styles.iconContainer}
              name="file-text-outline"
              animation={'zoom'}
              ref={attendanceRef}
            />
          </ImageBackground> */}
        </Pressable>
        <Button onPress={() => {
          
          AsyncStorage.clear();

        }} title='Logout' />
          
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    gap: 10,
  },
  main: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  box: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.35,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 20,
    paddingLeft: 30,
  },
  // i want a round container for the icon with whitish background and somewhat transparent
  iconContainer: { 
    width: 60, 
    height: 50, 
    tintColor: 'rgba(255,255,255,0.8)' 
  },
  boxContainer: {
    overflow: 'hidden',
    borderRadius: 20,
  },
});

export default AdminHome;
