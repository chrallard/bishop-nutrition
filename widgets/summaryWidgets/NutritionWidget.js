import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default class NutritionWidget extends Component {

    constructor(props){
        super(props)
        this.state = {
            foodDataList: [],
            maxPortionsList: []
        }
    }

    async componentDidMount(){
        await this.setUid()
        await this.setUsersPlan()
        await this.buildFoodDataList()
    }

    setUid = async() => {
        let uid = await firebase.auth().currentUser.uid
        this.setState({ uid })
    }
  
    setUsersPlan = async () => {
        let usersPlan = await firebase.firestore().collection("userData").doc(this.state.uid).get().then((doc) => { return doc.data().plan })
        this.setState({ usersPlan })
    }

    buildFoodDataList = async () => {
        let foodDataList = []

        await firebase.firestore().collection("plans").doc(this.state.usersPlan).get().then((doc) => {
            Object.values(this.props.foodEntry).forEach((item, index) => {
                let obj = {
                    name: item.name,
                    portions: item.portions,
                    maxPortions: Object.values(doc.data().portions)[index].maxPortions
                }
                
                foodDataList.push(obj)
            })
        })

        this.setState({ foodDataList })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Nutrition</Text>
                <View style={styles.listPortions}>
                    {this.state.foodDataList.map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <Text style={styles.dateText}>{item.name}</Text>
                            <Text style={styles.dateText}>{item.portions}/{item.maxPortions}</Text>
                        </View>
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
        marginTop: 44
    },
    listPortions:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-around'
    },
    listItem:{
        width: 80,
        height: 80,
        margin: 16,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#000' //just to see box
    },

    title:{
        color:'#FAFAFA',
        fontSize: 20,
    },
    nameText:{
        flexDirection: 'column',
        color:'#FAFAFA',
        fontSize: 14,
        justifyContent: 'center',
        alignSelf:'center',
        marginBottom: 8
    },
    dateText:{
        color:'#347EFB',
        fontSize: 14,
        justifyContent: 'center',
        alignSelf:'center'
    }
})