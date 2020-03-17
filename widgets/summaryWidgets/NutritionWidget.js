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
                {this.state.foodDataList.map((item, index) => (
                    <View key={index} >
                        <Text style={styles.dateText}>{item.name}</Text>
                        <Text style={styles.dateText}>{item.portions}/{item.maxPortions}</Text>
                    </View>
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