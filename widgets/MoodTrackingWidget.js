
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, Dimensions } from 'react-native';
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import 'firebase/auth'


var screen = Dimensions.get('window');
export default class MoodTrackingWidget extends Component {


    constructor(props) {
        super(props)
        this.state = {
            showMe: false,
            selectedMood: ""

        }
        this.addModal = this.addModal.bind(this);
    }

    componentDidMount() {

    }

    addModal = () => {
        this.refs.addModal.showModal();
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.widgetTitle}>Mood</Text>
                </View>

                <TouchableOpacity onPress={() => {
                    this.setState({
                        showMe: true,
                        selectedMood: "",
                        diary: ""
                    })
                }}>

                    <View style={styles.imageRow1}>

                        <Image source={require('../Images/smile_1.png')} style={styles.emoji} />
                        <Image source={require('../Images/smile_2.png')} style={styles.emoji} />
                        <Image source={require('../Images/smile_3.png')} style={styles.emoji} />
                    </View>
                    <View style={styles.imageRow2}>
                        <Image source={require('../Images/smile_4.png')} style={styles.emoji} />
                        <Image source={require('../Images/smile_5.png')} style={styles.emoji} />
                        <Image source={require('../Images/smile_6.png')} style={styles.emoji} />
                    </View>
                </TouchableOpacity>




                <Modal visible={this.state.showMe} animationType={'slide'}>

                    <View style={styles.modalStyle}>

                        <View style={styles.modalHeader}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        showMe: false
                                    })
                                }}>
                                <Text style={styles.modalNav}>Back</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Mood</Text>




                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ showMe: false })
                                    console.log("Today I felt: " + this.state.selectedMood + "\n")
                                    console.log("My Diary: " + this.state.diary)
                                    //this onpress will be what pushs to the db
                                }}>
                                <Text style={styles.modalNav}>Save</Text>
                            </TouchableOpacity>



                            <View style={styles.modalSeprateLine} />
                        </View>
                        <View>
                            <Text style={styles.content}>How is Your Mood Today:</Text>
                        </View>

                        <View style={styles.imageRow1}>

                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Sick" })
                            }}>
                                {(this.state.selectedMood == "Sick") ? (
                                    <Image source={require('../Images/smile_1.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_1.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Sad" })
                            }}>
                                {(this.state.selectedMood == "Sad") ? (
                                    <Image source={require('../Images/smile_2.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_2.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Hungry" })
                            }}>
                                {(this.state.selectedMood == "Hungry") ? (
                                    <Image source={require('../Images/smile_3.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_3.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>

                        </View>
                        <View style={styles.imageRow2}>

                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Neutral" })
                            }}>
                                {(this.state.selectedMood == "Neutral") ? (
                                    <Image source={require('../Images/smile_4.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_4.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Happy" })
                            }}>
                                {(this.state.selectedMood == "Happy") ? (
                                    <Image source={require('../Images/smile_5.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_5.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Really Happy" })
                            }}>
                                {(this.state.selectedMood == "Really Happy") ? (
                                    <Image source={require('../Images/smile_6.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_6.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.content}>Diary:</Text>
                        </View>
                        <View style={styles.modalView}>
                            <TextInput style={styles.modalInput}
                                underlineColorAndroid="transparent"
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor="#DDDEDE"
                                autoCapitalize="none"
                                onChangeText={(diary) => this.setState({ diary })}
                                value={this.state.diary} />

                        </View>
                    </View>
                </Modal>

            </View>
        )
    };
};

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        backgroundColor: '#1C1C1E',
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 8,
        padding: 16,
    },
    widgetTitle: {
    color: '#FAFAFA',
    fontSize: 20,
    marginBottom: 16
},
emoji: {
    height: 60,
    width: 60
},
emojiSelect:{
    height:65,
    width:65,
    opacity:1

},
emojiNoSelect:{
        height: 60,
        width: 60,
        opacity: 0.6

},
imageRow1: {
    flexDirection: "row",
    justifyContent: 'space-around',
    marginBottom: 16
},
imageRow2: {
    flexDirection: "row",
    justifyContent: 'space-around',
    marginBottom: 16
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
      
    height: 200,
    borderColor: '#B7B7B7',
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    marginLeft: 16,
    marginRight: 16
},
content: {
    marginTop: 24,
    marginBottom: 16,
    marginLeft:  16,
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

});
