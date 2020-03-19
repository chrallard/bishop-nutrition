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
      waterEntry: []
    }
  }

  async componentDidMount() {
    await this.setUid()
    await this.getData()
  }

  componentDidUpdate() {
    //console.log(this.state.foodEntry)
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
          waterEntry: [this.props.route.params.doc.waterEntry]
        })
        break

      case 1:
        let weekHealthTrackingData = this.state.healthTrackingData.slice(0, 7).map((item) => {
          return item
        })

        let weekFoodEntry = []
        let weekWaterEntry = []

        weekHealthTrackingData.forEach((item) => {
          weekFoodEntry.push(item.foodEntry)
          weekWaterEntry.push(item.waterEntry)
        })

        this.setState({
          foodEntry: weekFoodEntry,
          waterEntry: weekWaterEntry
        })
        break

      case 2:
        let monthFoodEntry = []
        let monthWaterEntry = []

        this.state.healthTrackingData.forEach((item) => {
          monthFoodEntry.push(item.foodEntry)
          monthWaterEntry.push(item.waterEntry)
        })

        this.setState({
          foodEntry: monthFoodEntry,
          waterEntry: monthWaterEntry
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
            tabsContainerStyle={styles.tabsContainerStyleFav}
            tabStyle={styles.tabStyleFav}
            firstTabStyle={styles.firstTabStyleFav}
            lastTabStyle={styles.lastTabStyleFav}
            tabTextStyle={styles.tabTextStyleFav}
            activeTabStyle={styles.activeTabStyleFav}
            activeTabTextStyle={styles.activeTabTextStyleFav}
          />

          <NutritionWidget uid={this.state.uid} usersPlan={this.state.usersPlan} foodEntry={this.state.foodEntry} />
          <WaterWidget />
          <ActivityWidget />
          <SleepWidget />
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

  tabsContainerStyleFood: {
    width: 250,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
    //borderColor: '#636366'
  },
  tabStyleFood: {
    borderColor: '#636366',
    backgroundColor: '#1C1C1E'
  },
  firstTabStyleFood: {
    //backgroundColor: '#1C1C1E'
  },
  lastTabStyleFood: {
    //backgroundColor: '#636366'
  },
  tabTextStyleFood: {
    color: '#DDDEDE'
  },
  activeTabStyleFood: {
    backgroundColor: '#636366',
    // borderRadius: 10,
    // marginTop: 3,
    // marginBottom: 3
  },
  activeTabTextStyleFood: {
    color: '#DDDEDE'
  },

})