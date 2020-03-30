import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import NutritionWidget from '../widgets/summaryWidgets/NutritionWidget'
import WaterWidget from '../widgets/summaryWidgets/WaterWidget' //imports of required components and libraries
import ActivityWidget from '../widgets/summaryWidgets/ActivityWidget'
import SleepWidget from '../widgets/summaryWidgets/SleepWidget'
import MoodWidget from '../widgets/summaryWidgets/MoodWidget'
import * as firebase from 'firebase/app'
import 'firebase/firestore'


export default class SummaryScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      healthTrackingData: [],
      uid: "",
      usersPlan: "",
      selectedIndex: 0,

      foodEntry: this.props.route.params.doc.foodEntry,
      waterEntry: this.props.route.params.doc.waterEntry,
      exerciseEntry: this.props.route.params.doc.exerciseEntry,//initializes needed state vairables
      sleepEntry: this.props.route.params.doc.sleepEntry,
      moodEntry: this.props.route.params.doc.moodEntry
    }
  }

  async componentDidMount() {
    await this.setUid()
    await this.getData()
  }

  setUid = async () => {
    let uid = await firebase.auth().currentUser.uid
    this.setState({ uid })
  }

  getData = async () => { //calls the database and pulls needed health data

    await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").orderBy("timeStamp", "desc").limit(30).get().then((querySnapshot) => {
      let healthTrackingData = []

      querySnapshot.forEach((item) => {
        healthTrackingData.push(item.data())
      })

      this.setState({ healthTrackingData })
    })



  }

  handleIndexChange = (index) => {
    this.setState({
      selectedIndex: index //used to change segmented tabs 
    })

    switch (index) { //switch cases load data only rhe required amount of data needed for the segmendted tab
      case 0:
        this.setState({
          foodEntry: [this.props.route.params.doc.foodEntry],
          waterEntry: [this.props.route.params.doc.waterEntry],
          exerciseEntry: [this.props.route.params.doc.exerciseEntry],
          sleepEntry: [this.props.route.params.doc.sleepEntry],
          moodEntry: this.props.route.params.doc.moodEntry
        })
        break

      case 1:
        let weekHealthTrackingData = this.state.healthTrackingData.slice(0, 7).map((item) => {
          return item
        })

        let weekFoodEntry = []
        let weekWaterEntry = []
        let weekExerciseEntry = []
        let weekSleepEntry = []

        weekHealthTrackingData.forEach((item) => {
          weekFoodEntry.push(item.foodEntry)
          weekWaterEntry.push(item.waterEntry)
          weekExerciseEntry.push(item.exerciseEntry)
          weekSleepEntry.push(item.sleepEntry)
        })

        this.setState({
          foodEntry: weekFoodEntry,
          waterEntry: weekWaterEntry,
          exerciseEntry: weekExerciseEntry,
          sleepEntry: weekSleepEntry,
          moodEntry: null
        })
        break

      case 2:
        let monthFoodEntry = []
        let monthWaterEntry = []
        let monthExerciseEntry = []
        let monthSleepEntry = []

        this.state.healthTrackingData.forEach((item) => {
          monthFoodEntry.push(item.foodEntry)
          monthWaterEntry.push(item.waterEntry)
          monthExerciseEntry.push(item.exerciseEntry)
          monthSleepEntry.push(item.sleepEntry)
        })

        this.setState({
          foodEntry: monthFoodEntry,
          waterEntry: monthWaterEntry,
          exerciseEntry: monthExerciseEntry,
          sleepEntry: monthSleepEntry,
          moodEntry: null
        })
        break

      default:

    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container} >

          <SegmentedControlTab
            values={["Daily", "Weekly", "Monthly"]}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}

            allowFontScaling={false}
            tabsContainerStyle={styles.tabsContainerStyleSummary}
            tabStyle={styles.tabStyleSummary}
            firstTabStyle={styles.firstTabStyleSummary}
            lastTabStyle={styles.lastTabStyleSummary}
            tabTextStyle={styles.tabTextStyleSummary}
            activeTabStyle={styles.activeTabStyleSummary}
            activeTabTextStyle={styles.activeTabTextStyleSummary}
          />

          <NutritionWidget foodEntry={this.state.foodEntry} />
          <WaterWidget waterEntry={this.state.waterEntry} />
          <ActivityWidget exerciseEntry={this.state.exerciseEntry} />
          <SleepWidget sleepEntry={this.state.sleepEntry} />
          <MoodWidget moodEntry={this.state.moodEntry} />

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  tabsContainerStyleSummary: {
    width: 250,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  tabStyleSummary: {
    borderColor: '#636366',
    backgroundColor: '#1C1C1E'
  },
  tabTextStyleSummary: {
    color: '#DDDEDE'
  },
  activeTabStyleSummary: {
    backgroundColor: '#636366',
  },
  activeTabTextStyleSummary: {
    color: '#DDDEDE'
  },

})