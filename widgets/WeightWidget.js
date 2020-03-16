import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'



export default class WelcomeWidget extends Component{

    constructor(props){
        super(props)
        this.state = {
            startingWeight: "",
            weightEntry: "",
            subtract:""
        }
    }

    async componentDidMount(){
       await this.weightInfo()
    }

    weightInfo = async() => {

        let uid = await firebase.auth().currentUser.uid

       let sw = await firebase.firestore().collection("userData").doc(uid).get().then((doc) => {
            return doc.data().startingWeight
        })
        this.setState({startingWeight: sw})
    
       await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").doc("zIejpovtpTwAg5e36dEm")
        .get().then((doc) => {
            
             this.setState({weightEntry : doc.data().weightEntry}); 
        })
       this.setState({subtract: (this.state.startingWeight) - (this.state.weightEntry)})
    }
   

    render(){
        return(
            <View style={styles.container}>
           
            <Text>Weight</Text>
            
             <Text>{this.state.startingWeight} ------- {this.state.subtract} ----------{this.state.weightEntry}</Text>
             {/* <Text style={styles.difference}>{this.state.subtract}</Text>
             <Text style={styles.weight}>{this.state.weightEntry}</Text>
            */}
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
    },

    // weight:{
        
    //     flexDirection:'row',
    //     alignSelf:"flex-end",
       
       
    // },
    // difference:{
    //     alignSelf:"center"
    // }
})