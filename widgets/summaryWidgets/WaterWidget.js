import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, YellowBox,Dimensions } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { LinearGradient } from 'expo-linear-gradient';

export default class WaterWidget extends Component {

    constructor(props){
        super(props)
        this.state = {
            uid: "",
            usersPlan: "",
            planData: {},
            usersWater: this.props.waterEntry.portions,
            maxWater: 0,
            percentage:0
        }
    }

    async componentDidMount(){
        await this.setUid()
        await this.setUsersPlan()
        await this.setPlanData()
        await this.setMaxWater()
        await this.setPercentage()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.waterEntry !== this.props.waterEntry){
            this.buildUpdateWaterProg()
        }
    }

    setUid = async () => {
        let uid = await firebase.auth().currentUser.uid
        await this.setState({ uid })
    }
  
    setUsersPlan = async () => {
        let usersPlan = await firebase.firestore().collection("userData").doc(this.state.uid).get().then((doc) => { return doc.data().plan })
        this.setState({ usersPlan })
    }

    setPlanData = async () => {
        await firebase.firestore().collection("plans").doc(this.state.usersPlan).get().then((doc) => {
            this.setState({ planData: doc.data() })
        })
    }

    setMaxWater = () => {
        let maxWater = this.state.planData.water.maxPortions
        this.setState({ maxWater })
    }

    setPercentage=()=>{
        let percentage = (this.state.usersWater / this.state.maxWater) * 100

        this.setState({
            percentage: percentage
        })
    }

    buildUpdateWaterProg = async () => {
        let newUsersWater = 0

        this.props.waterEntry.forEach((item) => {
            newUsersWater += item.portions
        })

        await this.setState({ 
            usersWater: newUsersWater,
            maxWater: this.state.planData.water.maxPortions * this.props.waterEntry.length
        })

        this.setPercentage()
    }

    render(){
        const barWidth = Dimensions.get('screen').width - 130;

        const progressCustomStyles = {
            backgroundColor: '#347EFB', 
            borderWidth: 0,
            borderRadius: 50
          };
        
        return(
            <View style={styles.container}>
                 <View>
                    <Text  style={styles.title}>Water</Text>
                </View>

                <View style={styles.barContainer}>
                    
                    <View style={styles.barBackgroundColour}>
                    <ProgressBarAnimated
                    {...progressCustomStyles}
                    width={barWidth}
                    value={this.state.percentage}
                    backgroundColorOnComplete="#1C1C1E"
                    height={16}/>
                    </View>
                    <Text style={styles.waterText}>{this.state.usersWater} of {this.state.maxWater} cups</Text>
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
        marginTop: 16
    },
    title:{
        color:'#FAFAFA',
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 16
    },
    barContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barBackgroundColour:{
        backgroundColor: '#DDDEDE',
        borderRadius: 20,
        borderWidth: 0,
    },
    waterText:{
        color:'#DDDEDE',
        flex: 1,
        textAlign: 'right',
       
    }
})
