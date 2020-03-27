import React, { Component } from 'react'
import { StyleSheet, View, Button, TextInput, Text, TouchableOpacity } from 'react-native'
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
                <View style={styles.loginBtn}>
                    <TouchableOpacity style={ styles.loginTouchable } title="Login" 
                    onPress={() => this.resetPassword(this.state.emailInput)}
                    disabled={this.state.emailInput ? false : true}>
                      <Text style={styles.loginBtnText}>Reset</Text>
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
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 150
    },
    input: {
        height: 45,
        width: '90%',
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
})