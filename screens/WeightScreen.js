import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import WeightWidget from '../widgets/WeightWidget'
export default class WeightScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
       <View>
         <Text>Hello</Text>
       </View>
         
    )
  }
}


