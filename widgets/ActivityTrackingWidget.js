import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, Dimensions } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import 'firebase/auth'


var screen = Dimensions.get('window');
export default class ActivityTrackingWidget extends Component {


    constructor(props) {
        super(props)
        this.state = {
            showMe: false,
            value: 0,
            value3Index: 0,
            radio_props: [
                { label: `Cardio`, value: "Cardio" },
                { label: `Strength Training`, value: "Strength Trainging" },
                { label: `Other`, value: "Other" }
            ]

        }
        this.addModal = this.addModal.bind(this);
    }

    componentDidMount() {

    }

    addModal = () => {
        this.refs.addModal.showModal();
    }
    _radioButtonFunction = obj => {
        console.log(obj.label)

        switch (obj.label) {
            case "Cardio":
                this.setState({ value3Index: 0 })
                break;
            case "Strength Training":
                this.setState({ value3Index: 1 })

                break;

            case "Other":
                this.setState({ value3Index: 2 })

                break;

            default:
                break;
        }
    }

    render() {
        return (

            <View style={styles.container}>

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




                <Modal visible={this.state.showMe} animationType={'slide'}>


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
                        

                        {/* <RadioForm 
                        radio_props={this.state.radio_props}
                        initial={0}
                        labelStyle={{ color: "#fff" }}

                        onPress={(value) => { this.setState({ value: value }) }}
                        >


                        
                        </RadioForm> */}

                        <RadioForm
                            formHorizontal={false}
                            animation={true}
                        >
                            {/* To create radio buttons, loop through your array of options */}
                            {
                                this.state.radio_props.map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i} >
                                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={this.state.value3Index === i}
                                            onPress={() => this._radioButtonFunction(obj)}
                                            borderWidth={15}
                                            buttonInnerColor={'#347EFB'}
                                            buttonOuterColor={this.state.value3Index === i ? '#347EFB' : '#DDDEDE'}
                                        />
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
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ Text: text })}
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
        marginBottom: 16
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
    emoji: {
        height: 60,
        width: 60
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
    content: {
        marginBottom: 16,
        color: '#DDDEDE',
        fontSize: 17,
    },
    modalContentLayout: {
        padding: 16,
        paddingTop: 50
    },
    modalNoteInput: {
        height: 200,
        backgroundColor: '#2C2C2E',
        borderRadius: 8
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
    },
    modalNav: {
        fontSize: 17,
        color: '#347EFB',
    },
    typeOptionLabel: {
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

});