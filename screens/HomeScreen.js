import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import FoodTrackingWidget from '../widgets/FoodTrackingWidget'
import WelcomeWidget from '../widgets/WelcomeWidget'

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