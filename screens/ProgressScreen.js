import React, { Component } from 'react'
import { StyleSheet, Text, View , FlatList} from 'react-native'
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'


export default class ProgressScreen extends Component{

    constructor(props){
      super(props)
      this.state = {
           weightEntry: [],
           data:[],
           timeStamp: [],
           startingWeight: [],
           difference: []
           
      }
    }

    async componentDidMount(){
       await  this.list()
       await this.time()
       await this.startingWeight()
       await this.progress()
      
    }

    list = async() => {

        let uid = await firebase.auth().currentUser.uid
       

         await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").orderBy("weightEntry", "desc").limit(17).get().then((doc) => {
           
            let weightEntry = []
            doc.forEach((doc) => {
                let obj = {
                    weightEntry: doc.data().weightEntry  
                }
                weightEntry.push(obj)
              console.log(obj)
            
              this.setState({ weightEntry })
            })
            
          
        })
       
        
    }

    startingWeight = async() => {

        let uid = await firebase.auth().currentUser.uid

        let sw = await firebase.firestore().collection("userData").doc(uid).get().then((doc) => {
             return doc.data().startingWeight
         })
         this.setState({startingWeight: sw})
         
    }

  


    progress = async() => {
        let uid = await firebase.auth().currentUser.uid
        
         await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").orderBy("weightEntry", "desc").limit(17).get().then((querySnapshot) => {
                    
                
                    let progress = []
                  
                    querySnapshot.forEach((doc) => {
                        let Obj = {
                            progress: (doc.data().startingWeight) - ((doc.data().weightEntry))
                        }
                        progress.push(Obj)
                        console.log(Obj)
                        this.setState({progress})
                    })

            })
            
    }

   

   
    time = async() => {

        let uid = await firebase.auth().currentUser.uid
        
       await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").orderBy("timeStamp", "asc").limit(17).get().then((querySnapshot) => {

           
        let timeStamp = []
       

            
            querySnapshot.forEach((doc) => {

                let d = new Date(doc.data().timeStamp)
                const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
                const date = d.getDate()
                const Month = months[d.getMonth()]
                const Year = d.getFullYear()
                let obj = {
                    timeStamp:  `${Month} ${date}, ${Year}`
                }
               
            timeStamp.push(obj)
            console.log(obj)
            this.setState({timeStamp})
            })
        })

    }
 
    render(){
        return(
           
            <View style={styles.container}  >
           
            <Text>Weight</Text>
           
            <FlatList
              
                data = {this.state.weightEntry}
                keyExtractor ={({id}, index) => id}
                 renderItem={({item}) => <Text>{item.weightEntry}</Text> }
                 
                
            />

            <FlatList
              
              data = {this.state.timeStamp}
              keyExtractor ={({id}, index) => id}
               renderItem={({item}) => <Text>{item.timeStamp}</Text> }      
            />
            

            </View>
          
        )
    }


}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginBottom: 20,
        marginTop: 20
    }
})