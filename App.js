//////////////////////////////////// firebase
import * as firebase from 'firebase/app'
import 'firebase/auth'
//////////////////////////////////// react
import React, { useState } from 'react'
//////////////////////////////////// react navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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

export default function App() {

  const [isLoggedIn, setLoginStatus] = useState(false)

  firebase.auth().onAuthStateChanged((user) => {
    user ? setLoginStatus(true) : setLoginStatus(false)
  })

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="Food" component={FoodScreen}/>
          <Tab.Screen name="Activities" component={ActivitiesScreen}/>
          <Tab.Screen name="Progress" component={ProgressScreen}/>
          <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
      ) : (
        <LoginScreen login={login} />
      )}
    </NavigationContainer>
  );
}