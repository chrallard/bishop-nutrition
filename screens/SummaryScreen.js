import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class SummaryScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
          <View style={styles.container} >
            <Text>{this.props.route.params.docId}</Text>
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