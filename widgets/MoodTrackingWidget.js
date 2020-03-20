
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
                    <Text>Mood</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        showMe: true,
                        selectedMood: "",
                        diary: ""
                    })
                }
                }>

                    <View style={styles.image1}>

                        <Image source={require('../Images/smile_1.png')} style={{ width: 60, height: 60, margin: 5 }} />
                        <Image source={require('../Images/smile_2.png')} style={{ width: 60, height: 60, margin: 5 }} />
                        <Image source={require('../Images/smile_3.png')} style={{ width: 60, height: 60, margin: 5 }} />
                    </View>
                    <View style={styles.image2}>
                        <Image source={require('../Images/smile_4.png')} style={{ width: 60, height: 60, margin: 5 }} />
                        <Image source={require('../Images/smile_5.png')} style={{ width: 60, height: 60, margin: 5 }} />
                        <Image source={require('../Images/smile_6.png')} style={{ width: 60, height: 60, margin: 5 }} />
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
                                <Text style={styles.modalBack}>Back</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Mood</Text>




                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ showMe: false })
                                    console.log("Today I felt: " + this.state.selectedMood + "\n")
                                    console.log("My Diary: " + this.state.diary)
                                    //this onpress will be what pushs to the db
                                }}>
                                <Text style={styles.modalSave}>Save</Text>
                            </TouchableOpacity>



                            <View style={styles.modalSeprateLine} />
                        </View>
                        <View>
                            <Text style={{ paddingTop: 20 }}>How is Your Mood Today:</Text>
                        </View>

                        <View style={styles.imageM1}>

                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Sick" })
                            }}>
                                {(this.state.selectedMood == "Sick") ? (
                                    <Image source={require('../Images/smile_1.png')} style={{ width: 65, height: 65, margin: 10, borderWidth: 2, borderColor: "red" }} />

                                ) : (
                                        <Image source={require('../Images/smile_1.png')} style={{ width: 65, height: 65, margin: 10 }} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Sad" })
                            }}>
                                {(this.state.selectedMood == "Sad") ? (
                                    <Image source={require('../Images/smile_2.png')} style={{ width: 65, height: 65, margin: 10, borderWidth: 2, borderColor: "red" }} />

                                ) : (
                                        <Image source={require('../Images/smile_2.png')} style={{ width: 65, height: 65, margin: 10 }} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Hungry" })
                            }}>
                                {(this.state.selectedMood == "Hungry") ? (
                                    <Image source={require('../Images/smile_3.png')} style={{ width: 65, height: 65, margin: 10, borderWidth: 2, borderColor: "red" }} />

                                ) : (
                                        <Image source={require('../Images/smile_3.png')} style={{ width: 65, height: 65, margin: 10 }} />
                                    )}
                            </TouchableOpacity>

                        </View>
                        <View style={styles.imageM2}>

                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Neutral" })
                            }}>
                                {(this.state.selectedMood == "Neutral") ? (
                                    <Image source={require('../Images/smile_4.png')} style={{ width: 65, height: 65, margin: 10, borderWidth: 2, borderColor: "red" }} />

                                ) : (
                                        <Image source={require('../Images/smile_4.png')} style={{ width: 65, height: 65, margin: 10 }} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Happy" })
                            }}>
                                {(this.state.selectedMood == "Happy") ? (
                                    <Image source={require('../Images/smile_5.png')} style={{ width: 65, height: 65, margin: 10, borderWidth: 2, borderColor: "red" }} />

                                ) : (
                                        <Image source={require('../Images/smile_5.png')} style={{ width: 65, height: 65, margin: 10 }} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ selectedMood: "Really Happy" })
                            }}>
                                {(this.state.selectedMood == "Really Happy") ? (
                                    <Image source={require('../Images/smile_6.png')} style={{ width: 65, height: 65, margin: 10, borderWidth: 2, borderColor: "red" }} />

                                ) : (
                                        <Image source={require('../Images/smile_6.png')} style={{ width: 65, height: 65, margin: 10 }} />
                                    )}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text>Diary:</Text>
                        </View>
                        <View style={styles.modalView}>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor="#9a73ef"
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
        display: "flex",
        backgroundColor: '#fff',
        alignSelf: 'stretch',
    },

    modalStyle: {
        justifyContent: 'center',
        width: screen.width,
        height: 520
    },

    modalHeader: {
        display: 'flex',
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalTitle: {
        color: 'black',
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        paddingLeft: 150,

    },

    modalSave: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,

        textAlign: 'right',
        paddingRight: 10
    },

    modalBack: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10,
    },

    modalSeprateLine: {
        width: '100%',
        height: '2%',
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 0
    },

    image1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    image2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    imageM1: {

        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageM2: {

        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    input: {
        margin: 15,
        height: 100,
        borderColor: '#000000',
        borderWidth: 1
    },

});

