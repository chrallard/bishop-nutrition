import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import NutritionWidget from '../widgets/summaryWidgets/NutritionWidget'
import WaterWidget from '../widgets/summaryWidgets/WaterWidget'
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
      sleepEntry: this.props.route.params.doc.sleepEntry
    }
  }

  async componentDidMount() {
    await this.setUid()
    await this.getData()
  }

  setUid = async() => {
    let uid = await firebase.auth().currentUser.uid
    this.setState({ uid })
  }

  getData = async () => {

    await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").orderBy("timeStamp", "desc").limit(30).get().then((querySnapshot) => {
      let healthTrackingData = []

      querySnapshot.forEach((item) => {
        healthTrackingData.push(item.data())
      })

      this.setState({ healthTrackingData })
    })

    //get body tracking data

  }

  handleIndexChange = (index) => {
    this.setState({
      selectedIndex: index
    })

    switch (index) {
      case 0:
        this.setState({ 
          foodEntry: [this.props.route.params.doc.foodEntry], 
          waterEntry: [this.props.route.params.doc.waterEntry],
          sleepEntry: [this.props.route.params.doc.sleepEntry]
        })
        break

      case 1:
        let weekHealthTrackingData = this.state.healthTrackingData.slice(0, 7).map((item) => {
          return item
        })

        let weekFoodEntry = []
        let weekWaterEntry = []
        let weekSleepEntry = []

        weekHealthTrackingData.forEach((item) => {
          weekFoodEntry.push(item.foodEntry)
          weekWaterEntry.push(item.waterEntry)
          weekSleepEntry.push(item.sleepEntry)
        })

        this.setState({
          foodEntry: weekFoodEntry,
          waterEntry: weekWaterEntry,
          sleepEntry: weekSleepEntry
        })
        break

      case 2:
        let monthFoodEntry = []
        let monthWaterEntry = []
        let monthSleepEntry = []

        this.state.healthTrackingData.forEach((item) => {
          monthFoodEntry.push(item.foodEntry)
          monthWaterEntry.push(item.waterEntry)
          monthSleepEntry.push(item.sleepEntry)
        })

        this.setState({
          foodEntry: monthFoodEntry,
          waterEntry: monthWaterEntry,
          sleepEntry: monthSleepEntry
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
          <ActivityWidget />
          <SleepWidget sleepEntry={this.state.sleepEntry} />
          <MoodWidget />

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
    marginTop: 16,
    marginBottom: 16,
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