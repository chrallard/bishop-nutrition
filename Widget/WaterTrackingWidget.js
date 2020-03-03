import React, { Component } from 'react';
import { StyleSheet, Text, View, Button,TouchableHighlight } from 'react-native';
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import 'firebase/auth'
import { MaterialCommunityIcons } from 'react-native-vector-icons';


const maxPortions = 0;
const dailyWater = 0;

export default class WaterTrackingWidget extends Component {

  constructor(props){
      super(props)
      this.state = {
    
   
        maxPortions,
        dailyWater,
        count: 0 
      }
    }
    
    
    componentDidMount(){
        
        this.watertrack()
    }
    watertrack = async () => {
        
       
        let maxPortions = await firebase.firestore().collection("plans").doc("1400_women").get().then((doc) => { 
          return doc.data().water.maxPortions
          
      
}) 
let dailyWater = await firebase.firestore()
.collection("userData")
.doc("Uj1bKIIOM7V7zOvee2f4ZOcc3462")
.collection("healthTracking")
.doc("0Seio34NyrEAlHcPVq24")
.get().then((doc) => {
    return doc.data().waterEntry.portions
          
  
})
      this.setState({maxPortions: maxPortions})
      this.setState({dailyWater: dailyWater})
      
      console.log(maxPortions);
     
      
       
      
      }
    render() {
        
      return(
       
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
         <Text>Water</Text>
         
          <Text style={styles.descriptionContainerVer2}>{this.state.maxPortions} of {this.state.dailyWater}</Text>
    </View>
         <View style={ {flex: 1,
      flexDirection:'row'}}>
      
        <TouchableHighlight
         
         onPress={this.onPress}
        > 
        
<MaterialCommunityIcons name="cup" size={47} color="#007c00" /></TouchableHighlight> 
<MaterialCommunityIcons name="cup" size={47} color="#007c00" />
<MaterialCommunityIcons name="cup" size={47} color="#007c00" />
<MaterialCommunityIcons name="cup" size={47} color="#007c00" />
<MaterialCommunityIcons name="cup" size={47} color="#007c00" />
<MaterialCommunityIcons name="cup" size={47} color="#007c00" />
<MaterialCommunityIcons name="cup" size={47} color="#007c00" />
<MaterialCommunityIcons name="cup" size={47} color="#007c00" />

</View> 

          
</View>   
  
      )
      
    };  
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#fff',
        
        
        paddingTop: 1,
        paddingBottom: 1,
        alignSelf: 'stretch',
        marginBottom: 2,
        marginTop: 2
    },
    descriptionContainerVer2:{
        flex: 1,
        flexDirection:'row-reverse',
        textAlign: 'right',
        flexWrap: 'wrap'
     
    }
    
  
  });