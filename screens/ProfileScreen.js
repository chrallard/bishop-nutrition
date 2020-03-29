import React, { Component } from 'react'
import { StyleSheet, Text, View, Button,Body,Right,Container,Content,Image,TouchableOpacity, ScrollView,Modal} from 'react-native'
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
      email:"",
      showMe: false
      }
  }

  async componentDidMount(){
    await this.userIfo()
    await this.setUid()
}
  signOut = async () => {
    await firebase.auth().signOut().then()
    .catch((err) => {
      console.log(err)
    });
  }
  setUid = async () => {
    let uid = await firebase.auth().currentUser.uid
    this.setState({ uid })
  }

  updateDb = async () => {
    await firebase.firestore().collection("userData").doc(this.state.uid)
        .set({
           
                name: this.state.name,
                weight: this.state.weight,
                gender:this.state.gender,
                dob:this.state.dob,
                email:this.state.email,
                height:this.state.height
           
        },
            { merge: true })
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
              <View style={styles.headerBox}>
            <Text style={styles.nameText}>{this.state.name}</Text>
           <TouchableOpacity onPress={() => {this.setState({showMe: true,})}}>
           <Image style={{height: 25,width: 25,paddingLeft:20}} source={require('../assets/edit.png')}/>
           </TouchableOpacity>
           </View>
 
          <View>
  <Text style={styles.infoTitle}>DATE OF BIRTHDAY</Text>
          <Text style={styles.infoText}>{this.state.dob}</Text>
          <View style={styles.seprateLine}/> 
          </View>
<View>
  <Text style={styles.infoTitle}>GENDER</Text>
          <Text style={styles.infoText}>{this.state.gender}</Text>
          <View style={styles.seprateLine}/> 
          </View>
          
          <View>
          <Text style={styles.infoTitle}>HEIGHT</Text>
          <Text style={styles.infoText}>{this.state.height}</Text>
          <View style={styles.seprateLine}/> 
          </View>
          <View>
          <Text style={styles.infoTitle}>STARTING WEIGHT</Text>
          <Text style={styles.infoText}>{this.state.weight} lbs</Text>
          <View style={styles.seprateLine}/> 
         </View>
         <View>
          <Text style={styles.infoTitle}>EMAIL</Text>
          <Text style={styles.infoText}>{this.state.email} </Text>
          <View style={styles.seprateLine}/> 
         </View>

         </View>
       
        

         <View style={styles.textContainer1}> 
         <TouchableOpacity onPress={() => {this.props.navigation.navigate("Update Password")} }>
                 <View style={styles.updatePassword}>
                 <Image
                     style={styles.lockIcon}
                      source={require('../assets/changePassword.png')}
                    />
             <Text style={styles.changePasswordText}> Change Password</Text>
             
  <Image style={styles.chevronIcon} source={require('../assets/chevron.png')}/>
                    
                    </View> 
                    </TouchableOpacity>

                    <View style={styles.buttonSeprateLine}/> 

                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("About")}}>
                    <View style={styles.updatePassword}>
                 <Image
                     style={styles.aboutIcon}
                      source={require('../assets/about.png')}
                    />
             <Text style={styles.aboutText}> About</Text>
             
  <Image style={styles.chevronIcon} source={require('../assets/chevron.png')}/>
                    
                    
                    </View>  
                    </TouchableOpacity>     
                    
                    
                   
            </View>
            <View style={styles.logoutButton}>
          <Button
            onPress={this.signOut}
            fontSize={20}
            title="Log Out"
            color="#fff"
          />
        </View> 
        <Modal visible={this.state.showMe} animationType={'slide'} >

       
        <View style={styles.modalStyle}>
    <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => { this.setState({ showMe: false }) }}>
            <Text style={styles.modalNav}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.modalTitle}>Mood</Text>

        <TouchableOpacity
            onPress={() => {
                this.setState({ showMe: false })
               
                this.updateDb()
                //this onpress will be what pushs to the db
            }}>
            <Text style={styles.modalNav}>Save</Text>
        </TouchableOpacity>

        <View style={styles.modalSeprateLine} />

    </View>
    <View>
        <Text style={styles.content}>FULL NAME</Text>
        <TextInput style = {styles.input}
              
               placeholder = 'name'
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {(name)=>this.setState({name})}
               value={this.state.name}/>
        <Text style={styles.content}>DATE OF BIRTH</Text>
        <TextInput style = {styles.input}
               
               placeholder = {this.state.dob}
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {(dob)=>this.setState({dob})}
               value={this.state.dob}/>
               <Text style={styles.content}>HEIGHT</Text>
        <TextInput style = {styles.input}
               
               placeholder = {this.state.height}
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {(height)=>this.setState({height})}
               value={this.state.height}/>
               <Text style={styles.content}>STARTING WEIGHT</Text>
        <TextInput style = {styles.input}
               
                
               keyboardType={'numeric'} 
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {(weight)=>this.setState({weight})}
               value={this.state.weight}/>
               <Text style={styles.content}>GENDER</Text>
        <TextInput style = {styles.input}
               
               placeholder = {this.state.gender}
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {(gender)=>this.setState({gender})}
               value={this.state.gender}/>
               <Text style={styles.content}>EMAIL</Text>
        <TextInput style = {styles.input}
               
               placeholder = {this.state.email}
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {(email)=>this.setState({email})}
               value={this.state.email}/>

