import React, { Component } from 'react';
import { StyleSheet, Text, View, Button,TouchableHighlight,Image,TouchableOpacity } from 'react-native';
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import 'firebase/auth'

const planTotal = 0;
const maxPortions = 0;
const dailyWater = 0;

export default class WaterTrackingWidget extends Component {

  constructor(props){
      super(props)
      this.state = {
        flagImage:true,
        pieData:[],
        planTotal,
        maxPortions,
        dailyWater,
        count: 0 
      }
    }
    
    
    componentDidMount(){
        
        this.watertrack()
        this.changeImage()
        
      
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
      changeImage= async () => {

        this.setState({
           flagImage:!this.state.flagImage
         });
         this.setState({
          count: this.state.count + 1
        });
     
     }
     
      
    render() {
     
   
      return(
       
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
         <Text>Water</Text>
         
          <Text style={styles.descriptionContainerVer2}>{this.state.count} of {this.state.dailyWater}</Text>
    </View>
         <View style={ {
      flexDirection:'row'}}>
          <View>
          <TouchableOpacity onPress={ this.changeImage } activeOpacity={0.5}>


          <Image  source={ this.state.flagImage === true ?                  
                         require('../Images/full_Cup.png')  : require('../Images/empty_Cup.jpg')
                          }
                          style={styles.image}
                         
           />
      
           </TouchableOpacity>
           </View>
           <TouchableOpacity
            
            onPress={ this.changeImage }>

          <Image source={ this.state.flagImage === true ?                  
                          require('../Images/full_Cup.png')  : require('../Images/empty_Cup.jpg')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ this.changeImage }>

          <Image source={ this.state.flagImage === true ?                  
                          require('../Images/full_Cup.png')  : require('../Images/empty_Cup.jpg')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ this.changeImage }>

          <Image source={ this.state.flagImage === true ?                  
                          require('../Images/full_Cup.png')  : require('../Images/empty_Cup.jpg')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ this.changeImage }>

          <Image source={ this.state.flagImage === true ?                  
                          require('../Images/full_Cup.png')  : require('../Images/empty_Cup.jpg')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ this.changeImage }>

          <Image source={ this.state.flagImage === true ?                  
                         require('../Images/full_Cup.png')  : require('../Images/empty_Cup.jpg')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ this.changeImage }>

          <Image source={ this.state.flagImage === true ?                  
                         require('../Images/full_Cup.png')  : require('../Images/empty_Cup.jpg')}
                          style={styles.image}
           />
           
           </TouchableOpacity>

           <TouchableOpacity
            
            onPress={ this.changeImage }>

          <Image source={ this.state.flagImage === true ?                  
                         require('../Images/full_Cup.png')  : require('../Images/empty_Cup.jpg')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           

       
       
</View> 

          
</View>   
  
      )
      
    };  
};

const styles = StyleSheet.create({
    container: {
        
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
       
     
    },
    image: {
     
      margin:2,
      height: 65,
      width: 48,
      resizeMode: 'cover',
      
      alignItems: 'stretch'
    
  },

    
  
  });
