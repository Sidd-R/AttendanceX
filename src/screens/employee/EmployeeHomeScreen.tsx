import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Modal,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {StyleSheet, Alert, Dimensions, View, Linking} from 'react-native';
import React from 'react';
import Loading from '../Loading';
import axios from 'axios';
import {AttendanceState} from '../../../types/employee/attendance';
import {checkAttendanceState} from '../../functions/employee/checkAttendanceState';
import {punchIn, punchOut} from '../../functions/employee/markAttendance';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EmployeeStackParams} from '../../../types/employee/navigation';


const MapIcon = (props:any) => (
  <Icon name='map' {...props} />
);

export const LoginButton = () => (
  <Button accessoryLeft={MapIcon}>Login with Facebook</Button>
)

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

type Props = NativeStackScreenProps<EmployeeStackParams, 'EMPLOYEE_HOME'>;

export default function EmployeeHomeScreen({navigation}: Props) {
  console.log('Home');
  const [punchState, setPunchState] = React.useState(0); // 0 for start, 1 for puch in, 2 for punch out
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [visible, setVisible] = React.useState(false);
  const [attendanceState, setAttendanceState] =
    React.useState<AttendanceState>();

  const renderItem = ({
    item,
    index,
  }: {
    item: Location;
    index: number;
  }): React.ReactElement => (
    <>
      <ListItem
        title={`${index + 1}. ${item.name}`}
        description={`lat:${item.latitude}  lon:${item.longitude}`}
        style={{backgroundColor: 'transparent', paddingLeft: 20}}
      />
      <Divider />
    </>
  );

  const [locations, setLocations] = React.useState<Location[] | null>([]);

  const loadAttendanceState = async () => {
    const state = await checkAttendanceState();
    setAttendanceState(state);
    console.log('state', state);
  };

  React.useEffect(() => {
    loadAttendanceState();
  }, []);

  function tConvert (timeStr: string) {
    let time: any = timeStr.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timeStr];
  
    if (time.length > 1) { // If time format correct
      console.log(time,1);
      
      time = time.slice (1);  // Remove full string match value
      console.log(time,2);
      time.pop(2)
      time.push(' ')
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
      
    }
    return time.join (''); // return adjusted time or original string
  }
  

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text category="h6" style={{marginVertical: 10}}>
            Alert
          </Text>
          <Text category="p1">
            Are you sure you want to{' '}
            {attendanceState?.status === 0 ? 'punch in' : 'punch out'}?
          </Text>
          <Layout style={styles.modalLayout}>
            <Button
              appearance="ghost"
              size="large"
              onPress={async () => {
                if (attendanceState?.status === 0)
                  await punchIn(loadAttendanceState);
                else await punchOut(loadAttendanceState);
                setVisible(false);
              }}>
              Yes
            </Button>
            <Button
              appearance="ghost"
              size="large"
              status="danger"
              onPress={() => setVisible(false)}>
              No
            </Button>
          </Layout>
        </Card>
      </Modal>
      <Layout
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 30,
        }}
        level="1">
        <Text category="h3">HOME</Text>
        {attendanceState?.status === 0 ? (
          <Button
            appearance="outline"
            size="giant"
            status="danger"
            style={styles.punchInButton}
            onPress={async () => setVisible(true)}
            disabled={submitted}>
            Punch In
          </Button>
        ) : (
          <Button
            appearance="outline"
            size="giant"
            status="danger"
            style={styles.punchInButton}
            disabled={attendanceState?.status === 2}
            onPress={async () => setVisible(true)}>
            Punch Out
          </Button>
        )}
        {/* <LoginButton /> */}

        {attendanceState?.data?.intime !== undefined && (
          <Layout
            level="2"
            style={{
              width: '100%',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#ff2f00',
              paddingHorizontal: 20,
              paddingBottom: 10,
              paddingTop: 15,
              // backgroundColor: '#ff2f00'
            }}>
              <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
            <Text category="h6">TODAY</Text> 
            
            <Text category="s2">{new Date(attendanceState.data.date).toDateString()}</Text>
            </View>
            <Divider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              <Text category="s2">Punch In:</Text>
              <Button
              appearance="ghost"
              size="small"
              status='primary'
              accessoryRight={MapIcon}
              onPress={async () => {
                await Linking.openURL(`geo:${attendanceState.data?.inlocationlat},${attendanceState.data?.inlocationlon}`)
              }}
              >
              <Text category="s1" status="primary">
                {tConvert(attendanceState.data.intime)
                }
              </Text>
            </Button>

            </View>
            <Divider />
            {attendanceState.data.outtime !== null && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                  // backgroundColor: '#ff2f00',
                }}>
                <Text category="s2">Punch Out:</Text>
                <Button 
                accessoryRight={MapIcon}
                status='primary'
                appearance='ghost'
                size='small'
                onPress={async () => {
                  await Linking.openURL(`geo:${attendanceState.data?.outlocationlat},${attendanceState.data?.outlocationlon}`)
                }}
                >
                <Text category="s1" status="primary">
                  {tConvert(attendanceState.data.outtime)}
                </Text>
                </Button>
                
                {/* <Icon name="map" style={{
                  height:40}}/> */}
              </View>
            )}
          </Layout>
        )}

        <Layout
          // level="4"
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Button
            style={styles.utilButtons}
            appearance="outline"
            size="giant"
            status="info"
            onPress={() => {
              navigation.push('EMPLOYEE_ATTENDANCE');
            }}>
            <Text>Attendance</Text>
          </Button>
          <Button
            style={styles.utilButtons}
            appearance="outline"
            size="giant"
            status="warning"
            onPress={() => {
              navigation.push('EMPLOYEE_PROFILE');
            }}>
            <Text> Profile</Text>
          </Button>
        </Layout>

        <Layout style={styles.listLayout} level="2">
          <Text category="h5" style={styles.listTitle}>
            Assigned Locations
          </Text>
          <Divider />
          {locations === null ? (
            <Text category="h6" style={{textAlign: 'center'}}>
              Error fetching locations
            </Text>
          ) : locations?.length === 0 ? (
            <Text category="h6" style={{textAlign: 'center'}}>
              No locations assigned
            </Text>
          ) : (
            <List
              style={{maxHeight: 250}}
              data={locations}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          )}
        </Layout>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  utilButtons: {
    width: Dimensions.get('window').width / 2 - 45,
    height: Dimensions.get('window').width / 2 - 60,
    borderRadius: 20,
    borderWidth: 2,
    // borderColor: 'cornflowerblue',
  },
  punchInButton: {
    width: '100%',
    height: 90,
    borderRadius: 20,
    // marginVertical: 60,
  },
  listLayout: {
    // height: 350,
    flex: 1,
    marginBottom: 30,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    // borderColor: 'cornflowerblue',
  },
  listTitle: {
    textAlign: 'center',
    marginVertical: 25,
  },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalLayout: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 25,
  },
});
