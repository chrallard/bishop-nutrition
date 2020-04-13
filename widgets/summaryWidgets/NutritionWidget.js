import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'//imports all required components and libraries
import { ProgressCircle } from 'react-native-svg-charts'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { DataContext } from '../../contexts/DataContext'

export default class NutritionWidget extends Component {

    static contextType = DataContext

    constructor(props) {
        super(props)
        this.state = {
            foodDataList: [], //initialized state variables
        }
    }

    async componentDidMount() {
        await this.buildFoodDataList()

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.foodEntry !== this.props.foodEntry) {
            this.buildUpdatedFoodDataList()
        }
    }

    buildFoodDataList = () => { // builds the list that gets mapped in render
        let foodDataList = []

        Object.values(this.props.foodEntry).forEach((item, index) => {

            let obj = {
                name: item.name,
                portions: item.portions,
                maxPortions: Object.values(this.context.planData.portions)[index].maxPortions,
                progressColor: "#347EFB",
                foodIcon: ""
            }

            if ((obj.portions / obj.maxPortions) > 1) {
                obj.progressColor = "#F0DB5C"
            }

            switch (item.name) {

                case "Dairy":
                    obj.foodIcon = require('../../assets/dairy_Icon.png')
                    break

                case "Fats":
                    obj.foodIcon = require('../../assets/fats_icon.png')
                    break

                case "Fruit":
                    obj.foodIcon = require('../../assets/fruit_icon.png')
                    break

                case "Protein":
                    obj.foodIcon = require('../../assets/protein_icon.png')
                    break

                case "Res. Vegetables":
                    obj.foodIcon = require('../../assets/restrictedVeg_Icon.png')
                    break

                case "Simple Carbs":
                    obj.foodIcon = require('../../assets/carb_icon.png')
                    break

                default:
            }

            foodDataList.push(obj)
        })

        this.setState({ foodDataList })
    }

    buildUpdatedFoodDataList = () => { //  same as above, but handles the incoming data differently, because it could be an array of 1, 7, or 30
        let newFoodDataList = []

        this.state.foodDataList.forEach((obj, index) => {
            let newPortions = 0
            this.props.foodEntry.forEach((entryObj) => {
                newPortions += Object.values(entryObj)[index].portions
            })

            let newObj = {
                name: obj.name,
                portions: newPortions,
                maxPortions: Object.values(this.context.planData.portions)[index].maxPortions * this.props.foodEntry.length,
                progressColor: "#347EFB",
                foodIcon: obj.foodIcon
            }

            if ((newObj.portions / newObj.maxPortions) > 1) {
                newObj.progressColor = "#F0DB5C"
            }

            newFoodDataList.push(newObj)
        })

        this.setState({ foodDataList: newFoodDataList })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Nutrition</Text>
                <View style={styles.listContainer}>

                    {this.state.foodDataList.map((item, index) => (
                        <View style={styles.listItemContainer} key={index}>
                            <ProgressCircle
                                style={styles.progCircle}
                                progress={item.portions / item.maxPortions}
                                progressColor={item.progressColor}
                                startAngle={-Math.PI * 0.75}
                                endAngle={Math.PI * 0.75} />
                            <Image style={styles.foodIcon} source={item.foodIcon} />
                            <Text style={styles.portionsText}>{item.portions}/{item.maxPortions}</Text>
                            <Text style={styles.nameText}>{item.name}</Text>
                        </View>
                    ))}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#1C1C1E',
        padding: 16,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 16
    },
    title: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600'
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    listItemContainer: {
        display: 'flex',
    },
    progCircle: {
        height: 80,
        width: 80,
        margin: 10,
        marginTop: 20,
    },
    foodIcon: {
        flexDirection: 'column',
        alignSelf: 'center',
        width: 30,
        height: 30,
        resizeMode: 'contain',
        position: 'absolute',
        marginTop: 45
    },
    portionsText: {
      flexDirection: 'column',
      color:'#DDDEDE',
      fontSize: 12,
      alignSelf: 'center',
      position: 'absolute',
      marginTop: 85

    },
    nameText: {
        flexDirection: 'column',
        color:'#DDDEDE',
        fontSize: 14,
        alignSelf: 'center',
        marginBottom: 8
    },
})