import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import WelcomeWidget from '../widgets/WelcomeWidget'
import FoodTrackingWidget from '../widgets/FoodTrackingWidget'
import WaterTrackingWidget from '../widgets/WaterTrackingWidget'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
          <View style={styles.container} >
            <WelcomeWidget />
            <FoodTrackingWidget />
            <WaterTrackingWidget/>
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