import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Dash from 'react-native-dash'
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
    //    this.setState({subtract: (this.state.startingWeight) - (this.state.weightEntry)})
        this.setState({subtract: (this.state.weightEntry) - (this.state.startingWeight)})
    }
   

    render(){
        return(
           
            <View style={styles.container}  >
            
           
                <Text style={styles.titleText}>Weight</Text>

             <Text>{this.state.startingWeight} ------- {this.state.subtract} ----------{this.state.weightEntry}</Text>
             {/* <Text style={styles.difference}>{this.state.subtract}</Text>
             <Text style={styles.weight}>{this.state.weightEntry}</Text>
            */}

                <View style={styles.textRow}>
                    {/* <Text style={styles.startingText}>{this.state.startingWeight} -------{this.state.subtract}----------{this.state.weightEntry}</Text> */}
                    {/* <Text style={styles.difference}>{this.state.subtract}</Text>
                    <Text style={styles.weight}>{this.state.weightEntry}</Text>
                    */}
                    <View style={styles.itemBox}>
                        <Text style={styles.startingText}>{this.state.startingWeight}</Text>
                        <Text style={styles.bodyTextStart}>Starting</Text>
                    </View>

                    <Dash dashColor='#347EFB' dashGap={7} dashLength={10} style={{width:70, height:10}} />

                    <View style={styles.itemBox}>
                        <Text style={styles.differenceText}>{this.state.subtract}</Text>
                        <Text style={styles.bodyTextProgress}>Progress</Text>
                    </View>

                    <Dash dashColor='#347EFB' dashGap={7} dashLength={10} style={{width:70, height:10}} />

                    <View style={styles.itemBox} >
                        <Text style={styles.currentText}>{this.state.weightEntry}</Text>
                        <Text style={styles.bodyTextCurrent}>Current</Text>
                    </View>
                </View>

            </View>
          
        )
    }


}

const styles = StyleSheet.create({
    //Styled by Jeff March 16th
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
    },
    textRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    startingText:{
      color:'#347EFB',
      fontSize: 20,
      alignSelf:'center',
    },
    differenceText:{
        color:'#00DCF1',
        fontSize: 40,
        alignSelf:'center',
    },
    currentText:{
        color:'#347EFB',
        fontSize: 26,
        alignSelf:'center',
    },
    dash:{
        color: '#DDDEDE',
        width: 120,
        height:10,
    },
   itemBox:{
        height: 50,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
      bodyTextStart:{
      color:'#DDDEDE',
      fontSize: 8,     
      marginTop: 8
    },
    bodyTextProgress:{
        color:'#DDDEDE',
        fontSize: 8,     
    },
    bodyTextCurrent:{
        color:'#DDDEDE',
        fontSize: 8,     
        marginTop: 4
    },
})