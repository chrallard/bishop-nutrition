import React, { Component } from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default class LoginScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
          usernameInput: "",
          passwordInput: ""
        }
    }

    login = async (usernameInput, passwordInput) => { 
      await firebase.auth().signInWithEmailAndPassword(usernameInput, passwordInput).then()
      .catch((err) => {
        alert(err.code + err.message)
      })
    }

    render(){
        return(
            <View style={styles.container} >
                <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => this.setState({usernameInput: text})}
                value={this.state.usernameInput}
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => this.setState({passwordInput: text})}
                value={this.state.passwordInput}
                secureTextEntry={true}
                />
                <View style={styles.btn}>
                    <Button 
                    title="Login" 
                    onPress={() => {this.login(this.state.usernameInput, this.state.passwordInput)}}
                    disabled={this.state.usernameInput && this.state.passwordInput ? false : true}
                    />
                    <Button 
                    title="Forgot Password" 
                    onPress={() => {this.props.navigation.navigate('Forgot Password')}}
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