import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, ScrollView, YellowBox } from 'react-native'
import WelcomeWidget from '../widgets/WelcomeWidget'
import DailyLogWidget from '../widgets/DailyLogWidget'
import FoodTrackingWidget from '../widgets/FoodTrackingWidget'
import WaterTrackingWidget from '../widgets/WaterTrackingWidget'
import ActivityTrackingWidget from '../widgets/ActivityTrackingWidget'

import healthTrackingTemplate from '../dataTemplates/healthTrackingTemplate'
import bodyTrackingTemplate from '../dataTemplates/bodyTrackingTemplate'
import MoodTrackingWidget from '../widgets/MoodTrackingWidget'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uid: ""
    }
  }

  componentDidMount() {
    this.setUid()

    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ])
  }

  setUid = async () => {
    let uid = await firebase.auth().currentUser.uid
    this.setState({ uid })

    this.checkIfTodaysObjectsExist()
  }

  checkIfTodaysObjectsExist = async () => { //checking if there are existing objects for today in the db

    //get todays date
    let d = new Date()
    let today = this.formatDate(d)
    let formatDate = (t) => { //can't access this function inside the forEach for some reason
      return this.formatDate(t)
    }

    let todaysObjectsExist = false

    await firebase.firestore()
      .collection("userData")
      .doc(this.state.uid)
      .collection("healthTracking")
      .orderBy("timeStamp", "desc")
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          let timeStamp = doc.data().timeStamp
          let timeStampDate = new Date(timeStamp)
          const day = formatDate(timeStampDate)

          if (today == day) { //if today's date matches one in the database, set it to true. if not todaysObjectsExist remains false
            todaysObjectsExist = true
          }
        });
      });

    if (todaysObjectsExist == false) { //setting an empty template object to healthTracking collection if one for today doesn't exist
      console.log("No tracking object exists for today's date. Creating...")
      this.createTodaysEmptyObjects()
    } else {
      console.log("Today's tracking objects already exist.")
    }
  }

  createTodaysEmptyObjects = async () => { //creating empty template objects for today's date in db
    let now = Date.now()
    let humanDate = this.formatDate(new Date(now))
    healthTrackingTemplate.timeStamp = bodyTrackingTemplate.timeStamp = now //both docs share the same timestamp
    healthTrackingTemplate.humanDate = bodyTrackingTemplate.humanDate = humanDate //also a human readable date to make life easier

    let healthTrackingRef = firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking")
    let bodyTrackingRef = firebase.firestore().collection("userData").doc(this.state.uid).collection("bodyTracking")

    await healthTrackingRef
      .doc()
      .set(healthTrackingTemplate) //imported data template
      .then(() => {
        console.log("healthTrackingTemplate successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      })

    await bodyTrackingRef
      .doc()
      .set(bodyTrackingTemplate) //imported data template
      .then(() => {
        console.log("bodyTrackingTemplate successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      })
  }

  formatDate = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    const formattedDate = date + month + year //looks like this: 4March2020

    return formattedDate
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container} >
          <WelcomeWidget />
          <DailyLogWidget navProps={this.props.navigation} />
          <FoodTrackingWidget />
          <WaterTrackingWidget />
          <MoodTrackingWidget />
          <ActivityTrackingWidget />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})