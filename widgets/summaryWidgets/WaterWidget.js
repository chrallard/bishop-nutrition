import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox, Dimensions } from 'react-native'//imports all required components and libraries
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { DataContext } from '../../contexts/DataContext'


export default class WaterWidget extends Component {

    static contextType = DataContext

    constructor(props) {
        super(props)
        this.state = {
            usersWater: this.props.waterEntry.portions,
            maxWater: 0,
            percentage: 0
        }
    }

    async componentDidMount() {
        await this.setMaxWater()
        await this.setPercentage()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.waterEntry !== this.props.waterEntry) {
            this.buildUpdateWaterProg()
        }
    }

    setMaxWater = () => { //sets the max water based on the plan data
        let maxWater = this.context.planData.water.maxPortions
        this.setState({ maxWater })
    }

    setPercentage = () => { //sets the percentage of water
        let percentage = (this.state.usersWater / this.state.maxWater) * 100

        this.setState({
            percentage: percentage
        })
    }

    buildUpdateWaterProg = async () => { //
        let newUsersWater = 0

        this.props.waterEntry.forEach((item) => {
            newUsersWater += item.portions
        })

        await this.setState({
            usersWater: newUsersWater,
            maxWater: this.context.planData.water.maxPortions * this.props.waterEntry.length
        })

        this.setPercentage()
    }

    render(){
        const barWidth = Dimensions.get('screen').width - 140;

        const progressCustomStyles = {
            backgroundColor: '#347EFB',
            borderWidth: 0,
            borderRadius: 50
        };

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Water</Text>
                </View>

                <View style={styles.barContainer}>

                    <View style={styles.barBackgroundColour}>
                        <ProgressBarAnimated
                            {...progressCustomStyles}
                            width={barWidth}
                            value={this.state.percentage}
                            height={16} />
                    </View>
                    <Text style={styles.waterText}>{this.state.usersWater} of {this.state.maxWater} cups</Text>
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
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 16
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barBackgroundColour: {
        backgroundColor: '#DDDEDE',
        borderRadius: 20,
        borderWidth: 0,
    },
    waterText: {
        color: '#DDDEDE',
        flex: 1,
        textAlign: 'right',

    }
})
