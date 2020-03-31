import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native' //imports all required components and libraries
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { DataContext } from '../contexts/DataContext'


export default class FoodTrackingWidget extends Component {

    static contextType = DataContext

    constructor(props) {
        super(props)
        this.state = {
            foodTrackingList: [],//initialized state variables

            displayStyle: styles.invisible
        }
    }

    async componentDidMount() {
        await this.buildList()

        this.props.mounted()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.updateVisibility()
        }
    }

    updateVisibility = () => {
        this.setState({ displayStyle: styles.container })
    }

    buildList = async () => {
        let foodTrackingList = []
        let userPortions = []
        let planPortions = this.context.planData.portions

        Object.values(this.context.healthTrackingData[0].foodEntry).forEach((item) => { // [0] because the first one in the array is the most recent/today
            userPortions.push(item.portions)
        })

        Object.values(planPortions).forEach((item, index) => {

            let listItem = { //for display only!!
                name: item.name,
                foodIcon: "",
                dbName: item.dbName,
                maxPortions: item.maxPortions,
                userPortions: userPortions[index],
                index: index,
                key: index.toString()
            }

            switch (item.name) {

                case "Dairy":
                    listItem.foodIcon = require('../assets/dairy_Icon.png')
                    break

                case "Fats":
                    listItem.foodIcon = require('../assets/fats_icon.png')
                    break

                case "Fruit":
                    listItem.foodIcon = require('../assets/fruit_icon.png')
                    break

                case "Protein":
                    listItem.foodIcon = require('../assets/protein_icon.png')
                    break

                case "Res. Vegetables":
                    listItem.foodIcon = require('../assets/restrictedVeg_Icon.png')
                    break

                case "Simple Carbs":
                    listItem.foodIcon = require('../assets/carb_icon.png')
                    break

                default:
            }

            foodTrackingList.push(listItem)
        })

        this.setState({ foodTrackingList })
    }

    formatDate = (d) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const date = d.getDate()
        const month = months[d.getMonth()]
        const year = d.getFullYear()
        const formattedDate = date + month + year //looks like this: 4March2020

        return formattedDate
    }

    incrementPortion = async (name) => {
        let newFoodTrackingList = this.state.foodTrackingList
        let selectedFood = {}

        this.state.foodTrackingList.forEach((item, i) => { //push in here?
            if (findValue(item, name) != null) {
                selectedFood = findValue(item, name)
            }
        })

        function findValue(obj, value) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop) && obj[prop] === value) {
                    return obj
                }
            }
            return null
        }

        selectedFood.userPortions += 1
        newFoodTrackingList.splice(Number(selectedFood.index), 1, selectedFood) //index is the same in selectedFood as well as in the FlatList. it indicates which food group to update
        await this.setState({ foodTrackingList: newFoodTrackingList })

        this.updateDb()
    }

    updateDb = async () => {
        let foodEntry = {}

        this.state.foodTrackingList.forEach((item) => {
            let obj = {
                [item.dbName]: {
                    name: item.name,
                    portions: item.userPortions
                }
            }

            Object.assign(foodEntry, obj)
        })

        await firebase.firestore().collection("userData").doc(this.context.uid).collection("healthTracking").doc(this.context.todaysHealthTrackingDocId)
            .set({ foodEntry }, { merge: true })
    }

    render() {
        return (
            <View style={this.state.displayStyle} >
                <Text style={styles.titleText}>Food Tracking</Text>
                <FlatList
                    scrollEnabled={false}
                    data={this.state.foodTrackingList}
                    renderItem={({ item }) => (
                        <View style={styles.itemList}>
                            <Image style={styles.foodIcon} source={item.foodIcon} />
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.counterText}>{item.userPortions}/{item.maxPortions}</Text>
                            <TouchableOpacity onPress={() => { this.incrementPortion(item.name) }}>
                                <Image
                                    style={styles.icon}
                                    source={require('../assets/add_Circle.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    )} />
            </View>
        )
    }
}

//CHECKED BY JEFF
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1C1C1E',
        padding: 16,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 8
    },
    titleText: {
        color: '#FAFAFA',
        fontSize: 20,
        marginBottom: 16
    },

    itemList: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        height: 40,
        marginBottom: 8
    },
    foodIcon: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        marginRight: 14,
        resizeMode: 'contain',
    },
    itemText: {
        color: '#DDDEDE',
        fontSize: 17,
        flex: 2,
        alignSelf: 'center'
    },
    counterText: {
        color: '#DDDEDE',
        fontSize: 17,
        flex: 1,
        opacity: 0.9,
    },
    addButton: {
        flex: 1,
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 16
    },

    invisible: {
        display: 'none'
    }
})