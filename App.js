import { LogBox ,Alert} from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { FontAwesome } from '@expo/vector-icons';
import colors from "./colors";
import Login from './screens/Login';
import Home from './screens/Home';
import Signup from "./screens/Signup";
import AddBuses from "./screens/AddBuses";
import UserProfile from "./screens/UserProfile";




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};


function ChatStack() {
  return (
    <Tab.Navigator  screenOptions={
      {
        headerShown:false,
        tabBarActiveTintColor:'#E96479',
        tabBarInactiveTintColor:'grey',
        tabBarActiveBackgroundColor:"#f2f2f2",
        tabBarStyle:  { height: 60}
      } 
    }>
      <Tab.Screen name="Home" component={Home}  options={{ tabBarIcon:({size,color})=>(
            <FontAwesome name="home" size={25} color={colors.primary} />
          ),}} />
      
      <Tab.Screen name="Add Buses" component={AddBuses}  options={{ tabBarIcon:({size,color})=>(
            <FontAwesome name="bus" size={25} color={colors.primary} />
          ),}} />

      <Tab.Screen name="UserProfile" component={UserProfile}  options={{ tabBarIcon:({size,color})=>(
            <FontAwesome name="user" size={25} color={colors.primary} />
          ),}} />
    </Tab.Navigator>

 

    


  );
}

function AuthStack() {
  return (
    // <Stack.Navigator  defaultScreenOptions={Home}>
    //   <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
    //   <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}/>
    //   <Stack.Screen name='Home' component={Home}  />
    //   <Stack.Screen name='Book' component={Book}  />
    // </Stack.Navigator>
    //options={{tabBarStyle: { display: "none" }}}
    <Tab.Navigator  screenOptions={
      {
        headerShown:false,
        tabBarActiveTintColor:'#E96479',
        tabBarInactiveTintColor:'grey',
        tabBarActiveBackgroundColor:"#f2f2f2",
        tabBarStyle:  { height: 60}
      } 
    }>
      <Tab.Screen name="Login" component={Login} options={{ tabBarVisible: false,tabBarButton: (props) => null,tabBarStyle: { display: "none" },}} />
      <Tab.Screen name="Signup" component={Signup} options={{ tabBarVisible: false,tabBarButton: (props) => null,tabBarStyle: { display: "none" }}} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
 // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

 if (isLoading) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

 return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />} 
     
    </NavigationContainer>
  );
}



export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
    
  );
}







// const AuthenticatedUserContext = createContext({});

// const AuthenticatedUserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
// return (
//     <AuthenticatedUserContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthenticatedUserContext.Provider>
//   );
// };

// function ChatStack() {
//   return (
//     <Stack.Navigator defaultScreenOptions={Home}>
//       <Stack.Screen name='Home' component={Home} />
//       <Stack.Screen name='Chat' component={Chat} />
//       <Stack.Screen name='Complaintpage' component={Complaintpage} />
//       <Stack.Screen name='Monitor' component={Monitor} />
//       <Stack.Screen name='Userprofile' component={Userprofile} />
//       <Stack.Screen name='UltraSonic' component={UltraSonic} />
//     </Stack.Navigator>
//   );
// }

// function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name='Login' component={Login} />
//       <Stack.Screen name='Signup' component={Signup} />
//     </Stack.Navigator>
//   );
// }


// function RootNavigator() {
//   const { user, setUser } = useContext(AuthenticatedUserContext);
//   const [isLoading, setIsLoading] = useState(true);
//  useEffect(() => {
//     // onAuthStateChanged returns an unsubscriber
//     const unsubscribeAuth = onAuthStateChanged(
//       auth,
//       async authenticatedUser => {
//         authenticatedUser ? setUser(authenticatedUser) : setUser(null);
//         setIsLoading(false);
//       }
//     );
//  // unsubscribe auth listener on unmount
//     return unsubscribeAuth;
//   }, [user]);

//  if (isLoading) {

//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size='large' />
//       </View>
//     );
//   }

//  return (
//     <NavigationContainer>
//       {user ? <ChatStack /> : <AuthStack />} 
     
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <AuthenticatedUserProvider>
//       <RootNavigator />
//     </AuthenticatedUserProvider>
    
//   );