import React, { Component } from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default class ForgotPasswordScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
          emailInput: ""
        }
    }

    resetPassword = (email) => {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            alert(`A password reset email has been sent to ${email}`)
        }).catch(function(error) {
            alert(error)
        });
    }

    render(){
        return(
            <View style={styles.container} >
                <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => this.setState({emailInput: text})}
                value={this.state.usernameInput}
                />
                <View style={styles.btn}>
                    <Button 
                    title="Reset"
                    onPress={() => this.resetPassword(this.state.emailInput)}
                    disabled={this.state.emailInput ? false : true}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 150
    },
    input: {
      height: 40,
      width: 200,
      paddingLeft: 5,
      borderBottomColor: "#505050",
      borderBottomWidth: 1,
      margin: 5
    },
    btn: {
      paddingTop: 50
    }
})