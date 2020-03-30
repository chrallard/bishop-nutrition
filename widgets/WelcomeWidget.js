import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'

import { DataContext } from '../contexts/DataContext'

export default class WelcomeWidget extends Component{

    static contextType = DataContext

    constructor(props){
        super(props)
        this.state = {
            name: "",
            date: "",
            
            displayStyle: styles.invisible
        }
    }

    async componentDidMount() {
        await this.userinfo()

        this.props.mounted()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.visible !== this.props.visible){
            this.updateVisibility()
        }
    }

    updateVisibility = () => {
        this.setState({ displayStyle: styles.container })
    }

    userinfo = async () => {

        let d = new Date()
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const currentDate = d.getDate()
        const currentMonth = months[d.getMonth()]
        const currentYear = d.getFullYear()

        this.setState({
            name: this.context.userInfo.name,
            date: `${currentMonth} ${currentDate}, ${currentYear}`
        })  
    }

    render(){
        return(
            <View style={this.state.displayStyle} >
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.nameText}>{this.state.name}</Text>
                <Text style={styles.dateText}>{this.state.date}</Text>
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
        //marginTop: 44
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
    },

    invisible:{
        display: 'none'
    }
})