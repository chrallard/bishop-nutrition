import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'

export default class WelcomeWidget extends Component{

    constructor(props){
        super(props)
        this.state = {
            name: "",
            date: "" 
        }
    }

    componentDidMount(){
        this.userinfo()
   }

    userinfo = async () => {

        let d = new Date()
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const currentDate = d.getDate()
        const currentMonth = months[d.getMonth()]
        const currentYear = d.getFullYear()
        let uid = firebase.auth().currentUser.uid

        await firebase.firestore().collection("userData").doc(uid).get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        name: doc.data().name,
                        date: `${currentMonth} ${currentDate}, ${currentYear}`
                    })
                }else{
                    alert("Error")
                }
            }).catch((err) => {
                alert(err)
            })  
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Welcome</Text>
                <Text>{this.state.name}</Text>
                <Text>{this.state.date}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginBottom: 20,
        marginTop: 20
    }
})