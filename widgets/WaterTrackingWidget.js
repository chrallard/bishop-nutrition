
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
        flagImage1:true,
        flagImage2:true,
        flagImage3:true,
        flagImage4:true,
        flagImage5:true,
        flagImage6:true,
        flagImage7:true,
        flagImage8:true,
        pieData:[],
        planTotal,
        maxPortions,
        dailyWater,
        count:0
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

      changeImage1= async () => {

        this.setState({
           flagImage1:!this.state.flagImage1
         });
         if(this.state.flagImage1){
         this.setState({
          count: this.state.count + 1
        });
      }
      else{
        this.setState({
          count: this.state.count - 1
        });
      }
      }
      changeImage2= async () => {

        this.setState({
           flagImage2:!this.state.flagImage2
         });
         if(this.state.flagImage2){
         this.setState({
          count: this.state.count + 1
        });
      }
      else{
        this.setState({
          count: this.state.count - 1
        });
      }
      }
      changeImage3= async () => {

        this.setState({
           flagImage3:!this.state.flagImage3
         });
         if(this.state.flagImage3){
         this.setState({
          count: this.state.count + 1
        });
      }else{
        this.setState({
          count: this.state.count - 1
        });
      }
      }
      changeImage4= async () => {

        this.setState({
           flagImage4:!this.state.flagImage4
         });
         if(this.state.flagImage4){
         this.setState({
          count: this.state.count + 1
        });
      }else{
        this.setState({
          count: this.state.count - 1
        });
      }
      }
      changeImage5= async () => {

        this.setState({
           flagImage5:!this.state.flagImage5
         });
         if(this.state.flagImage5){
         this.setState({
          count: this.state.count + 1
        });
      }else{
        this.setState({
          count: this.state.count - 1
        });
      }
      }
      changeImage6= async () => {

        this.setState({
           flagImage6:!this.state.flagImage6
         });
         if(this.state.flagImage6){
         this.setState({
          count: this.state.count + 1
        });
      }else{
        this.setState({
          count: this.state.count - 1
        });
      }
      }
      changeImage7= async () => {

        this.setState({
           flagImage7:!this.state.flagImage7
         });
         if(this.state.flagImage7){
         this.setState({
          count: this.state.count + 1
        });
      }else{
        this.setState({
          count: this.state.count - 1
        });
      }
      }
      changeImage8= async () => {

        this.setState({
           flagImage8:!this.state.flagImage8
         });
         if(this.state.flagImage8){
         this.setState({
          count: this.state.count + 1
        });
      }else{
        this.setState({
          count: this.state.count - 1
        });
      }
      }
    
      render() {
        return(
       
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Water</Text>
            <Text style={styles.bodyText}>{this.state.count} of {this.state.dailyWater}</Text>
          </View>


         <View style={styles.cupRow}>
          <View>
          <TouchableOpacity onPress={ ()=>this.changeImage1() } activeOpacity={0.5}>


          <Image  source={ this.state.flagImage1 === true ?                  
                         require('../Images/empty_Cup.jpg')  : require('../Images/full_Cup1.png')
                          }
                          style={styles.image}
                         
           />
      
           </TouchableOpacity>
           </View>
           <TouchableOpacity
            
            onPress={ ()=>this.changeImage2() }>

          <Image source={ this.state.flagImage2 === true ?                  
                          require('../Images/empty_Cup.jpg')  : require('../Images/full_Cup1.png')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ ()=>this.changeImage3()}>

          <Image source={ this.state.flagImage3 === true ?                  
                          require('../Images/empty_Cup.jpg')  : require('../Images/full_Cup1.png')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ ()=>this.changeImage4()}>

          <Image source={ this.state.flagImage4 === true ?                  
                          require('../Images/empty_Cup.jpg')  : require('../Images/full_Cup1.png')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ ()=>this.changeImage5()}>

          <Image source={ this.state.flagImage5 === true ?                  
                          require('../Images/empty_Cup.jpg')  : require('../Images/full_Cup1.png')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ ()=>this.changeImage6()}>

          <Image source={ this.state.flagImage6 === true ?                  
                         require('../Images/empty_Cup.jpg')  : require('../Images/full_Cup1.png')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           <TouchableOpacity
            
            onPress={ ()=>this.changeImage7()}>

          <Image source={ this.state.flagImage7 === true ?                  
                         require('../Images/empty_Cup.jpg')  : require('../Images/full_Cup1.png')}
                          style={styles.image}
           />
           
           </TouchableOpacity>

           <TouchableOpacity
            
            onPress={ ()=>this.changeImage8()}>

          <Image source={ this.state.flagImage8 === true ?                  
                        require('../Images/empty_Cup.jpg')  : require('../Images/full_Cup1.png')}
                          style={styles.image}
           />
           
           </TouchableOpacity>
           

       
       
</View> 

          
</View>   
  
      )
      
    };  
};

const styles = StyleSheet.create({

  //Styled by Jeff March 6th
  container:{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1C1C1E',
    padding: 16,
    alignSelf: 'stretch',
    marginBottom: 8,
    marginTop: 8
},

  titleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
},
  titleText:{
    color:'#FAFAFA',
    fontSize: 20,
},
bodyText:{
    color:'#DDDEDE',
    fontSize: 12,
},

cupRow:{
  flexDirection: 'row',
  justifyContent: 'space-between'
},
image: {
      height: 40,
      width: 40,
      resizeMode: 'cover',     
      alignItems: 'stretch'    
  }
  
  });

