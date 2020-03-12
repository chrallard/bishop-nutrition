import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
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
                <TextInput
                style={styles.input}
                placeholder="Current password"
                onChangeText={(text) => this.setState({currentPasswordInput: text})}
                value={this.state.currentPasswordInput}
                secureTextEntry={true}
                />
                <TextInput
                style={styles.input}
                placeholder="New password"
                onChangeText={(text) => this.setState({newPasswordInput: text})}
                value={this.state.newPasswordInput}
                secureTextEntry={true}
                />
                <View style={styles.btn}>
                    <Button 
                    title="Submit" 
                    onPress={this.updatePassword}
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