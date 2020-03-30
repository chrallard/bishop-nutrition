import React, { Component } from 'react'
import { StyleSheet, Text, View, Button,Image,TouchableOpacity,Modal,TextInput} from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'

import { DataContext } from '../contexts/DataContext'


export default class ProfileScreen extends Component {

  static contextType = DataContext

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      gender:"",
      height:"",
      weight:"",
      dob:"",
      email:"",
      showMe: false,
      showUpdatePassword: false,

      loadingStyle: styles.loading,
      displayStyle: styles.invisible
      }
  }

  async componentDidMount(){
    await this.userIfo()

    this.setState({ 
      loadingStyle: styles.invisible,
      displayStyle: styles.visible
   })
}
  
  signOut = async () => {
    await firebase.auth().signOut().then()
    .catch((err) => {
      console.log(err)
    });
  }

  updatePassword = () => {
    let currentUser = firebase.auth().currentUser
    let cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, this.state.currentPasswordInput)
    currentUser.reauthenticateWithCredential(cred).then(() => {
        currentUser.updatePassword(this.state.newPasswordInput).then(() => {
            alert("Password updated successfully.")
            this.setState({ showUpdatePassword: false })
        }).catch((err) => {
            alert(err)
        })
    }).catch((err) => {
        alert(err)
    })  
}

  updateDb = async () => {
    await firebase.firestore().collection("userData").doc(this.context.uid)
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

  await firebase.firestore().collection("userData").doc(this.context.uid).get().then((doc) => {
    if(doc.exists){
        this.setState({
            name: doc.data().name,
            gender:doc.data().gender,
            height:doc.data().height,
            weight:doc.data().startingWeight,
            dob:doc.data().dob,
            email:doc.data().email 
        })

    }else{
        alert("Error")
    }
   console.log(this.state.name)
}).catch((err) => {
    alert(err)
})  
}

