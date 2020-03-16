import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox } from 'react-native'
import * as firebase from "firebase/app"
import "firebase/firestore"

export default class DailyLogWidget extends Component {

    constructor(props){
        super(props)
        this.state = {
            props: props,
            uid: "",
            daysList: []
        }
    }

    async componentDidMount(){
        //get the past days of healthTracking

        YellowBox.ignoreWarnings([
            'VirtualizedLists should never be nested', // TODO: Remove when fixed
        ])

        await this.setUid()
        await this.buildDaysList()
    }

    setUid = async () => {
        let uid = await firebase.auth().currentUser.uid
        this.setState({ uid })
    }

    buildDaysList = async () => {
        let daysList = []
        let formatDate = (d) => { //can't access this function inside the forEach for some reason
            return this.formatDate(d)
        }

        await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").orderBy("timeStamp", "desc").limit(5).get().then((querySnapshot) => {
            querySnapshot.forEach((item) => {
                let obj = {
                    date: formatDate(item.data().timeStamp),
                    docId: item.id
                }
                daysList.push(obj)
            })
        })

        this.setState({ daysList })
    }

    formatDate = (d) => {
        let dateObj = new Date(d)

        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const date = dateObj.getDate()
        const month = months[dateObj.getMonth()]
        const year = dateObj.getFullYear()
        const formattedDate = month + " " + date //looks like this: 4March2020
      
        return formattedDate
      }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Daily Log</Text>
                
                {this.state.daysList.map((item, index) => (
                    <TouchableOpacity onPress={() => {this.props.navProps.navigate("Summary", {docId: item.docId})}} key={index}>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </TouchableOpacity>
                ))}
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