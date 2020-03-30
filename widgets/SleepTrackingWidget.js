import React, { Component, useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal, TextInput, Dimensions, StatusBar } from 'react-native';//imports all required components and libraries
import * as firebase from 'firebase/app'
import DateTimePicker from '@react-native-community/datetimepicker';
import '@firebase/firestore'
import 'firebase/auth'

import { DataContext } from '../contexts/DataContext'


const SleepTrackingWidget = (props) => {

    const context = useContext(DataContext) // hook style of contextType

    const [date, setDate] = useState(new Date(1598050800000));
    const [date2, setDate2] = useState(new Date(1598079600000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showMe, setShowMe] = useState(false)//initialized state variables
    const [notes, setNotes] = useState("")
    const [sleepDuration, setSleepDuration] = useState(context.healthTrackingData[0].sleepEntry.duration)
    const [displayStyle, setDisplayStyle] = useState(styles.invisible)
    const [renders, setRenders] = useState(0)

    useEffect(() => {
    if (renders == 0) {
        props.mounted()
        setDisplayStyle(styles.container)
        setRenders(1)
    }})

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date2;
        setShow(Platform.OS === 'ios');
        setDate2(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const compareTime = () => { //THIS WILL BE USED TO PASS DATA TO THE DB
        let d1 = Date.parse(date)
        let d2 = Date.parse(date2)
        let duration = d2 - d1

        setSleepDuration(msToTime(duration))
        updateDb(msToTime(duration), duration)
    }

    const updateDb = async (duration, durationMs) => { //passes information to database
        await firebase.firestore().collection("userData").doc(context.uid).collection("healthTracking").doc(context.todaysHealthTrackingDocId)
            .set({
                sleepEntry: {
                    duration: duration,
                    durationMs: durationMs,
                    notes: notes
                }
            }, { merge: true })
            .then(() => {
                console.log("Document written successfully.")
            }).catch((err) => {
                console.log(err)
            })
    }

    const msToTime = (duration) => { //converts milliseconds to human readable time
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + " hr " + minutes + " min";
    }


    return (

        <View style={displayStyle}>
            <StatusBar barStyle='light-content' />
            <TouchableOpacity onPress={() => setShowMe(true)}>
                <View>
                    <Text style={styles.widgetTitle}>Sleep</Text>
                </View>

                <View style={styles.widgetContent}>
                    <View style={styles.widgetTextLayout}>
                        <Text style={styles.widgetInfoText}>{sleepDuration}</Text>

                    </View>

                </View>


            </TouchableOpacity>
            <Modal visible={showMe} animationType={'slide'} transparent={true}>

                <View style={styles.modalStyle}>
                    <View style={styles.modalHeader}>

                        <TouchableOpacity onPress={() => setShowMe(false)}>
                            <Text style={styles.modalNav}>Cancel</Text>
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Sleep</Text>

                        <TouchableOpacity onPress={() => {
                            compareTime()
                            setShowMe(false)

                        }}>
                            <Text style={styles.modalNav}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContentLayout}>

                        <Text style={styles.datePickerTitles}>Sleep Start:</Text>

                        <View style={styles.datepickerStyle}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={date}
                                mode={"time"}
                                is24Hour={false}
                                display="default"
                                onChange={onChange}
                            />
                        </View>

                        <Text style={styles.datePickerTitles}>Sleep End:</Text>

                        <View style={styles.datepickerStyle}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={date2}
                                mode={"time"}
                                is24Hour={false}
                                display="default"
                                onChange={onChange2}
                            />
                        </View>

                        <View style={styles.notesInputLayout}>
                            <Text style={styles.noteTitle}>Notes:</Text>
                            <TextInput style={styles.modalInput}
                                underlineColorAndroid="transparent"
                                multiline={true}
                                numberOfLines={2}
                                autoCapitalize="none"
                                padding={8}
                                color="white"
                                backgroundColor="#2C2C2E"
                                onChangeText={(notes) => setNotes(notes)}
                                value={notes} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SleepTrackingWidget;

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
        flex: 1,
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
        fontSize: 47
    },
    modalContentLayout: {
        paddingTop: 24
    },
    modalInput: {
        height: 50,
        borderColor: '#B7B7B7',
        backgroundColor: '#2C2C2E',
        borderRadius: 8
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
        fontWeight: '700',
    },
    modalNav: {
        fontSize: 17,
        color: '#347EFB',
    },
    datePickerTitles: {
        color: '#DDDEDE',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 8,
    },
    notesInputLayout: {
        marginLeft: 16,
        marginRight: 16,
    },
    noteTitle: {
        color: '#DDDEDE',
        fontSize: 16,
        marginTop: 8,
        marginBottom: 8
    },
    datepickerStyle: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 16,
        marginLeft: 16,
        marginBottom: 0,
        height: 200
    },

    invisible: {
        display: 'none'
    }

});