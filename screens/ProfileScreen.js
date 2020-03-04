import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as firebase from "firebase/app"

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  signOut = async () => {
    await firebase.auth().signOut().then()
    .catch((err) => {
      console.log(err)
    });
  }

  render() {
    return (
          <View style={styles.container} >
            <Button 
            title="Sign Out"
            onPress={this.signOut} />
             <Button 
             title="Update Password" 
             onPress={() => {this.props.navigation.navigate("Update Password")}} />
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