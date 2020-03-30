import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox } from 'react-native'

export default class SleepWidget extends Component {

    constructor(props){
        super(props)
        this.state = {
            avgSleep: 0
        }
    }

    componentDidMount(){
       this.buildSleep()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.sleepEntry !== this.props.sleepEntry){
            this.buildUpdatedSleep()
        }
    }

    buildSleep = () => {
        let start = this.props.sleepEntry.start
        let end = this.props.sleepEntry.end

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
            if(item.durationMs != null){
                let durationMs = item.durationMs
                totalSleepDuration += durationMs
            }else{
                nullEntries += 1
            }
        })
        
        let numberOfSleepEntries = this.props.sleepEntry.length - nullEntries
        newAvgSleep = totalSleepDuration / ((numberOfSleepEntries) == 0 ? 1 : numberOfSleepEntries) //if the user hasn't entered sleep yet, numberOfSleepEntries will be 0. you can't divide by 0, so it returns 1 instead

        this.setState({ 
            avgSleep: this.msToDuration(newAvgSleep)
        })
    }

    msToTime = (ms) => {
        let date = new Date(ms)

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    msToDuration = (ms) => {
        let minutes = parseInt((ms/(1000*60))%60)
        let hours = parseInt((ms/(1000*60*60))%24);
    
        return hours + " hr " + minutes + " min";
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Sleep</Text>

                <Text style={styles.amountText}>{this.state.avgSleep}</Text>
                <Text style={styles.titleText}>Average time asleep</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // STYLING JEFF March 6
    container:{
        flexDirection: 'column',
        backgroundColor: '#1C1C1E',
        padding: 16,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 16
    },
    title:{
        color:'#FAFAFA',
        fontSize: 20,
        fontWeight: '600'
    },
    titleText:{
        flexDirection: 'column',
        color:'#DDDEDE',
        fontSize: 16,
        justifyContent: 'center',
        alignSelf:'center',
        marginBottom: 8
    },
    amountText:{
        color:'#347EFB',
        fontSize: 36,
        justifyContent: 'center',
        alignSelf:'center',
        marginTop: 8
    },
    averageTextLayout:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    averageTitleText:{
        fontSize: 13,
        color: '#DDDEDE'
    },
    averageAmountText:{
        fontSize: 13,
        color: '#347EFB'
    }
})