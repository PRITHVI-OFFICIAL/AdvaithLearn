import { View, TextInput, Modal, FlatList, TouchableOpacity, Text ,StyleSheet,Pressable,Dimensions,Button,Image,ActivityIndicator,Switch, ScrollView} from 'react-native';
import React, {  useEffect, useState, useLayoutEffect} from "react";
import { useNavigation } from "@react-navigation/native";
//import MapView, { Marker, Circle } from "react-native-maps";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { auth, database } from "../config/firebase";
import * as Location from 'expo-location';
import { getAuth} from "firebase/auth";
import {collection,addDoc,orderBy,query,onSnapshot,setDoc,doc,getDoc,where, updateDoc} from 'firebase/firestore';
import colors from '../colors';
import DateTimePicker from 'react-native-ui-datepicker';
import BusCard from '../components/BusCard';
import dayjs from 'dayjs';

function Home() {
  const navigation = useNavigation();
  const [area, setArea] = useState('');
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [locationIntervalId, setLocationIntervalId] = useState(null);
  const [lat,setlat]=useState(null);
  const [ long,setlong]=useState(null);
  const [value, setValue] = useState(dayjs());
  const [busdetails,setbusdetails]=useState([]);

  useEffect(() => {
    return () => {
      clearInterval(locationIntervalId);
    };
  }, []);

  const currentMail = getAuth()?.currentUser.email;

  useLayoutEffect(() => {
    const collectionRef1 = collection(database, 'Users');
    const q = query(collectionRef1, where('email', '==', currentMail));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const s = querySnapshot.docs.map((doc) => ({
        area: doc.data().area,
      }));
      setArea(s[0].area);
    });

    return unsubscribe;
  }, []);

  const shareLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }
  
      // Request background location permissions (if needed)
      //await Location.requestBackgroundPermissionsAsync();
  
      setIsSharingLocation(true);
  
      // Fetch the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log(latitude,longitude);
      
  
      // Update the BusLocations document with the initial location
      const busLocationDocRef = doc(database, 'BusLocations', area);
      await updateDoc(busLocationDocRef, {
        latitude,
        longitude
      });
  
      // Set up an interval to continuously update the location
      const intervalId = setInterval(async () => {
        const updatedLocation = await Location.getCurrentPositionAsync({});
        const { latitude: updatedLatitude, longitude: updatedLongitude } =
          updatedLocation.coords;
          
  
        // Update the BusLocations document with the updated location
        await updateDoc(busLocationDocRef, {
          lattitude: updatedLatitude,
          longitude: updatedLongitude,
        });
        setlat(updatedLatitude); 
        setlong(updatedLongitude);
      }, 1000); // Update location every 60 seconds
  
      setLocationIntervalId(intervalId);
    } catch (error) {
      console.error('Error sharing location:', error);
    }
  };
  

  const stopSharingLocation = async () => {
    try {
      setIsSharingLocation(false);
      clearInterval(locationIntervalId);

      // Update the BusLocations document to remove latitude and longitude
      // const busLocationDocRef = doc(database, 'BusLocations', area);
      // await updateDoc(busLocationDocRef, {
      //   lattitude: lat ,
      //   longitude: long ,
      // });
    } catch (error) {
      console.error('Error stopping location sharing:', error);
    }
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  console.log(value);

  const collectionRef = collection(database, 'BusLocations');
    useLayoutEffect(() => {

        const q = query(collectionRef);
        const unsubscribe = onSnapshot(q, querySnapshot => {
          setbusdetails(
            querySnapshot.docs.map(doc => 
              (
              {
                route:doc.data().route,
                visible:doc.data().visible, 
                busno:doc.id

            }))
          ),
          
          
          console.log(querySnapshot.size);
        });        
      
      return unsubscribe;
      }, 
      
      []); 
      
  return (

    <View style={styles.container}>

      <Text style={{fontWeight:"bold",fontSize:20,marginBottom:10}}>Admin Dashboard</Text>
     
      
      <View style={{flexDirection:'row',justifyContent:"space-between",marginTop:10,marginBottom:20}}>
      <View style={{height:100,width:160,backgroundColor:colors.primary,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontWeight:"bold",fontSize:13,color:'white'}}>Latitude: {lat}</Text>
      </View>
      <View style={{height:100,width:160,backgroundColor:colors.primary,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontWeight:"bold",fontSize:13,color:'white'}}>Longitude: {long}</Text>
      </View>
      </View>


      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Text style={{fontWeight:"bold",fontSize:15,top:10}}>Share your Bus Location</Text>

      <Switch
        trackColor={'orange'}
        thumbColor={isEnabled ? 'green' : 'red'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        onChange={isSharingLocation ? stopSharingLocation : shareLocation}
        disabled={!area}
      />
      
      


      </View>

      
      <View style={{ borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth,marginTop:5}}/>

      <Text style={{fontWeight:"bold",fontSize:20,marginTop:10,marginBottom:10}}>Route Buses</Text>

      <ScrollView>
      {
      busdetails.map((value,key)=>         
        <BusCard area={value.route}  busno={value.busno} status={value.visible} key={key}/>
      )
      }
      </ScrollView>
     

      {/* <Button
      color={'red'}
        title={isSharingLocation ? 'Stop Share' : 'Share Location'}
        onPress={isSharingLocation ? stopSharingLocation : shareLocation}
        disabled={!area}
      /> */}

      {/* <Text style={{fontWeight:"bold",fontSize:18,marginTop:10,color:'brown'}}>Add Buses</Text>


      <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginBottom:5}}>Boarding Point</Text>
      <TextInput
            style={styles.input}
            placeholder="Enter Bus Route"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
      />
    <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginBottom:5}}>Bus Number</Text>
    <TextInput
            style={styles.input}
            placeholder="Enter Bus Number"
            autoCapitalize="none"
            keyboardType="phone-pad"
            textContentType="emailAddress"
            autoFocus={true}
      /> */}

    {/* <Text style={{fontSize:15,fontWeight:"bold",marginTop:10,marginBottom:5}}>Date</Text>
      <DateTimePicker
        value={value}
        onValueChange={(date) => setValue(date.split(" ")[0])}
        
      /> */}

    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 50,
    //marginTop: 30,
    fontSize: 16,
    borderRadius: 5,
    padding: 12,
    borderWidth:0.5, 
    borderColor:'grey'
  },
});


