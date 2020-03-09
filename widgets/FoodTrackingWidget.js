import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, Item } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default class FoodTrackingWidget extends Component {

    constructor(props) {
      super(props)
      this.state = {
  
      }
    }

    componentDidMount(){
        this.buildList()
    }

    buildList = async () => {
        let foodTrackingList = []
        let userUid = await firebase.auth().currentUser.uid
        let usersPlan = await firebase.firestore().collection("userData").doc(userUid).get().then((doc) => { return doc.data().plan })
        let planPortions = await firebase.firestore().collection("plans").doc(usersPlan).get().then((doc) => { return doc.data().portions })

        Object.values(planPortions).forEach((item, index) => {
            let listItem = {
                name: item.name,
                maxPortions: item.maxPortions,
                userPortions: 0,
                index: index,
                key: Math.floor(Math.random() * Math.floor(900)).toString()
            }

            foodTrackingList.push(listItem)
        })

        this.setState({ foodTrackingList })
    }

    incrementPortion = async (name) => {
        let newFoodTrackingList = this.state.foodTrackingList
        let selectedFood = {}

        this.state.foodTrackingList.forEach((item, i) => {
            if(findValue(item, name) != null){
                selectedFood = findValue(item, name)
            }
        })

        function findValue(obj, value) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop) && obj[prop] === value) {
                    return obj;
                }
            }
            return null
        }

        selectedFood.userPortions += 1
        newFoodTrackingList.splice(Number(selectedFood.index), 1, selectedFood) //index is the same in selectedFood as well as in the FlatList. it indicates which food group to update
        this.setState({foodTrackingList: newFoodTrackingList})
    }
  
    render() {
      return (
            <View style={styles.container} >
              <Text style={styles.titleText}>Food Tracking</Text>
              <FlatList data={this.state.foodTrackingList} renderItem={({item}) => (
                    <View style={styles.itemList}>
                      <Text style={styles.itemText}>{item.name}</Text>
                      <Text style={styles.counterText}>{item.userPortions}/{item.maxPortions}</Text>
                      <Button style={styles.addButton} title="Add" onPress={() => {this.incrementPortion(item.name)}} />
                    </View>
                    )} />
            </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1C1C1E',
        padding: 16,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 8
    },
      titleText:{
        color:'#FAFAFA',
        fontSize: 20,
        marginBottom: 16
    },

    itemList:{
        flexDirection:'row',
        justifyContent: 'space-between',
        //height: 40,
        marginBottom:8
    },
    itemText:{
        color:'#DDDEDE',
        fontSize: 17,
        flex: 1,
        alignSelf:'center'
    },
    counterText:{
        color:'#DDDEDE',
        fontSize: 17,
        flex:1,
        alignSelf:'center',
        opacity: 0.9
    },
    addButton:{
        flex:1,
    }
    
    // cupRow:{
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    //   },
    //   image: {
    //         height: 45,
    //         width: 40,
    //         resizeMode: 'cover',     
    //         alignItems: 'stretch'    
    //     }
  })