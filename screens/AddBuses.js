import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth,database} from '../config/firebase';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { addDoc,setDoc,doc} from 'firebase/firestore';

function AddBuses() {
  const navigation = useNavigation();

  const [value, setValue] = useState(dayjs());
  const [route, setroute] = useState('');
  const [busno, setbusno] = useState('');
  const [date, setdate] = useState('');
  const [drivername, setdrivername] = useState('');
  const [mobile,setmobile]=useState('');

function handleSubmit() {

  setDoc(doc(database, 'BusLocations', busno), {
    route: route,
    Drivername: drivername,
    date: date,
    lattitude: 12.872942598873182,
    longitude: 80.22606412285278,
    seatcount: 55,
    visible: true,
    mobile:mobile


  });
  console.log(busno,drivername,date);
  setbusno('');
  setdate('');
  setdrivername('');
  setroute('');
  setmobile('');
  Alert.alert('Success', 'Bus added successfully');
  console.log('Bus added Successfully');
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: 'brown' }}>Add a New Bus</Text>

      <ScrollView>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 15, marginBottom: 5 }}>Boarding Point</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Bus Route"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={route}
        onChangeText={(text) => setroute(text)}
      />
      <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Bus Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Bus Number"
        autoCapitalize="none"
        keyboardType="phone-pad"
        textContentType="emailAddress"
        autoFocus={true}
        value={busno}
        onChangeText={(text) => setbusno(text)}
      />

     

      <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Driver Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Driver Name"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={drivername}
        onChangeText={(text) => setdrivername(text)}
      />

    <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Driver Mobile Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        autoCapitalize="none"
        keyboardType="phone-pad"
        maxLength={10}
        autoFocus={true}
        value={mobile}
        onChangeText={setmobile}
      />

<Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Date</Text>

<DateTimePicker
  value={value}
  onValueChange={(date) => setdate(date.split(" ")[0])}
/>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Submit</Text>
      </TouchableOpacity>
      </ScrollView>

    </View>
  );
}

export default AddBuses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 50,
    fontSize: 16,
    borderRadius: 5,
    padding: 12,
    borderWidth: 0.5,
    borderColor: 'grey'
  },
  button: {
    backgroundColor: 'red',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
