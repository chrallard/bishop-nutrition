import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'//imports all required components and libraries
import Dash from 'react-native-dash'
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'

import { DataContext } from '../contexts/DataContext'


export default class WeightWidget extends Component {

    static contextType = DataContext

    constructor(props) {
        super(props)
        this.state = {
            startingWeight: "",//initialized state variables
            weightEntry: "",
            subtract: "",

            displayStyle: styles.invisible
        }
    }

    async componentDidMount() {
        await this.weightInfo() //gets weight info from database

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

    weightInfo = async () => {
        this.setState({ startingWeight: this.context.userInfo.startingWeight })
        this.setState({ weightEntry: this.context.bodyTrackingData[0].weightEntry }) // [0] because it's the most recent entry
        this.setState({ subtract: (this.state.weightEntry) - (this.state.startingWeight) })
    }


    render() {
        return (

            <View style={this.state.displayStyle}  >


                <Text style={styles.titleText}>Weight</Text>

                <View style={styles.textRow}>

                    <View style={styles.itemBox}>
                        <Text style={styles.startingText}>{this.state.startingWeight}</Text>
                        <Text style={styles.bodyTextStart}>Starting</Text>
                    </View>

                    <Dash dashColor='#347EFB' dashGap={7} dashLength={10} style={{ width: 70, height: 10 }} />

                    <View style={styles.itemBox}>
                        <Text style={styles.differenceText}>{this.state.subtract}</Text>
                        <Text style={styles.bodyTextProgress}>Progress</Text>
                    </View>

                    <Dash dashColor='#347EFB' dashGap={7} dashLength={10} style={{ width: 70, height: 10 }} />

                    <View style={styles.itemBox} >
                        <Text style={styles.currentText}>{this.state.weightEntry}</Text>
                        <Text style={styles.bodyTextCurrent}>Current</Text>
                    </View>
                </View>

            </View>

        )
    }


}

const styles = StyleSheet.create({
    //Styled by Jeff March 16th
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1C1C1E',
        padding: 16,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 8
    },
    titleText: {
        color: '#FAFAFA',
        fontSize: 20,
        marginBottom: 16
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    startingText: {
        color: '#347EFB',
        fontSize: 20,
        alignSelf: 'center',
    },
    differenceText: {
        color: '#00DCF1',
        fontSize: 40,
        alignSelf: 'center',
    },
    currentText: {
        color: '#347EFB',
        fontSize: 26,
        alignSelf: 'center',
    },
    dash: {
        color: '#DDDEDE',
        width: 120,
        height: 10,
    },
    itemBox: {
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bodyTextStart: {
        color: '#DDDEDE',
        fontSize: 8,
        marginTop: 8
    },
    bodyTextProgress: {
        color: '#DDDEDE',
        fontSize: 8,
    },
    bodyTextCurrent: {
        color: '#DDDEDE',
        fontSize: 8,
        marginTop: 4
    },

    invisible: {
        display: 'none'
    }
})