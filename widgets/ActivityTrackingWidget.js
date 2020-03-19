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
                        <Text style={styles.title}>Activity</Text>
                    </View>

                    <View>
                        <Text style={{ color: "#347EFB" }}>3862</Text>
                        <Text style={{ color: "darkgrey" }}>Steps</Text>
                    </View>
                    <View>
                        <Text style={{ color: "#347EFB" }}>1 hr 35min</Text>
                        <Text style={{ color: "darkgrey" }}>Cardio</Text>
                    </View>
                    <View>
                        <Text style={{ color: "#347EFB" }}>0 min</Text>
                        <Text style={{ color: "darkgrey" }}>Strength</Text>
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

                            <View style={styles.modalSeprateLine} />

                        </View>



                        <View>
                            <TextInput style={styles.modalInput, { height: 26 }}
                                underlineColorAndroid="transparent"
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Title"
                                placeholderTextColor='#B7B7B7'
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ Title: text })}
                                value={this.state.Text} />
                        </View>
                        <View>
                            <TextInput style={styles.modalInput, { height: 26 }}
                                underlineColorAndroid="transparent"
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Duration"
                                placeholderTextColor='#B7B7B7'
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ Duration: text })}
                                value={this.state.Text} />
                        </View>

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
                                            borderWidth={1}
                                            buttonInnerColor={'#347EFB'}
                                            buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                            buttonStyle={{}}
                                            buttonWrapStyle={{ marginLeft: 10 }}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            labelHorizontal={true}
                                            onPress={(value) => { this.setState({ value: value }) }}
                                            labelStyle={{ fontSize: 20, color: '#347EFB' }}
                                            labelWrapStyle={{}}
                                        />
                                    </RadioButton>
                                ))
                            }
                        </RadioForm>





                        <View>
                            <Text style={styles.content}>Notes:</Text>
                        </View>

                        <View>
                            <TextInput style={styles.modalInput}
                                underlineColorAndroid="transparent"
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor='#B7B7B7'
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ Text: text })}
                                value={this.state.Text} />
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
    title: {
        color: '#FAFAFA',
        fontSize: 20,
        marginBottom: 16
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
    modalStyle: {
        padding: 16,
        height: '100%',
        backgroundColor: '#0D0D0D',
        marginTop: 88,
        borderRadius: 25
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: 16
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
    modalSeprateLine: {
        width: '100%',
        height: 0.4,
        position: 'absolute',
        backgroundColor: '#DDDEDE',
        bottom: -16,
    },

});