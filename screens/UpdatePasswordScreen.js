import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput, TouchableOpacity, Text } from 'react-native';
import * as firebase from 'firebase/app'

export default class UpdatePasswordScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentPasswordInput: "",
            newPasswordInput: ""
        }
    }

    updatePassword = () => {
        let currentUser = firebase.auth().currentUser
        let cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, this.state.currentPasswordInput)
        currentUser.reauthenticateWithCredential(cred).then(() => {
            currentUser.updatePassword(this.state.newPasswordInput).then(() => {
                alert("Password updated successfully.")
            }).catch((err) => {
                alert(err)
            })
        }).catch((err) => {
            alert(err)
        })  
    }

    render(){
        return(
            <View style={styles.container} >
                <View style={styles.input}>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Current password"
                    placeholderTextColor="#DDDEDE"
                    onChangeText={(text) => this.setState({currentPasswordInput: text})}
                    value={this.state.currentPasswordInput}
                    secureTextEntry={true}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                    style={styles.textInput}
                    placeholder="New password"
                    placeholderTextColor="#DDDEDE"
                    onChangeText={(text) => this.setState({newPasswordInput: text})}
                    value={this.state.newPasswordInput}
                    secureTextEntry={true}
                    />
                </View>
                <View style={styles.submitBtn}>
                    <TouchableOpacity title="Submit" onPress={this.updatePassword} style={styles.submitTouchable}>
                    <Text style={styles.submitBtnText}>Submit</Text>
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
      paddingBottom: 150
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
    textInput: {
        flex: 1,
        color: '#DDDEDE',
        fontSize: 15
    },
    submitBtn: {
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
      submitBtnText: {
        color: '#FAFAFA'
      },
      submitTouchable: {
        height: '100%', 
        width: '100%', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
      },
})