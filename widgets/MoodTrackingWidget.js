
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,Modal,TextInput,Dimensions } from 'react-native';
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import 'firebase/auth'


var screen = Dimensions.get('window');
export default class MoodTrackingWidget extends Component {
    
    
  constructor(props){
      super(props)
      this.state = {
       showMe:false
      
      }
      this.addModal = this.addModal.bind(this);
    }
    
    componentDidMount(){
        
        }
      
   addModal=()=>{
    this.refs.addModal.showModal();
   }
       
    render() {
     return(
        
        <View style={styles.container}>
           
            <View>
                <Text  style={styles.title}>Mood</Text>
            </View>

            <TouchableOpacity onPress={()=>{
                this.setState({
                showMe:true
                })}
            }> 
        
                <View style={styles.imageRow1}>            
                    <Image source={require('../Images/smile_1.png')} style={styles.emoji}/>
                    <Image source={require('../Images/smile_2.png')} style={styles.emoji}/>
                    <Image source={require('../Images/smile_3.png')} style={styles.emoji}/>
                </View>
                <View style={styles.imageRow2}>
                    <Image source={require('../Images/smile_4.png')} style={styles.emoji}/>
                    <Image source={require('../Images/smile_5.png')} style={styles.emoji}/>
                    <Image source={require('../Images/smile_6.png')} style={styles.emoji}/>
                </View>

            </TouchableOpacity>


   
                   
            <Modal visible={this.state.showMe} animationType={'slide'}>

                <View style={styles.modalStyle}>
                    <View style={styles.modalHeader}>

                    <TouchableOpacity onPress={()=>{ this.setState({
                        showMe:false
                        })}}>
                        <Text style={styles.modalNav}>Back</Text>
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Mood</Text>
                
                    <TouchableOpacity onPress={()=>{ this.setState({
                        showMe:false
                        })}}>
                        <Text style={styles.modalNav}>Save</Text>
                    </TouchableOpacity>
             
                    <View style={styles.modalSeprateLine}/> 

                    </View>



                    <View>
                        <Text style={styles.content}>How is Your Mood Today:</Text>
                    </View>

          
                    <View style={styles.imageRow1}> 
                        <Image source={require('../Images/smile_1.png')} style={styles.emoji}/>
                        <Image source={require('../Images/smile_2.png')} style={styles.emoji}/>
                        <Image source={require('../Images/smile_3.png')} style={styles.emoji}/>
                    </View>

                    <View style={styles.imageRow2}>
                        <Image source={require('../Images/smile_4.png')} style={styles.emoji}/>
                        <Image source={require('../Images/smile_5.png')} style={styles.emoji}/>
                        <Image source={require('../Images/smile_6.png')} style={styles.emoji}/>
                    </View>

                    <View>
                        <Text style={styles.content}>Diary:</Text>
                    </View>

                    <View>
                        <TextInput style = {styles.modalInput}
                            underlineColorAndroid = "transparent"
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor = '#B7B7B7'
                            autoCapitalize = "none"
                            onChangeText={(text) => this.setState({Text:text})}
                            value={this.state.Text}/>
                    </View>
                </View>
            </Modal>
        </View>   
)
}; 
    };

const styles = StyleSheet.create({
    //Styled by Jeff March 18
    container:{
        display: 'flex',
        backgroundColor: '#1C1C1E',
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 8,
        padding: 16,
    },
    title:{
        color:'#FAFAFA',
        fontSize: 20,
        marginBottom: 16
    },
    emoji:{
        height: 60,
        width: 60
    },
    imageRow1: {
        flexDirection:"row",
        justifyContent: 'space-around',
        marginBottom: 16
    },
    imageRow2:{
        flexDirection:"row",
        justifyContent: 'space-around',
        marginBottom: 16
    },
    content:{
        marginTop: 24,
        marginBottom: 16,
        color: '#DDDEDE',
        fontSize: 17,
    },
    modalInput: {
        height: 200,
        borderColor: '#B7B7B7',
        borderWidth: 1,
        backgroundColor: '#2C2C2E',
        borderRadius: 8
    },
    modalStyle:{
        padding: 16,
        height: '100%',
        backgroundColor: '#0D0D0D',
        marginTop: 88,
        borderRadius: 25
    },   
    modalHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent: 'center',
        marginBottom: 16
    },
    modalTitle:{
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '700',
    },
    modalNav:{
        fontSize: 17,
        color: '#347EFB',
    },
    modalSeprateLine:{
        width:'100%',
        height: 0.4,
        position:'absolute',
        backgroundColor:'#DDDEDE',
        bottom:-16,
    },

});

