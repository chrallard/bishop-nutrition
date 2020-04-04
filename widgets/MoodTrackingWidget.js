
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';//imports all required components and libraries
import * as firebase from 'firebase/app'
import '@firebase/firestore'

import { DataContext } from '../contexts/DataContext'


var screen = Dimensions.get('window');
export default class MoodTrackingWidget extends Component {

    static contextType = DataContext

    constructor(props) {
        super(props)
        this.state = {
            showMe: false,
            selectedMood: "",//initialized state variables
            moodValue: 0,

            displayStyle: styles.invisible
        }

        this.addModal = this.addModal.bind(this);
    }

    async componentDidMount() {
        this.props.mounted()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.updateVisibility()
        }
    }

    updateVisibility = () => {
        this.setState({ displayStyle: styles.container })
    }

    addModal = () => {
        this.refs.addModal.showModal();
    }

    updateDb = async () => { //pushes mood info to the database
        await firebase.firestore().collection("userData").doc(this.context.uid).collection("healthTracking").doc(this.context.todaysHealthTrackingDocId)
            .set({
                moodEntry: {
                    diary: this.state.diary,
                    mood: this.state.moodValue
                }
            },
                { merge: true })
    }

    render() {
        return (

            <View style={this.state.displayStyle}>

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

                        <Image source={require('../Images/smile_6.png')} style={styles.emoji} />
                        <Image source={require('../Images/smile_5.png')} style={styles.emoji} />
                        <Image source={require('../Images/smile_4.png')} style={styles.emoji} />
                    </View>
                    <View style={styles.imageRow2}>
                        <Image source={require('../Images/smile_3.png')} style={styles.emoji} />
                        <Image source={require('../Images/smile_2.png')} style={styles.emoji} />
                        <Image source={require('../Images/smile_1.png')} style={styles.emoji} />
                    </View>
                </TouchableOpacity>




                <Modal visible={this.state.showMe} animationType={'slide'} presentationStyle='pageSheet'>
                    <View style={styles.modalStyle}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => { this.setState({ showMe: false }) }}>
                                <Text style={styles.modalNav}>Back</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Mood</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ showMe: false })
                                    console.log("Today I felt: " + this.state.selectedMood + "\n")
                                    console.log("My Diary: " + this.state.diary)
                                    this.updateDb()
                                    //this onpress will be what pushs to the db
                                }}>
                                <Text style={styles.modalNav}>Save</Text>
                            </TouchableOpacity>

                            <View style={styles.modalSeprateLine} />

                        </View>

                        <KeyboardAvoidingView behavior="position">
                        <View>
                            <Text style={styles.content}>How is Your Mood Today:</Text>
                        </View>


                        <View style={styles.imageRow1}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    selectedMood: "Really Happy",
                                    moodValue: 6
                                })
                            }}>
                                {((this.state.selectedMood == "Really Happy") || (this.state.selectedMood == "")) ? (
                                    <Image source={require('../Images/smile_6.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_6.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    selectedMood: "Happy",
                                    moodValue: 5
                                })
                            }}>
                                {(this.state.selectedMood == "Happy") ? (
                                    <Image source={require('../Images/smile_5.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_5.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    selectedMood: "Neutral",
                                    moodValue: 4
                                })
                            }}>
                                {(this.state.selectedMood == "Neutral") ? (
                                    <Image source={require('../Images/smile_4.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_4.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.imageRow2}>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    selectedMood: "Hungry",
                                    moodValue: 3
                                })
                            }}>
                                {(this.state.selectedMood == "Hungry") ? (
                                    <Image source={require('../Images/smile_3.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_3.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    selectedMood: "Sad",
                                    moodValue: 2
                                })
                            }}>
                                {(this.state.selectedMood == "Sad") ? (
                                    <Image source={require('../Images/smile_2.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_2.png')} style={styles.emojiNoSelect} />
                                    )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    selectedMood: "Sick",
                                    moodValue: 1
                                })
                            }}>
                                {(this.state.selectedMood == "Sick") ? (
                                    <Image source={require('../Images/smile_1.png')} style={styles.emojiSelect} />

                                ) : (
                                        <Image source={require('../Images/smile_1.png')} style={styles.emojiNoSelect} />
                                    )
                                }
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
                        </KeyboardAvoidingView>
                    </View>
                </Modal>

            </View>
        )
    };
};

const styles = StyleSheet.create({
    //Styled by Jeff March 20
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
        marginBottom: 16,
        fontWeight: '600'
    },
    emoji: {
        height: 60,
        width: 60
    },
    emojiSelect: {
        height: 60,
        width: 60,
        opacity: 1
    },
    emojiNoSelect: {
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
        marginTop: 24,
        marginBottom: 16,
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

    invisible: {
        display: 'none'
    }
});
