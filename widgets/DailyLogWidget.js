import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox, Image } from 'react-native'
import * as firebase from "firebase/app"
import "firebase/firestore"

export default class DailyLogWidget extends Component {

    constructor(props){
        super(props)
        this.state = {
            uid: "",
            daysList: []
        }
    }

    async componentDidMount(){

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
                    doc: item.data()
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
                <View style={styles.list}>
                    {this.state.daysList.map((item, index) => (
                        <TouchableOpacity onPress={() => {this.props.navProps.navigate("Summary", {doc: item.doc})}} key={index}>
                            <Image source={require('../assets/summary_check_circle.png')} style={styles.check}/>
                            <Image source={require('../assets/summary_warning_circle.png')} style={styles.warning}/>
                            <Text style={styles.dateText}>{item.date}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#1C1C1E',
        padding: 16,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 16
    },
    list:{
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    check:{
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    warning:{
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    title:{
        color:'#FAFAFA',
        fontSize: 20,
    },
    dateText:{
        color:'#DDDEDE',
        fontSize: 12,
        justifyContent: 'center',
        alignSelf:'center'
    }
})