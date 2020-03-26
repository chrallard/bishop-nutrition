
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button,TouchableHighlight,Image,TouchableOpacity, TouchableOpacityBase } from 'react-native';
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import 'firebase/auth'

const planTotal = 0;
const maxPortions = 0;
const dailyWater = 0;

export default class WaterTrackingWidget extends Component {

  constructor(props){
      super(props)
      this.state = {
        uid: null,
        usersPlan: null,
        docId: null,
        maxWater: null,
        usersWater: null,
        cups: [],
      }
  }
    
  async componentDidMount(){
    await this.setUid()
    await this.setUsersPlan()
    await this.setTodaysDocId()
    await this.setMaxWater()
    await this.setUsersWater()
    this.buildCupsArray()
  }

  setUid = async() => {
      let uid = await firebase.auth().currentUser.uid
      this.setState({ uid })
  }

  setUsersPlan = async () => {
      let usersPlan = await firebase.firestore().collection("userData").doc(this.state.uid).get().then((doc) => { return doc.data().plan })
      this.setState({ usersPlan })
  }

  setTodaysDocId = async () => {
      //get todays date - format
      let d = new Date()
      let today = this.formatDate(d)
      let formatDate = (d) => { //can't access this function inside the forEach for some reason
          return this.formatDate(d)
      }
      let docId

      //loop through user data and get the dates to format
      await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").orderBy("timeStamp", "desc").limit(15).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              let formattedDate = formatDate(new Date(doc.data().timeStamp))

              if(formattedDate == today){ //selecting today's healthTracking document ID
                  docId = doc.id
              }  
          })
      })

      this.setState({ docId })
  }

  setMaxWater = async () => {
    let maxWater = await firebase.firestore().collection("plans").doc(this.state.usersPlan).get().then((doc) => { 
      return doc.data().water.maxPortions
    })
    this.setState({ maxWater }) //this is the amount of water recommended on the user's plan
  }

  setUsersWater = async () => {
    let usersWater = await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").doc(this.state.docId).get().then((doc) => {
      return doc.data().waterEntry.portions
    })
    this.setState({ usersWater }) //this is the amount of water the user has entered previously
  }

  formatDate = (d) => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    const formattedDate = date + month + year //looks like this: 4March2020
  
    return formattedDate
  }

  buildCupsArray = () => {
    let cups = []
    for(let c = 0; c < this.state.maxWater; c++){ //building the initial amount of empty cups shown
      cups.push(true)
    }

    let fullCups = []
    for(let c= 0; c < this.state.usersWater; c++){ //building how many of the cups should be full
      fullCups.push(false)
    }

    fullCups.forEach((item, index) => { //replacing the empty cups with the correct number of full cups
      cups.splice(index, 1, item)
    })

    this.setState({ cups })
  }

  changeCup = async (i) => {

    let newCups = this.state.cups
    let maxCups = this.state.maxWater
    if(newCups[i] == true){
      //change all to the left = false
      for(let c = i; c > -1; c--){
        newCups[c] = false
      }
    }else{
      //change all to the right = true
      for(let c = i; c < maxCups; c++){
        newCups[c] = true
      }
    }

    this.setState({ cups: newCups })

    let n = 0
    newCups.forEach((item) => { //getting the number of full cups
      if(item == false){
        n++
      }
    })

    //pushing the number of full cups to the db
    await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").doc(this.state.docId)
    .set({waterEntry: {portions: n}}, {merge: true})

    //updating the state so the number values reflect the change
    this.setState({ usersWater: n })
  }
    
  render() {
    return(
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Water</Text>
          <Text style={styles.bodyText}>{this.state.usersWater} of {this.state.maxWater}</Text>
        </View>

        <View style={styles.cupRow}>
          {this.state.cups.map((item, index) => (
                
            <TouchableOpacity onPress={() => this.changeCup(index)} activeOpacity={0.5} key={index}>
              <Image 
              source={this.state.cups[index] === true ? 
              require('../Images/empty_Cup.png') :
              require('../Images/full_Cup.png')}
              style={styles.image} />
            </TouchableOpacity>

          ))}
        </View>

      </View>
    )
  }  
}

const styles = StyleSheet.create({

  //Styled by Jeff March 6th
  container:{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1C1C1E',
    padding: 16,
    alignSelf: 'stretch',
    marginBottom: 8,
    marginTop: 8
},

  titleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
},
  titleText:{
    color:'#FAFAFA',
    fontSize: 20,
},
bodyText:{
    color:'#DDDEDE',
    fontSize: 12,
},

cupRow:{
  flexDirection: 'row',
  justifyContent: 'space-between'
},
image: {
      height: 45,
      width: 40,
      resizeMode: 'cover',     
      alignItems: 'stretch'    
  }
});