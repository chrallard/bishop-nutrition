import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox } from 'react-native'

export default class SleepWidget extends Component {

    constructor(props){
        super(props)
        this.state = {
            avgSleep: 0,
            avgStart: 0,
            avgEnd: 0
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
            avgStart: this.msToTime(start + 1000 * 60 * 60 * 4),
            avgEnd: this.msToTime(end + 1000 * 60 * 60 * 4)
        })
    }

    buildUpdatedSleep = () => {
        let newAvgSleep
        let newAvgStart
        let newAvgEnd
        let totalSleepDuration = 0
        let totalStartTime = 0

        this.props.sleepEntry.forEach((item) => {
            let duration = item.durationMs
            totalSleepDuration += duration
        })
        newAvgSleep = totalSleepDuration / this.props.sleepEntry.length

        this.setState({ 
            avgSleep: this.msToDuration(newAvgSleep),
            avgStart: 0,
            avgEnd: 0
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

                <View style={styles.averageTextLayout}>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.averageTitleText}>Average start: </Text>
                        <Text style={styles.averageAmountText}>{this.state.avgStart}</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.averageTitleText}>Average end: </Text>
                        <Text style={styles.averageAmountText}>{this.state.avgEnd}</Text>
                    </View>
                </View>
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
        marginTop: 44
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