import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import * as firebase from 'firebase/app'

export default class About extends Component {

    constructor(props){
        super(props)
        this.state = {
           
        }
    }

    
    render(){
        return(
            <View style={styles.container}>
                <Text>Tell Something Application</Text>
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
    
})



