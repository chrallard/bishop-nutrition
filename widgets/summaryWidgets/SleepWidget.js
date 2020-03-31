import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'//imports all required components and libraries

export default class SleepWidget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            avgSleep: 0,
            notes: this.props.sleepEntry.notes,
            notesDisplay: "block"
        }
    }

    componentDidMount() {
        this.buildSleep()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.sleepEntry !== this.props.sleepEntry) {
            this.buildUpdatedSleep()
        }
    }

    buildSleep = () => { //compares start and end sleep time
        this.setState({
            avgSleep: this.props.sleepEntry.duration,
        })
    }

    buildUpdatedSleep = () => {
        let newAvgSleep
        let totalSleepDuration = 0
        let totalStartTime = 0
        let nullEntries = 0

        this.props.sleepEntry.forEach((item) => {
            if (item.durationMs != null) {
                let durationMs = item.durationMs //checks the total amount of reported sleep, ignores days where no sleep was reported
                totalSleepDuration += durationMs
            } else {
                nullEntries += 1
            }
        })

        let numberOfSleepEntries = this.props.sleepEntry.length - nullEntries
        newAvgSleep = totalSleepDuration / ((numberOfSleepEntries) == 0 ? 1 : numberOfSleepEntries) //if the user hasn't entered sleep yet, numberOfSleepEntries will be 0. you can't divide by 0, so it returns 1 instead

        this.setState({ 
            avgSleep: this.msToDuration(newAvgSleep),
            notesDisplay: "none"
        })

        if(this.props.sleepEntry.length == 1){
            this.setState({
                notesDisplay: "block"
            })
        }
    }

    msToTime = (ms) => { //converts milliseconds to readable time
        let date = new Date(ms)

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    msToDuration = (ms) => {
        let minutes = parseInt((ms / (1000 * 60)) % 60)
        let hours = parseInt((ms / (1000 * 60 * 60)) % 24);

        return hours + " hr " + minutes + " min";
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sleep</Text>

                <Text style={styles.amountText}>{this.state.avgSleep}</Text>
                <Text style={styles.titleText}>Average time asleep</Text>
                <View style={{ display: this.state.notesDisplay }}>
                    <Text style={styles.notesTitle} >Notes:</Text>
                    <Text style={styles.notesText} >{this.state.notes}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    // STYLING JEFF March 6
    container: {
        flexDirection: 'column',
        backgroundColor: '#1C1C1E',
        padding: 16,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 8
    },
    title: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600'
    },
    titleText: {
        flexDirection: 'column',
        color: '#DDDEDE',
        fontSize: 16,
        justifyContent: 'center',
        alignSelf:'center',
        marginBottom: 16
    },
    amountText: {
        color: '#347EFB',
        fontSize: 36,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 8
    },
    averageTextLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    averageTitleText: {
        fontSize: 13,
        color: '#DDDEDE'
    },
    averageAmountText: {
        fontSize: 13,
        color: '#347EFB'
    },
    notesTitle:{
        color: '#DDDEDE', 
        fontSize: 16, 
        marginBottom: 8
    },
    notesText:{
        color: '#DDDEDE', 
        fontSize: 12 
    }
})