import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, ScrollView, YellowBox, StatusBar, ActivityIndicator, Modal, TouchableHighlight } from 'react-native'
import {MaterialIndicator} from 'react-native-indicators';
import WelcomeWidget from '../widgets/WelcomeWidget'
import DailyLogWidget from '../widgets/DailyLogWidget'
import FoodTrackingWidget from '../widgets/FoodTrackingWidget'
import WaterTrackingWidget from '../widgets/WaterTrackingWidget'
import SleepTrackingWidget from '../widgets/SleepTrackingWidget'  //imports all needed widgets and components
import ActivityTrackingWidget from '../widgets/ActivityTrackingWidget'
import healthTrackingTemplate from '../dataTemplates/healthTrackingTemplate'
import bodyTrackingTemplate from '../dataTemplates/bodyTrackingTemplate'
import WeightWidget from '../widgets/WeightWidget'
import MoodTrackingWidget from '../widgets/MoodTrackingWidget'


export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loadingVisible: true,
      mountedComponents: 0,
      displayStyle: styles.loading
    }
  }

  async componentDidMount() {
    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ])
  }

  handleMount = () => {
    console.log(this.state.mountedComponents)

    let num = this.state.mountedComponents
    num += 1
    this.setState({ mountedComponents: num })


    if(num == 6) { // this number is based on how many widgets are mounting - ActivityTrackingWidget and SleepTrackingWidget mess up the # of monutedComponents
      this.setState({ 
        loadingVisible: false,
        displayStyle: styles.invisible
      })
    }
  }

  render() {
      return (
        <>
          <View style={this.state.displayStyle} >
            <MaterialIndicator color='#347EFB' size={50} />
          </View>

          <ScrollView>
            <View style={styles.container} >
              <WelcomeWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
              <DailyLogWidget mounted={this.handleMount} visible={!this.state.loadingVisible} navProps={this.props.navigation} />
              <FoodTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
              <WaterTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
              <WeightWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
              <SleepTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} /> 
              <ActivityTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} /> 
              <MoodTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
            </View>
          </ScrollView>
        </>
      )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    height: '100%',
    justifyContent: 'center'
  },

  invisible: {
    display: 'none'
  }
})