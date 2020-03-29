import React, { Component } from 'react'
import { StyleSheet, View, Button, TextInput, Text, TouchableOpacity, Image } from 'react-native' //imports required for functionality
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default class ForgotPasswordScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      emailInput: ""
    }
  }

  resetPassword = (email) => { //function that takes an email and sends a reset password link 
    firebase.auth().sendPasswordResetEmail(email).then(function () {
      alert(`A password reset email has been sent to ${email}`)
    }).catch(function (error) {
      alert(error)
    });
  }

  render() {
    return (
      <View style={styles.forgotPasswordLayout}>
        <Image source={require('../assets/forgotpasswordicon.png')} style={styles.forgotPasswordIcon} />
        <Text style={styles.resetPasswordTitle}>Forgot your Password?</Text>
        <Text style={styles.resetPasswordText}>Please enter your email and we will send you password reset instructions!</Text>
        <View style={styles.input} >
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#6E6F6F"
            onChangeText={(text) => this.setState({ emailInput: text })}
            value={this.state.usernameInput}
          />
        </View>
        <View style={styles.loginBtn}>
          <TouchableOpacity style={styles.loginTouchable} title="Login"
            onPress={() => this.resetPassword(this.state.emailInput)}
            disabled={this.state.emailInput ? false : true}>
            <Text style={styles.loginBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


/******** Forgot Password Screen DONE **********/
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingBottom: 150
  },
  resetPasswordTitle: {
    color: '#DDDEDE',
    fontSize: 30,
    fontWeight: '600'
  },
  resetPasswordText: {
    color: '#DDDEDE',
    fontSize: 16,
    width: '75%',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 45
  },
  forgotPasswordIcon: {
    height: 200,
    resizeMode: 'contain',
    marginBottom: 45
  },
  forgotPasswordLayout: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '25%'
  },
  input: {
    height: 45,
    width: '75%',
    paddingLeft: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#1C1C1E',
    marginBottom: 8,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    color: '#DDDEDE',
    fontSize: 15
  },
  btn: {
    paddingTop: 50
  },
  loginBtn: {
    marginTop: 8,
    borderRadius: 5,
    backgroundColor: '#347EFB',
    height: 45,
    width: '75%',
    marginBottom: 20,
    shadowColor: '#347EFB',
  },
  loginBtnText: {
    color: '#FAFAFA'
  },
  loginTouchable: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})