import React, { Component } from 'react'
import { StyleSheet, Text, View, Button,Body,Right,Container,Content,Image,TouchableOpacity,Dimensions} from 'react-native'
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'


export default class ProfileScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      gender:"",
      height:"",
      weight:"",
      dob:"",
      email:""
    }
  }

  async componentDidMount(){
    await this.userIfo()
}
  signOut = async () => {
    await firebase.auth().signOut().then()
    .catch((err) => {
      console.log(err)
    });
  }
  
userIfo = async () =>{
  let uid = await firebase.auth().currentUser.uid
  await firebase.firestore().collection("userData").doc(uid).get().then((doc) => {
    if(doc.exists){
        this.setState({
            name: doc.data().name,
            gender:doc.data().Gender,
            height:doc.data().Height,
            weight:doc.data().startingWeight,
            dob:doc.data().dob,
            email:doc.data().Email
            
        })

    }else{
        alert("Error")
    }
   console.log(this.state.name)
}).catch((err) => {
    alert(err)
})  
}
  render() {
    return (
          <View style={styles.container} >
           
              <View style={styles.textContainer}>
          <View>
           
          <Text style={styles.nameText}>{this.state.name}</Text>
       
          </View>
          <View>
  <Text style={{color:'#ffffff',fontSize:15,paddingLeft:10,paddingTop:10}}>DATE OF BIRTHDAY</Text>
          <Text style={styles.nameGender}>{this.state.dob}</Text>
          <View style={styles.modalSeprateLine}/> 
          </View>
<View>
  <Text style={{color:'#ffffff',fontSize:15,paddingLeft:10,paddingTop:10}}>Gender</Text>
          <Text style={styles.nameGender}>{this.state.gender}</Text>
          <View style={styles.modalSeprateLine}/> 
          </View>
          
          <View>
          <Text style={{color:'#ffffff',fontSize:15,paddingLeft:10,paddingTop:10}}>Height</Text>
          <Text style={styles.nameHeight}>{this.state.height}</Text>
          <View style={styles.modalSeprateLine}/> 
          </View>
          <View>
          <Text style={{color:'#ffffff',fontSize:15,paddingLeft:10,paddingTop:10}}>STARTING WEIGHT</Text>
          <Text style={styles.nameWeight}>{this.state.weight} lbs</Text>
          <View style={styles.modalSeprateLine}/> 
         </View>
         <View>
          <Text style={{color:'#ffffff',fontSize:15,paddingLeft:10,paddingTop:10}}>EMAIL</Text>
          <Text style={styles.nameWeight}>{this.state.email} </Text>
          <View style={styles.modalSeprateLine}/> 
         </View>

         </View>
       
        

         <View style={styles.textContainer1}> 
                 <View style={styles.updatePassword}>
                 <Image
                     style={{height: 30,
                      width: 20,
                      paddingRight:10,
                      resizeMode: 'center'}}
                      source={require('../assets/changePassword.png')}
                    />
             <Text style={{color:"#ffffff",paddingRight:170,paddingLeft:10,fontSize:20}}> Change Password</Text>
             <TouchableOpacity onPress={() => {this.props.navigation.navigate("Update Password")} }>
  <Image style={{height: 20,width: 10}} source={require('../assets/chevron.png')}/>
                    </TouchableOpacity>
                    <View style={styles.SeprateLine}/> 
                    </View> 

                    <View style={styles.updatePassword}>
                 <Image
                     style={{height: 30,
                      width: 20,
                      resizeMode: 'center'}}
                      source={require('../assets/about.png')}
                    />
             <Text style={{color:"#ffffff",paddingRight:270,paddingLeft:10,fontSize:20}}> About</Text>
             <TouchableOpacity onPress={() => {this.props.navigation.navigate("About")} }>
  <Image style={{height: 20,width: 10,flexDirection:'row-reverse'}} source={require('../assets/chevron.png')}/>
                    </TouchableOpacity>
                    
                    </View>       
                    
                    
                   
            </View>
            <View style={[{ width: "100%", margin: 10, backgroundColor: "#347EFB" }]}>
          <Button
            onPress={this.signOut}
            title="Sign Out"
            color="#fff"
          />
        </View> 
          
           
                 
              
          </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  updatePassword:{
    flexDirection: 'row',
      
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 16
  },
  textContainer1:{
    
    flexDirection: 'column',
    backgroundColor: '#1C1C1E',
    padding: 5,
    alignSelf: 'stretch',
    marginBottom: 2,
    marginTop: 44
  },
  textContainer:{
    flexDirection: 'column',
    backgroundColor: '#000000',
    paddingBottom: 20,
    alignSelf: 'stretch',
    
},
  nameText:{
    paddingBottom:40,
    color:'#fff',
    alignItems: 'center',
    textAlign:'center',
    fontSize:30
  },
  nameGender:{
    color:'#347EFB',
    paddingTop:10,
    paddingBottom:5,
    paddingLeft:10,
    fontSize:20
  },
  nameHeight:{
    color:'#347EFB',
    paddingTop:10,
    paddingBottom:5,
    paddingLeft:10,
    fontSize:20
  },
  nameWeight:{
    color:'#347EFB',
    paddingTop:10,
    paddingBottom:5,
    paddingLeft:10,
    fontSize:20
  },
  modalSeprateLine:{
    width:'100%',
    height:'1%',
    position:'absolute',
    backgroundColor:'white',
    bottom:0,
    paddingLeft:20
       },
       SeprateLine:{
        width:'110%',
        height:'2%',
        position:'absolute',
        backgroundColor:'black',
        bottom:0
       }
        
})
