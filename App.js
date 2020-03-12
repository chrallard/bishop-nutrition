//////////////////////////////////// firebase
import * as firebase from 'firebase/app'
import 'firebase/auth'
//////////////////////////////////// react
import React, { useState } from 'react'
import {SafeAreaView, StatusBar, SafeAreaViewBase } from 'react-native';
//////////////////////////////////// react navigation
import { NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//////////////////////////////////// icons
import { MaterialCommunityIcons } from 'react-native-vector-icons'
//////////////////////////////////// screens
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FoodScreen from './screens/FoodScreen'
import ActivitiesScreen from './screens/ActivitiesScreen'
import ProgressScreen from './screens/ProgressScreen'
import ProfileScreen from './screens/ProfileScreen'
//////////////////////////////////// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBa7mPzRK5vFZYMrIMtTjtJhecI0pqlYNc",
  authDomain: "bishop-nutrition.firebaseapp.com",
  databaseURL: "https://bishop-nutrition.firebaseio.com",
  projectId: "bishop-nutrition",
  storageBucket: "bishop-nutrition.appspot.com",
  messagingSenderId: "466030141964",
  appId: "1:466030141964:web:a02f48b8bc97e2234f4429"
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
////////////////////////////////////

const Tab = createBottomTabNavigator()

login = async (usernameInput, passwordInput) => { 
  await firebase.auth().signInWithEmailAndPassword(usernameInput, passwordInput).then()
  .catch((err) => {
    alert(err.code + err.message)
  })
}

const MyTheme = {
  colors: {
    background: '#000',
    text: '#DDDEDE',
  },
};


export default function App() {

  const [isLoggedIn, setLoginStatus] = useState(false)

  firebase.auth().onAuthStateChanged((user) => {
    user ? setLoginStatus(true) : setLoginStatus(false)
  })

  return (
    
    
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{backgroundColor: '#000' }} />
      {isLoggedIn ? (
        <Tab.Navigator 
        tabBarOptions={{
          activeTintColor: '#347EFB',
          inactiveTintColor: '#DDDEDE',
          inactiveBackgroundColor: '#000',
          activeBackgroundColor: '#000'
        }}>
          
          <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )
          }} />

          <Tab.Screen 
          name="Food List" 
          component={FoodScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="food-fork-drink" color={color} size={size} />
            )
          }} />

          <Tab.Screen 
          name="Activities" 
          component={ActivitiesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="run" color={color} size={size} />
            )
          }} />

          <Tab.Screen 
          name="Progress" 
          component={ProgressScreen}options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-line" color={color} size={size} />
            )
          }} />

          <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            )
          }} />

        </Tab.Navigator>
      ) : (
        <LoginScreen login={login} />
      )}
      <SafeAreaView style={{backgroundColor: '#000' }} />
    </NavigationContainer>

  );
}