import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      usernameInput: "",//initializes needed state vairables
      passwordInput: ""
    }
  }

  login = async (usernameInput, passwordInput) => {  //passes the password and email input to the firebase auth and checks if they match
    await firebase.auth().signInWithEmailAndPassword(usernameInput, passwordInput).then()
      .catch((err) => {
        alert(err.code + err.message)
      })
  }

  render() {
    return (
      <View style={styles.container} >
        <StatusBar barStyle="light-content" translucent={true} />
        <View style={styles.logoText}>
          <Text style={{ color: '#347EFB', fontSize: 37 }}>Bishop</Text>
          <Text style={{ color: '#DDDEDE', fontSize: 37 }}>Nutrition</Text>
        </View>

        <View style={styles.input}>
          <Image style={styles.emailIcon} source={require('../Images/Icon-email.png')} />
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({ usernameInput: text })}
            value={this.state.usernameInput}
          />
        </View>

        <View style={styles.input}>
          <Image style={styles.lockIcon} source={require('../Images/Icon-lock.png')} />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ passwordInput: text })}
            value={this.state.passwordInput}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.loginBtn}>
          <TouchableOpacity style={styles.loginTouchable} title="Login"
            onPress={() => { this.login(this.state.usernameInput, this.state.passwordInput) }}
            disabled={this.state.usernameInput && this.state.passwordInput ? false : true}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.forgotPassText}>Forgot Password? </Text>
          <TouchableOpacity title="Reset Here" onPress={() => { this.props.navigation.navigate('Forgot Password') }}>
            <Text style={styles.forgotPassBtn}>Reset Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  input: {
    height: 55,
    width: '75%',
    paddingLeft: 5,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#1C1C1E',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginBtn: {
    marginTop: 45,
    borderRadius: 28,
    backgroundColor: '#347EFB',
    height: 55,
    width: '75%',
    justifyContent: "center",
    alignContent: 'center',
    marginBottom: 20,
    shadowColor: '#347EFB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
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
  logoText: {
    flexDirection: 'row',
    marginBottom: 55
  },
  forgotPassText: {
    color: '#FAFAFA'
  },
  forgotPassBtn: {
    color: '#347EFB'
  },
  textInput: {
    flex: 1,
    color: '#DDDEDE',
    fontSize: 15
  },
  lockIcon: {
    height: 25,
    width: 20,
    marginLeft: 8,
    marginRight: 8
  },
  emailIcon: {
    height: 15,
    width: 22,
    marginLeft: 5,
    marginRight: 8
  }
})