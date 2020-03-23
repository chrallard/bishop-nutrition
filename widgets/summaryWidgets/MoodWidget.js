import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox, Image } from 'react-native'

export default class MoodWidget extends Component {

    constructor(props){
        super(props)
        this.state = {
            moodEmoji: require('../../assets/smile_1.png'),
            diary: this.props.moodEntry.diary,
            visible: true
        }
    }

    componentDidMount(){
       this.buildMood()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.moodEntry !== this.props.moodEntry){
            if(this.props.moodEntry == null){
                this.setState({ visible: false })
            }else{
                this.setState({ visible: true })
            }
        }
    }

    buildMood = () => {

        switch(this.props.moodEntry.mood) {
            case 1:
                this.setState({ moodEmoji: require('../../assets/smile_1.png') })
                break

            case 2:
                this.setState({ moodEmoji: require('../../assets/smile_2.png') })
                break

            case 3:
                this.setState({ moodEmoji: require('../../assets/smile_3.png') })
                break

            case 4:
                this.setState({ moodEmoji: require('../../assets/smile_4.png') })
                break

            case 5:
                this.setState({ moodEmoji: require('../../assets/smile_5.png') })
                break

            case 6:
                this.setState({ moodEmoji: require('../../assets/smile_6.png') })
                break

            default:
        }
    }

    render(){
        if(this.state.visible){
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>Mood</Text>

                    <View style={styles.moodInfoLayout}>
                        <Image source={this.state.moodEmoji} style={styles.moodIcon} />
                        <Text style={styles.noteText}>{this.state.diary}</Text>
                    </View>
                </View>
            )
        }else{
            return(<></>)
        }
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
    moodIcon:{
        resizeMode: 'cover',
        height: 66,
        width: 66,
        marginRight: 8
    },
    moodInfoLayout:{
        flexDirection: 'row',
        marginTop: 8
    },
    noteText:{
        color:'#DDDEDE',
        fontSize: 13,
        justifyContent: 'center',
        alignSelf:'center',
        flex: 1,
        flexWrap: 'wrap'
    }
})