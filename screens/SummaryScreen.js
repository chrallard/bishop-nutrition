import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NutritionWidget from '../widgets/summaryWidgets/NutritionWidget'
import WaterWidget from '../widgets/summaryWidgets/WaterWidget'
import ActivityWidget from '../widgets/summaryWidgets/ActivityWidget'
import SleepWidget from '../widgets/summaryWidgets/SleepWidget'
import MoodWidget from '../widgets/summaryWidgets/MoodWidget'

export default class SummaryScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
          <View style={styles.container} >
            {/* <Text>{this.props.route.params.docId}</Text> */}
            <NutritionWidget />
            <WaterWidget />
            <ActivityWidget />
            <SleepWidget />
            <MoodWidget />
          </View>
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