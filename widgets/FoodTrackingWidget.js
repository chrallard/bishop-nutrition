import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, Item, TouchableOpacity, Image} from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default class FoodTrackingWidget extends Component {

    constructor(props) {
      super(props)
      this.state = {
        uid: "",
        docId: "",

        displayStyle: styles.invisible
      }
    }

    async componentDidMount(){
        await this.setUid()
        await this.setTodaysDocId()
        await this.buildList()

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

    setUid = async () => {
        let uid = await firebase.auth().currentUser.uid
        this.setState({ uid })
    }

    setTodaysDocId = async () => {
        //get todays date - format
        let d = new Date()
        let today = this.formatDate(d)
        let formatDate = (d) => { //can't access this function inside the forEach for some reason
            return this.formatDate(d)
        }
        let docId

        //loop through user data and get the dates to format
        await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").orderBy("timeStamp", "desc").limit(15).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let formattedDate = formatDate(new Date(doc.data().timeStamp))

                if(formattedDate == today){
                    docId = doc.id
                }  
            })
        })

        this.setState({ docId })
    }

    buildList = async () => {
        let foodTrackingList = []
        let userPortions = []
        let usersPlan = await firebase.firestore().collection("userData").doc(this.state.uid).get().then((doc) => { return doc.data().plan })
        let planPortions = await firebase.firestore().collection("plans").doc(usersPlan).get().then((doc) => { return doc.data().portions })
        
        await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").doc(this.state.docId).get().then((doc) => {
            Object.values(doc.data().foodEntry).forEach((item, index) => {
                userPortions.push(item.portions)
            })
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

            switch(item.name) {
            
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
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
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
            if(findValue(item, name) != null){
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
        await this.setState({foodTrackingList: newFoodTrackingList})

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
        
        await firebase.firestore().collection("userData").doc(this.state.uid).collection("healthTracking").doc(this.state.docId)
        .set({foodEntry}, {merge: true})
    }
  
    render() {
      return (
            <View style={this.state.displayStyle} >
              <Text style={styles.titleText}>Food Tracking</Text>
              <FlatList 
              scrollEnabled={false}
              data={this.state.foodTrackingList} 
              renderItem={({item}) => (
                    <View style={styles.itemList}>
                        <Image style={styles.foodIcon} source={item.foodIcon} />
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.counterText}>{item.userPortions}/{item.maxPortions}</Text>
                        {/* <Button style={styles.addButton} title="Add" onPress={() => {this.incrementPortion(item.name)}} /> */}
                        <TouchableOpacity onPress={() => {this.incrementPortion(item.name)}}>
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

{/* <TouchableOpacity onPress={() => this._addPortion(item.category)}>
            <Image
                style={styles.icon}
                source={require('../assets/add_Circle.png')}
            />
</TouchableOpacity> */}
  



//CHECKED BY JEFF
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
        flex: 1,
        alignItems: 'center',
        height: 40,
        marginBottom:8
    },
    foodIcon: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        marginRight: 14,
        resizeMode: 'contain',
    },
    itemText:{
        color:'#DDDEDE',
        fontSize: 17,
        flex: 2,
        alignSelf:'center'
    },
    counterText:{
        color:'#DDDEDE',
        fontSize: 17,
        flex:1,
        opacity: 0.9,
    },
    addButton:{
        flex:1,
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 16
      },

      invisible:{
        display: 'none'
    }
  })