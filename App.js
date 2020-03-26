//////////////////////////////////// firebase
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
//////////////////////////////////// react
import React, { useState } from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
//////////////////////////////////// react navigation
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//////////////////////////////////// icons
import { MaterialCommunityIcons } from 'react-native-vector-icons'
//////////////////////////////////// screens
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FoodScreen from './screens/FoodScreen'
import ProgressScreen from './screens/ProgressScreen'
import ProfileScreen from './screens/ProfileScreen'
import UpdatePasswordScreen from './screens/UpdatePasswordScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import DailyLogWidget from './widgets/DailyLogWidget'
import SummaryScreen from './screens/SummaryScreen'
import About from './screens/About'
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
const HomeStack = createStackNavigator()
const FoodStack = createStackNavigator()
const ActivitiesStack = createStackNavigator()
const ProgressStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const LoginStack = createStackNavigator()

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Dashboard" component={HomeScreen} options={{
        title: "Dashboard",
        headerTitleStyle: {
          fontSize: 17,
          color: '#DDDEDE',
          fontWeight: '700'
        },
        headerStyle: {
          borderBottomColor: '#B7B7B7',
          borderBottomWidth: 0.5
        }

      }} />
      <HomeStack.Screen name="DailyLogWidget" component={DailyLogWidget} />
      <HomeStack.Screen name="Summary" component={SummaryScreen} options={{
        title: "Summary"
      }} />
    </HomeStack.Navigator>
  )
}

function FoodStackScreen() {
  return (
    <FoodStack.Navigator>
      <FoodStack.Screen name="Food List" component={FoodScreen} options={{
        title: "Food List"
      }} />
    </FoodStack.Navigator>
  )
}

// function ActivitiesStackScreen() {
//   console.log("hi")
//   return (
//     <ActivitiesStack.Navigator>
//       <ActivitiesStack.Screen name="Activities" component={ActivitiesScreen} options={{
//         title: "JEFF/CONOR - STYLE",
//         showMe: true
//       }} />
//     </ActivitiesStack.Navigator>
//   )
// }

function ProgressStackScreen() {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen name="Progress" component={ProgressScreen} options={{
        title: "Progress"
      }} />
    </ProgressStack.Navigator>
  )
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
        title: "Profile"
      }} />
      <ProfileStack.Screen name="Update Password" component={UpdatePasswordScreen} options={{
        title: "Update Password"
      }} />
      <ProfileStack.Screen name="About" component={About} options={{
        title: "About"
      }} />
    </ProfileStack.Navigator>
  )
}

function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen} options={{
        title: "",
        headerStyle: {
          backgroundColor: '#000',
          shadowColor: 'transparent',
          borderBottomWidth: 0
        }
      }} />
      <LoginStack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
    </LoginStack.Navigator>
  )
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
      <SafeAreaView style={{ backgroundColor: '#000' }} />
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
            component={HomeStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              )
            }} />

          <Tab.Screen
            name="Food"
            component={FoodStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="food-fork-drink" color={color} size={size} />
              )
            }} />



          <Tab.Screen
            name="Progress"
            component={ProgressStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="chart-line" color={color} size={size} />
              )
            }} />

          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              )
            }} />

        </Tab.Navigator>
      ) : (
          <LoginStackScreen />
        )}
      <SafeAreaView style={{ backgroundColor: '#000' }} />
    </NavigationContainer>

  );
}

