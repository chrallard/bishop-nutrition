import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class FoodTrackingWidget extends Component {

    constructor(props) {
      super(props)
      this.state = {
  
      }
    }
  
    render() {
      return (
            <View style={styles.container} >
              <Text>track food here</Text>
            </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginBottom: 20,
        marginTop: 20
    }
  })