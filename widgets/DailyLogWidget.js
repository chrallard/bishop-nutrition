import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox, Image } from 'react-native'
import * as firebase from "firebase/app"
import "firebase/firestore"

import { DataContext } from '../contexts/DataContext'


export default class DailyLogWidget extends Component {

    static contextType = DataContext

    constructor(props){
        super(props)
        this.state = {
            daysList: []
        }
    }

    async componentDidMount(){

        YellowBox.ignoreWarnings([
            'VirtualizedLists should never be nested', // TODO: Remove when fixed
        ])

     
        await this.buildDaysList()

        //console.log(this.context.healthTrackingData)
    }

    buildDaysList = async () => {
        let fiveHealthTrackingData = []
        let daysList = []
        let formatDate = (d) => { //can't access this function inside the forEach for some reason
            return this.formatDate(d)
        }

        for(let i = 0; i < 5; i++){
            if(this.context.healthTrackingData[i] !== undefined){
                fiveHealthTrackingData.push(this.context.healthTrackingData[i])
            }
        }

        fiveHealthTrackingData.forEach((item) => {

            let obj = {
                date: formatDate(item.timeStamp),
                doc: item,
                complete: this.checkDayComplete(item.foodEntry)
            }
            daysList.unshift(obj)

        })

        this.setState({ daysList })
    }

    checkDayComplete = (foodEntry) => {
        let foodList = []

        Object.values(foodEntry).forEach((item, index) => {
            foodList.push({
                name: item.name,
                portions: item.portions,
                complete: null
            })
        })

        let planList = []

        Object.values(this.context.planData.portions).forEach((item) => {
            planList.push({
                name: item.name,
                maxPortions: item.maxPortions
            })
        })

        foodList.forEach((item, index) => {
            if(item.portions < planList[index].maxPortions) {
                item.complete = false
            }else{
                item.complete = true
            }
        })

        let completeValues = []

        foodList.forEach((item) => {
            completeValues.push(item.complete)
        })

        const isTrue = (currentValue) => currentValue == true
        return completeValues.every(isTrue)
    }

    formatDate = (d) => {
        let dateObj = new Date(d)

        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const date = dateObj.getDate()
        const month = months[dateObj.getMonth()]
        const year = dateObj.getFullYear()
        const formattedDate = month + " " + date //looks like this: March 4
      
        return formattedDate
      }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Daily Log</Text>
                <View style={styles.list}>
                    {this.state.daysList.map((item, index) => (
                        <TouchableOpacity onPress={() => {this.props.navProps.navigate("Summary", {doc: item.doc})}} key={index}>
                            {item.complete ? 
                                <Image source={require('../assets/summary_check_circle.png')} style={styles.status}/>
                            :
                                <Image source={require('../assets/summary_warning_circle.png')} style={styles.status}/>
                            }
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
    status:{
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