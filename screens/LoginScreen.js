import React, { Component } from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'

export default class LoginScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
          usernameInput: "",
          passwordInput: ""
        }
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
                    onPress={() => {this.props.login(this.state.usernameInput, this.state.passwordInput)}}
                    disabled={this.state.usernameInput && this.state.passwordInput ? false : true}
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