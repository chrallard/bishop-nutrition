import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
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

  componentDidMount() {
    
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container} >
          <NutritionWidget foodEntry={this.props.route.params.doc.foodEntry} />
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
    justifyContent: 'center'
  }
})