</View>

           </View>
                 </Modal>
              
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
      marginTop: 5
  },
  textContainer:{
      flexDirection: 'column',
      backgroundColor: '#000000',
      paddingBottom: 20,
      alignSelf: 'stretch',
  },
  nameText:{
    marginTop: 10,
    paddingBottom:40,
    color:'#fff',
    alignItems: 'center',
    textAlign:'center',
    fontSize:30
  },
  infoText:{
    color:'#347EFB',
    paddingTop:10,
    paddingBottom:5,
    paddingLeft:16,
    fontSize:20
  },
  infoTitle:{
    fontSize:13,
    paddingLeft:16,
    paddingTop:10,
    color: '#FAFAFA'
  },
  seprateLine:{
    width: 385,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 1,
    position:'absolute',
    backgroundColor:'#B7B7B7',
    bottom:0,
  },
  buttonSeprateLine:{
    width: '97%',
    alignSelf: 'flex-end',
    height: 1,
    backgroundColor:'#3A3A3D',
    bottom:0,
  },
  lockIcon:{
    height: 30,
    width: 20,
    paddingRight:10,
    resizeMode: 'center'
  },
  aboutIcon:{
    height: 32,
    width: 22,
    resizeMode: 'contain'
  },
  chevronIcon:{
    height: 20,
    width: 10,
    alignSelf: "flex-end",
    resizeMode: 'contain'
  },
  logoutButton:{
    width: "100%", 
    margin: 10, 
    backgroundColor: "#347EFB", 
    height: 55, 
    justifyContent: 'center'
  },
  aboutText:{
    color:"#ffffff",
    paddingRight:285,
    paddingLeft:10,
    fontSize: 17
  },
  changePasswordText:{
    color:"#ffffff",
    paddingRight:195,
    paddingLeft:10,
    fontSize: 17
  },
  headerBox:{
    flexDirection:'row',
    paddingBottom:40,
    paddingLeft:30,
    justifyContent:'center',
    alignItems: 'center',
      textAlign:'center',
  }, 
  
  SeprateLine:{
          width:'110%',
          height:'2%',
          position:'absolute',
          backgroundColor:'black',
          bottom:0
         },
         modalStyle: {
          height: '100%',
          backgroundColor: '#0D0D0D',
          marginTop: 88,
          borderRadius: 15,
      },
      modalHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1E1E1E',
          width: '100%',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          padding: 16
      },
      modalTitle: {
          color: '#FAFAFA',
          fontSize: 20,
          fontWeight: '700',
      },
      modalNav: {
          fontSize: 17,
          color: '#347EFB',
      },
      modalInput: {
          color: '#dddede',
          height: 150,
          borderColor: '#B7B7B7',
          backgroundColor: '#2C2C2E',
          borderRadius: 8,
          marginLeft: 16,
          marginRight: 16
      },
      content: {
          marginTop: 15,
          marginBottom: 10,
          marginLeft: 16,
          color: '#DDDEDE',
          fontSize: 17,
      },
      modalSeprateLine: {
          width: '100%',
          height: '2%',
          position: 'absolute',
          backgroundColor: 'black',
          bottom: 0
      },
      input: {
    fontSize:20,
        width: '100%',
        color:'#347EFB',
        borderBottomColor: "#505050",
        borderBottomWidth: 1,
        margin: 5,
        marginLeft: 16,
     },
  
        
})
