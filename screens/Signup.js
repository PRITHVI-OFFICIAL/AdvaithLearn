import { StyleSheet, Text, TextInput, View ,TouchableOpacity,Image ,Alert,} from 'react-native';
import React, { useState,useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,database} from '../config/firebase';
import colors from '../colors';
import {collection,addDoc,orderBy,query,onSnapshot,setDoc,doc,getDoc} from 'firebase/firestore';
import RadioGroup from 'react-native-radio-buttons-group';


function Signup(){


    const navigation = useNavigation();
    const [name,setName]=useState("");
    const [number,setnumber]=useState("");
    const [email, setEmail] = useState("");
    const [area, setarea] = useState("");
    const [password, setPassword] = useState("");

    //const userCollectionRef = collection(database,'Users',email.split()[0]) 

    const radioButtons = useMemo(() => ([
        {
            id: true, // acts as primary key, should be unique and non-empty string
            label: 'Bus Conductor',
            value: 'Bus Conductor'
        },
        {
            id: false,
            label: 'Passenger',
            value: 'Passenger'
        },
    ]), []);

    const [selectedId, setSelectedId] = useState();
    

    const onHandleSignup = () => {
        if (email !== '' && password !== '') {

            setDoc(doc(database, "Users", email.split("@")[0]), {
                name: name,
                email:email, 
                mobile:number,
                area: area
            
            
            
              });

      createUserWithEmailAndPassword(auth, email, password)
      

            .then(() => console.log('Signup success'))
            .catch((err) => Alert.alert("Login error", err.message));
        }
      };

      console.log('Hiiii');


    return(
        <View style={styles.container}>
            <View style={styles.container1}>
            <Image
                source={require('../assets/logo.png')}
                style={{width: 300, height: 200,alignSelf:"center"}}
            />
            </View>

            {/* <View style={styles.container2}>
                <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                <Text style={styles.heading1}>Register</Text>
                <Text style={styles.heading1}>Login</Text>
                </View>
            </View> */}

            <View style={styles.container3}>
            <View style={{marginTop:50}}>
            <Text style={{fontWeight:"bold",fontSize:30,textAlign:"center",color:"white"}}>Admin Signup</Text>

            <TextInput
            style={styles.input}
            placeholder="Enter your Name"
           
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={name}
            onChangeText={(text) => setName(text)}
            />
            <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />


            <TextInput
            style={styles.input}
            placeholder="Enter Bus No"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={area}
            onChangeText={(text) => setarea(text)}
            />

            {/* <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
            layout='row'
            containerStyle={{color:'white'}}
            
            />      */}
            <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            autoCapitalize="none"
            keyboardType="phone-pad"
            //textContentType="number"
            autoFocus={true}
            value={number}
            onChangeText={(text) => setnumber(text)}
            />

        <TextInput
            style={styles.input}
            placeholder="Enter Password"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
            autoCorrect={false}
            autoFocus={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
        />

            {/* <View style={{height:50,width:130,backgroundColor:"red",borderRadius:10,alignSelf:"center",marginTop:40}}>
                   <Text style={{textAlign:"center",marginTop:12,fontWeight:"bold",color:"white"}}>Submit</Text>
            </View> */}

        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Sign Up</Text>
      </TouchableOpacity>

            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                <   Text style={{color: 'white', fontWeight: '400', fontSize: 14}}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{color: 'red', fontWeight: '600', fontSize: 14}}> Login</Text>
            </TouchableOpacity>
            </View>
            </View>
            
            </View>
        </View>
    )
}
export default Signup;

const styles = StyleSheet.create({
    container: {
       flex:1, 
      backgroundColor:colors.primary,

    },
    container2:{
        height:40,
        //backgroundColor:"blue",
    },
    container1: {
        marginTop:60,
        height:100,
        //backgroundColor:"yellow"
     },
     container3: {
        marginTop:10,
        height:500,
        width:"90%",
        alignSelf:"center",
        //backgroundColor:"green", 
        borderRadius:10,

     },
     heading1:{
        fontSize:18,
        fontWeight:"bold",
        color:"white"
     },
     heading:{
        fontSize:40, 
        fontWeight:"bold", 
        textAlign:"center",
        color:"white"
     }, 
     input: {
        backgroundColor: "#F6F7FB",
        height: 50,
        marginTop: 20,
        marginBottom:15,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
      },
      button: {
        backgroundColor:"red",
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      
  });