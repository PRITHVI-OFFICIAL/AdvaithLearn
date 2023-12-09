import { View, TextInput, Modal, FlatList, TouchableOpacity, Text ,StyleSheet,Pressable,Dimensions,Button,Image,ActivityIndicator,Switch,Alert} from 'react-native';
import React, {  useEffect, useState, useLayoutEffect} from "react";
import { auth, database } from "../config/firebase";
import { getAuth} from "firebase/auth";
import {collection,addDoc,orderBy,query,onSnapshot,setDoc,doc,getDoc,where, updateDoc} from 'firebase/firestore';
import colors from '../colors';


const BusCard = ({ area, time, busno, status }) => {
  const [switchValue, setSwitchValue] = useState(status);

  useEffect(() => {
    setSwitchValue(status);
  }, [status]);

  const toggleSwitch = () => {
    const newValue = !switchValue;
    setSwitchValue(newValue);

    // Update Firestore document based on the switch value
    updateFirestoreDocument(newValue);
  };

  

  const updateFirestoreDocument = (visible) => {
   
    //setColor(color === '#a9a9a9' ? 'black' : '#a9a9a9');
      try {

        const busDocRef = doc(database, "BusLocations", busno);
        updateDoc(busDocRef,{

          visible:visible
        });
        
        Alert.alert("Success","Changes Done Successfully")
        console.log("Done Changes");
      } catch (error) {
        console.error("Error updating bus details:", error);
        Alert.alert("Error updating bus details");
      }
    
};

return (
    <View style={{ height: 100, backgroundColor: colors.primary, marginTop: 20, borderRadius: 10, elevation: 4, flexDirection: "row", justifyContent: "space-around" }}>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>{area}</Text>
        <Text style={{ fontWeight: '400', color: 'white' }}>Bus No: {busno}</Text>
      </View>

      <View style={{ height: "70%", width: 1, backgroundColor: "white", alignSelf: "center" }}>
        
      </View>

      {/* <View style={{ margin: 18, alignSelf: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>{busno}</Text>
      </View> */}

      <View style={{ alignSelf: 'center' }}>
        <Switch
          value={switchValue}
          onValueChange={toggleSwitch}
          trackColor={{ false: "red", true: "green" }}
          thumbColor={'white'}
          //ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
});

export default BusCard;
