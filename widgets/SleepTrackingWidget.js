import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal, TextInput, Dimensions } from 'react-native';
import * as firebase from 'firebase/app'
import DateTimePicker from '@react-native-community/datetimepicker';
import '@firebase/firestore'
import 'firebase/auth'




const SleepTrackingWidget = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [date2, setDate2] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showMe, setShowMe] = useState(false)
    const [notes, setNotes] = useState("")

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
        console.log(d1 + " " + d2)
        let duration = d2 - d1

        console.log(msToTime(duration))
        console.log("\n" + notes)
    }

    const msToTime = (duration) => {
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

        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowMe(true)}>
                <View>
                    <Text style={styles.widgetTitle}>Sleep</Text>
                </View>

                <View style={styles.widgetContent}>
                    <View style={styles.widgetTextLayout}>
                        <Text style={styles.widgetInfoText}>7 hr 35 min</Text>

                    </View>

                </View>


            </TouchableOpacity>
            <Modal visible={showMe} animationType={'slide'}>

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
                            //style={{backgroundColor: 'white', borderRadius: 20, marginRight: 16, marginLeft: 16}}
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
    modalContentLayout: {
        paddingTop: 24
    },
    modalInput: {
        height: 100,
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
        marginLeft: 16
    }

});