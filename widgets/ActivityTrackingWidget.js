import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, Dimensions } from 'react-native';//imports required for functionality
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { DataContext } from '../contexts/DataContext'


var screen = Dimensions.get('window');
export default class ActivityTrackingWidget extends Component {

    static contextType = DataContext

    constructor(props) {
        super(props)
        this.state = {
            showMe: false,
            value: -1,
            value3Index: 0,//initializes needed state vairables
            Title: "",
            Duration: "",
            Notes: "",
            radio_props: [
                { label: `Cardio`, value: "Cardio" },
                { label: `Strength Training`, value: "Strength Training" },
                { label: `Yoga`, value: "Yoga" },
                { label: `Other`, value: "Other" }
            ],

            displayStyle: styles.invisible
        }

        this.addModal = this.addModal.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.visible !== this.props.visible){
            this.updateVisibility()
        }
    }

    updateVisibility = () => {
        this.setState({ displayStyle: styles.container })
    }

    addModal = () => {
        this.refs.addModal.showModal();
    }
    _radioButtonFunction = obj => { //sets the selection of radio buttons when one is clicked

        switch (obj.label) {
            case "Cardio":
                this.setState({ value3Index: 0 })
                break;
            case "Strength Training":
                this.setState({ value3Index: 1 })

                break;
            case "Yoga":
                this.setState({ value3Index: 2 })
                break;

            case "Other":
                this.setState({ value3Index: 3 })

                break;

            default:
                break;
        }
    }

    updateDb = async () => {
        // title, minutes, notes, type

        await firebase.firestore().collection("userData").doc(this.context.uid).collection("healthTracking").doc(this.context.todaysHealthTrackingDocId)
        .set({ 
            exerciseEntry: {
                durationMins: Number(this.state.Duration),
                notes: this.state.Notes,
                title: this.state.Title,
                type: this.state.radio_props[this.state.value3Index].value
            }
         }, { merge: true })
    }

    render() {
        return (

            <View style={this.state.displayStyle}>

                <TouchableOpacity onPress={() => {
                    this.setState({
                        showMe: true
                    })
                }
                }>
                    <View>
                        <Text style={styles.widgetTitle}>Activity</Text>
                    </View>

                    <View style={styles.widgetContent}>
                        <View style={styles.widgetTextLayout}>
                            <Text style={styles.widgetInfoText}>3862</Text>
                            <Text style={styles.widgetSubTitle}>Steps</Text>
                        </View>
                        <View style={styles.widgetTextLayout}>
                            <Text style={styles.widgetInfoText}>1 hr 35min</Text>
                            <Text style={styles.widgetSubTitle}>Cardio</Text>
                        </View>
                        <View style={styles.widgetTextLayout}>
                            <Text style={styles.widgetInfoText}>0 min</Text>
                            <Text style={styles.widgetSubTitle}>Strength</Text>
                        </View>
                    </View>


                </TouchableOpacity>




                <Modal visible={this.state.showMe} animationType={'slide'} transparent={true}>


                    <View style={styles.modalStyle}>
                        <View style={styles.modalHeader}>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    showMe: false
                                })
                            }}>
                                <Text style={styles.modalNav}>Back</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Activity</Text>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    showMe: false
                                })
                                console.log(this.state.Title + "\n")
                                console.log(this.state.Duration + "\n")
                                console.log(this.state.Notes + "\n")

                                this.updateDb()
                            }}>
                                <Text style={styles.modalNav}>Save</Text>
                            </TouchableOpacity>


                        </View>


                        <View style={styles.modalContentLayout}>
                            <View>
                                <TextInput style={styles.modalInput}
                                    underlineColorAndroid="transparent"
                                    multiline={false}
                                    numberOfLines={1}
                                    placeholder="Title"
                                    placeholderTextColor='#DDDEDE'
                                    autoCapitalize="none"
                                    fontWeight='600'
                                    onChangeText={(text) => this.setState({ Title: text })}
                                    value={this.state.Text} />
                            </View>
                            <View>
                                <TextInput style={styles.modalInput}
                                    underlineColorAndroid="transparent"
                                    multiline={false}
                                    numberOfLines={1}
                                    placeholder="Duration"
                                    placeholderTextColor='#DDDEDE'
                                    fontWeight='600'
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.setState({ Duration: text })}
                                    value={this.state.Text} />
                            </View>

                            <Text style={styles.typeLabel}>Type:</Text>




                            <RadioForm
                                formHorizontal={false}
                                animation={true}
                            >
                                {
                                    this.state.radio_props.map((obj, i) => (
                                        <RadioButton labelHorizontal={true} key={i} style={styles.buttonSpace}>
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.value3Index === i}
                                                onPress={() => this._radioButtonFunction(obj)}
                                                borderWidth={15}
                                                buttonInnerColor={'#6EFACC'}
                                                buttonOuterColor={this.state.value3Index === i ? '#6EFACC' : '#DDDEDE'}

                                            />
                                            {obj.label == "Cardio" ? (
                                                <Image style={styles.icon}

                                                    source={require('../assets/cardio_Icon.png')}
                                                />
                                            ) : obj.label == "Strength Training" ? (
                                                <Image style={styles.icon}

                                                    source={require('../assets/strength_Icon.png')}
                                                />
                                            ) : obj.label == "Yoga" ? (
                                                <Image style={styles.icon}
                                                    source={require('../assets/yoga.png')}
                                                />
                                            ) : (
                                                            <Image style={styles.icon}
                                                                source={require('../assets/other_Icon.png')}
                                                            />
                                                        )
                                            }
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={(value) => { this.setState({ value: value }) }}
                                                labelStyle={styles.typeOptionLabel}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                    ))
                                }
                            </RadioForm>
                            <View>
                                <Text style={styles.notesLabel}>Notes:</Text>
                            </View>

                            <View>
                                <TextInput style={styles.modalNoteInput}
                                    underlineColorAndroid="transparent"
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholderTextColor='#B7B7B7'
                                    padding={8}
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.setState({ Notes: text })}
                                    value={this.state.Text} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    //Styled by Jeff March 18

    container: {
        display: 'flex',
        backgroundColor: '#1C1C1E',
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 8,
        padding: 16,
    },
    widgetContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 7,
        paddingRight: 7,
    },
    widgetTitle: {
        color: '#FAFAFA',
        fontSize: 20,
        marginBottom: 16,
        fontWeight: '600'
    },
    widgetTextLayout: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    widgetSubTitle: {
        color: "#DDDEDE",
        fontSize: 12,
        marginTop: 2
    },
    widgetInfoText: {
        color: "#347EFB",
        fontSize: 22
    },
    icon: {
        marginLeft: 8,
        marginRight: 8,
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    buttonSpace: {
        marginTop: 8
    },
    modalContentLayout: {
        padding: 16,
        paddingTop: 50
    },
    modalNoteInput: {
        height: 200,
        backgroundColor: '#2C2C2E',
        borderRadius: 8,
        color: '#DDDEDE'
    },
    modalInput: {
        height: 26,
        fontSize: 20,
        color: '#DDDEDE',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#DDDEDE'
    },
    modalStyle: {
        height: '100%',
        backgroundColor: '#0D0D0D',
        marginTop: 88,
        borderRadius: 15
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
        fontWeight: '600'
    },
    modalNav: {
        fontSize: 17,
        color: '#347EFB',
    },
    typeOptionLabel: {
        //marginTop: 8,
        fontSize: 16,
        color: '#DDDEDE'
    },
    typeLabel: {
        marginBottom: 16,
        marginTop: 16,
        color: '#DDDEDE',
        fontSize: 17,
        fontWeight: '600'
    },
    notesLabel: {
        marginBottom: 16,
        marginTop: 40,
        color: '#DDDEDE',
        fontSize: 17,
    },

    invisible:{
        display: 'none'
    }
});