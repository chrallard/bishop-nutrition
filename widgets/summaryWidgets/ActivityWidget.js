import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox } from 'react-native'//imports all required components and libraries

export default class ActivityWidget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cardio: 0,//initialized state variables
            strength: 0,
            yoga: 0,
            other: 0
        }
    }

    componentDidMount() {
        this.buildExercise() //pulls all excercise information from database
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.exerciseEntry !== this.props.exerciseEntry) {
            this.buildUpdatedExercise()
        }
    }

    buildExercise = () => {
        switch (this.props.exerciseEntry.type) {
            case "Cardio":
                this.setState({ cardio: this.props.exerciseEntry.durationMins }) //checks the duration of each workout and sets them accordingly
                break

            case "Strength Training":
                this.setState({ strength: this.props.exerciseEntry.durationMins })
                break

            case "Yoga":
                this.setState({ yoga: this.props.exerciseEntry.durationMins })
                break

            case "Other":
                this.setState({ other: this.props.exerciseEntry.durationMins })
                break

            default:
        }
    }

    buildUpdatedExercise = () => {
        let totalCardio = 0
        let totalStrength = 0
        let totalYoga = 0
        let totalOther = 0

        this.props.exerciseEntry.forEach((item) => {
            if (item.durationMins != null) {
                switch (item.type) {
                    case "Cardio":
                        totalCardio += item.durationMins
                        break

                    case "Strength Training":
                        totalStrength += item.durationMins
                        break

                    case "Yoga":
                        totalYoga += item.durationMins
                        break

                    case "Other":
                        totalOther += item.durationMins
                        break

                    default:
                }
            }
        })

        this.setState({
            cardio: totalCardio,
            strength: totalStrength,
            yoga: totalYoga,
            other: totalOther
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Activity</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoLoayout}>
                        <Text style={styles.amountText}>{this.state.cardio}</Text>
                        <Text style={styles.titleText}>min of cardio</Text>

                        <Text style={styles.amountText}>{this.state.strength}</Text>
                        <Text style={styles.titleText}>min of strength</Text>
                    </View>

                    <View>
                        <Text style={styles.amountText}>{this.state.yoga}</Text>
                        <Text style={styles.titleText}>min of yoga</Text>

                        <Text style={styles.amountText}>{this.state.other}</Text>
                        <Text style={styles.titleText}>min of other</Text>
                    </View>
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
        marginTop: 16
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
        marginRight: 40,
        marginLeft: 40
    },
    infoLoayout: {

    },
    title: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600'
    },
    titleText: {
        flexDirection: 'column',
        color: '#FAFAFA',
        fontSize: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 8
    },
    amountText: {
        color: '#347EFB',
        fontSize: 40,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})