addModal = () => {
    this.refs.addModal.showModal();
  }

  render() {
    return (

      <>
        <View style={this.state.loadingStyle}>
          <MaterialIndicator color='#347EFB' size={50} />
        </View>

        <View style={this.state.displayStyle}>
        <Modal visible={this.state.showUpdatePassword} animationType={'slide'} transparent={true}>

          <View style={styles.modalStyle}>

            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => { this.setState({ showUpdatePassword: false }) }}>
                  <Text style={styles.modalNav}>Back</Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Update Password</Text>

              <TouchableOpacity onPress={this.updatePassword}>
                <Text style={styles.modalNav}>Save</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.updatePasswordInput}>
              <TextInput
              style={styles.textInput}
              placeholder="Current password"
              placeholderTextColor="#6E6F6F"
              onChangeText={(text) => this.setState({currentPasswordInput: text})}
              value={this.state.currentPasswordInput}
              secureTextEntry={true}
              />
            </View>

            <View style={styles.updatePasswordInput}>
                <TextInput
                style={styles.textInput}
                placeholder="New password"
                placeholderTextColor="#6E6F6F"
                onChangeText={(text) => this.setState({newPasswordInput: text})}
                value={this.state.newPasswordInput}
                secureTextEntry={true}
                />
            </View>

          </View>
        </Modal>
        
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <Text style={styles.nameText}>{this.state.name}</Text>

            <TouchableOpacity onPress={() => {this.setState({showMe: true,})}}>
              <Image style={styles.pencilIcon} source={require('../assets/edit.png')}/>
            </TouchableOpacity>
          </View>  

          <View style={styles.textContainer}>
            <View>
              <Text style={styles.infoTitle}>DATE OF BIRTH</Text>
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
            <TouchableOpacity onPress={() => this.setState({ showUpdatePassword: true }) }>
              <View style={styles.updatePassword}>
                <Image style={styles.lockIcon} source={require('../assets/changePassword.png')}/>

                <Text style={styles.changePasswordText}> Change Password</Text>
              
                <Image style={styles.chevronIcon} source={require('../assets/chevron.png')}/>
                      
              </View> 
            </TouchableOpacity>

            <View style={styles.buttonSeprateLine}/> 

            <TouchableOpacity onPress={() => {this.props.navigation.navigate("About")}}>
              <View style={styles.updatePassword}>
                <Image style={styles.aboutIcon} source={require('../assets/about.png')}/>

                <Text style={styles.aboutText}> About</Text>
              
                <Image style={styles.chevronIcon} source={require('../assets/chevron.png')}/>
              </View>  
            </TouchableOpacity>         
          </View>

          <View style={styles.logoutButton}>
            <Button onPress={this.signOut} fontSize={20} title="Log Out" color="#fff"/>
          </View>

          <Modal visible={this.state.showMe} animationType={'slide'} transparent={'true'}>
            <View style={styles.modalStyle}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => { this.setState({ showMe: false }) }}>
                  <Text style={styles.modalNav}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Edit Profile</Text>
              
                <TouchableOpacity onPress={() => { this.setState({ showMe: false }), this.updateDb()}}>
                  <Text style={styles.modalNav}>Save</Text>
                </TouchableOpacity>
              </View>
      
            <Text style={styles.infoTitle}>FULL NAME</Text>
            <TextInput style = {styles.infoText}
                  placeholder = 'name'
                  placeholderTextColor = "#ffffff"
                  autoCapitalize = "none"
                  onChangeText = {(name)=>this.setState({name})}
                  value={this.state.name}/>
            <View style={styles.seprateLine}/> 

            <Text style={styles.infoTitle}>DATE OF BIRTH</Text>
            <TextInput style = {styles.infoText}
              placeholder = {this.state.dob}
              placeholderTextColor = "#ffffff"
              autoCapitalize = "none"
              onChangeText = {(dob)=>this.setState({dob})}
              value={this.state.dob}/>
            <View style={styles.seprateLine}/> 

            <Text style={styles.infoTitle}>HEIGHT</Text>
            <TextInput style = {styles.infoText}
              placeholder = {this.state.height}
              placeholderTextColor = "#ffffff"
              autoCapitalize = "none"
              onChangeText = {(height)=>this.setState({height})}
              value={this.state.height}/>
            <View style={styles.seprateLine}/> 
                
            <Text style={styles.infoTitle}>STARTING WEIGHT</Text>
            <TextInput style = {styles.infoText}
              keyboardType={'numeric'} 
              placeholderTextColor = "#ffffff"
              autoCapitalize = "none"
              onChangeText = {(weight)=>this.setState({weight})}
              value={this.state.weight}/>
            <View style={styles.seprateLine}/> 

            <Text style={styles.infoTitle}>GENDER</Text>
            <TextInput style = {styles.infoText}
              placeholder = {this.state.gender}
              placeholderTextColor = "#ffffff"
              autoCapitalize = "none"
              onChangeText = {(gender)=>this.setState({gender})}
              value={this.state.gender}/>
            <View style={styles.seprateLine}/> 

            <Text style={styles.infoTitle}>EMAIL</Text>
            <TextInput style = {styles.infoText}  
              placeholder = {this.state.email}
              placeholderTextColor = "#ffffff"
              autoCapitalize = "none"
              onChangeText = {(email)=>this.setState({email})}
              value={this.state.email}/>
            <View style={styles.seprateLine}/> 


            </View>
          </Modal> 
        </View>
        </View>  
      </> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16
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
    color:'#FAFAFA',
    fontSize:30,
    marginRight: 8
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
    alignItems: 'center',
    marginBottom: 25
  }, 
  pencilIcon:{
    width:21, 
    height: 21, 
    resizeMode: 'contain'
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
          padding: 16,
          marginBottom: 16
      },
      modalTitle: {
          color: '#FAFAFA',
          fontSize: 17,
          fontWeight: '600',
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
     updatePasswordInput:{
        height: 45,
        backgroundColor: '#1C1C1E',
        marginRight: 16,
        marginLeft: 16,
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 8
     },
     textInput:{
       marginLeft: 8,
       color: '#DDDEDE'
     },

     loading: {
      height: '100%',
      justifyContent: 'center'
    },
    invisible: { 
        display: 'none'
    },
    visible: {

    }
})
