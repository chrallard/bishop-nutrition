import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox } from 'react-native'

export default class ActivityWidget extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
       
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Activity Widget</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // STYLING JEFF March 6
    container:{
        flexDirection: 'column',
        backgroundColor: '#1C1C1E',
        padding: 16,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 44
    },
    title:{
        color:'#FAFAFA',
        fontSize: 20,
    },
    nameText:{
        flexDirection: 'column',
        color:'#FAFAFA',
        fontSize: 28,
        justifyContent: 'center',
        alignSelf:'center',
        marginBottom: 8
    },
    dateText:{
        color:'#347EFB',
        fontSize: 17,
        justifyContent: 'center',
        alignSelf:'center'
    }
})