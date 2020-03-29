import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, ScrollView, YellowBox, StatusBar } from 'react-native'
import WelcomeWidget from '../widgets/WelcomeWidget'
import DailyLogWidget from '../widgets/DailyLogWidget'
import FoodTrackingWidget from '../widgets/FoodTrackingWidget'
import WaterTrackingWidget from '../widgets/WaterTrackingWidget'
import SleepTrackingWidget from '../widgets/SleepTrackingWidget'
import ActivityTrackingWidget from '../widgets/ActivityTrackingWidget'
import healthTrackingTemplate from '../dataTemplates/healthTrackingTemplate'
import bodyTrackingTemplate from '../dataTemplates/bodyTrackingTemplate'
import WeightWidget from '../widgets/WeightWidget'
import MoodTrackingWidget from '../widgets/MoodTrackingWidget'


export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uid: ""
    }
  }

  async componentDidMount() {
    // await this.setState({ uid: await getUid() })
    // await checkIfTodaysObjectsExist(this.state.uid)


    

    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ])
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container} >
          <WelcomeWidget />
          {/* <DailyLogWidget navProps={this.props.navigation} />
          <FoodTrackingWidget />
          <WaterTrackingWidget />
          <WeightWidget/>
          <SleepTrackingWidget />
          <ActivityTrackingWidget />
          <MoodTrackingWidget /> */}
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