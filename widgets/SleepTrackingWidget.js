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
                            <Text style={styles.modalNav}>Back</Text>
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Sleep</Text>

                        <TouchableOpacity onPress={() => {
                            compareTime()
                            setShowMe(false)

                        }}>
                            <Text style={styles.modalNav}>Save</Text>
                        </TouchableOpacity>

                        <View style={styles.modalSeprateLine} />

                    </View>



                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={"datetime"}
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                    />
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date2}
                        mode={"datetime"}
                        is24Hour={false}
                        display="default"
                        onChange={onChange2}
                    />
                    <View>
                        <Text style={styles.content}>Notes:</Text>
                    </View>

                    <View>
                        <TextInput style={styles.modalInput, { height: 26 }}
                            underlineColorAndroid="transparent"
                            multiline={false}
                            numberOfLines={1}
                            placeholder="Notes"
                            placeholderTextColor='#B7B7B7'
                            autoCapitalize="none"
                            color="white"
                            borderColor="white"
                            onChangeText={(notes) => setNotes(notes)}
                            value={notes} />
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