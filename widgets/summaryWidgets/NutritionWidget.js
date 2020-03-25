import React, { Component } from 'react'
import { StyleSheet, Text,Dimensions,Image,View} from 'react-native'
import { VictoryLine, VictoryChart, VictoryTheme , VictoryBar, VictoryPie,VictoryLabel} from "victory-native"
import * as firebase from "firebase/app"
import {Svg } from 'react-native-svg';
import "firebase/firestore"
import { ScrollView } from 'react-native-gesture-handler'


const { height } = Dimensions.get('window');



export default class NutritionWidget extends Component {

  constructor(props){
      super(props)
      this.state = {
        uid: "",
        usersPlan: "",
        planData: {},
        screenHeight: height,
        dailyDairy: this.props.foodEntry.dairy.portions,
        dailyFats:this.props.foodEntry.fats.portions,
        dailyFruit:this.props.foodEntry.fruit.portions,
        dailyProtein:this.props.foodEntry.protein.portions,
        dailyresVegs:this.props.foodEntry.resVegs.portions,
        dailyCarbs:this.props.foodEntry.simpleCarbs.portions,
        totalDairy:0,
        totalFats:0,
        totalFruit:0,
        totalProtien:0,
        totalresVeg:0,
        totalCarbs:0
}
console.log(this.state.dailyDairy);
console.log(this.state.dailyFats);
    }
  
    onContentSizeChange = (contentWidth, contentHeight) => {
      this.setState({ screenHeight: contentHeight });
    };
  
    async componentDidMount(){
      await this.setUid()
      await this.setUsersPlan()
      await this.setPlanData()
      await this.setMaxWater()
      
  }

  componentDidUpdate(prevProps, prevState){
        if(prevProps.foodEntry !== this.props.foodEntry){
          this.buildPie()
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
    let totalDairy = this.state.planData.portions.dairy.maxPortions
    this.setState({ totalDairy })
    let totalFats = this.state.planData.portions.fats.maxPortions
    this.setState({ totalFats })
    let totalFruit = this.state.planData.portions.fruit.maxPortions
    this.setState({ totalFruit })
    let totalProtien = this.state.planData.portions.protein.maxPortions
    this.setState({ totalProtien })
    let totalresVeg = this.state.planData.portions.resVegs.maxPortions
    this.setState({ totalresVeg })
    let totalCarbs = this.state.planData.portions.simpleCarbs.maxPortions
    this.setState({ totalCarbs })

    console.log(totalDairy);

}

    buildPie = async () => {
      let newUsersdairy = 0
      let newUsersfats = 0
      let newUsersfruit = 0
      let newUsersprotein = 0
      let newUsersresVegs = 0
      let newUserssimpleCarbs = 0

        this.props.foodEntry.forEach((item) => {
          newUsersdairy += item.dairy.portions
          newUsersfats += item.fats.portions
          newUsersfruit += item.fruit.portions
          newUsersprotein += item.protein.portions
          newUsersresVegs += item.resVegs.portions
          newUserssimpleCarbs += item.simpleCarbs.portions
        })

        await this.setState({ 
          dailyDairy: newUsersdairy,
            totalDairy: this.state.planData.portions.dairy.maxPortions * this.props.foodEntry.length,
            dailyFats: newUsersfats,
            totalFats: this.state.planData.portions.fats.maxPortions * this.props.foodEntry.length,
            dailyFruit: newUsersfruit,
            totalFruit: this.state.planData.portions.fruit.maxPortions * this.props.foodEntry.length,
            dailyProtein: newUsersprotein,
            totalProtien: this.state.planData.portions.protein.maxPortions * this.props.foodEntry.length,
            dailyresVegs: newUsersresVegs,
            totalresVeg: this.state.planData.portions.resVegs.maxPortions * this.props.foodEntry.length,
            dailyCarbs: newUserssimpleCarbs,
            totalCarbs: this.state.planData.portions.simpleCarbs.maxPortions * this.props.foodEntry.length,
            
        })
    
  }

   
    render() {
      const scrollEnabled = this.state.screenHeight > height;
      return(
        
         <View style={styles.container}>
      <View style={styles.imageRow1}>
<Svg>
  <VictoryPie 
  
      padAngle={0}
      cornerRadius={2}
      innerRadius={85/2}
      height={500 / 2.5}
      data={[{'x': this.state.dailyDairy, 'y': this.state.dailyDairy}, {'x': (this.state.totalDairy-this.state.dailyTotal), 'y': (this.state.totalDairy-this.state.dailyTotal)},{fill:'EEEEEE'} ]}
      colorScale={["#19B3A6", "#EEEEEE" ]}
      
     />
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={208} y={90}
    text={`dairy`}
    style={{ fontSize: 20, fill:'#EEEEEE'}}/>


 </Svg>   
           
 <Svg>
  <VictoryPie 
  
      padAngle={0}
      cornerRadius={2}
      innerRadius={85/2}
      height={500 / 2.5}
      data={[{'x': this.state.dailyFats, 'y': this.state.dailyFats}, {'x': (this.state.totalFats-this.state.dailyFats), 'y': (this.state.totalFats-this.state.dailyFats)} ]}
      colorScale={["#19B3A6", "#EEEEEE" ]}
     />
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={208} y={90}
    text={`Fats`}
    style={{ fontSize: 20,fill:'#EEEEEE' }}/>
    
 </Svg> 
 <Svg>
  <VictoryPie 
  
      padAngle={0}
      cornerRadius={2}
      innerRadius={85/2}
      height={500 / 2.5}
      data={[{'x': this.state.dailyFruit, 'y': this.state.dailyFruit}, {'x': (this.state.totalFruit-this.state.dailyFruit), 'y': (this.state.totalFruit-this.state.dailyFruit)} ]}
      colorScale={["#19B3A6", "#EEEEEE" ]}
     />
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={208} y={90}
    text={`Fruits`}
    style={{ fontSize: 20,fill:'#EEEEEE' }}/>
 
 </Svg>
 </View>
 <View style={styles.imageRow2}>
 <Svg>
  <VictoryPie 
  
      padAngle={0}
      cornerRadius={2}
      innerRadius={85/2}
      height={500 / 2.5}
      data={[{'x': this.state.dailyProtein, 'y': this.state.dailyProtein}, {'x': (this.state.totalProtien-this.state.dailyProtein), 'y': (this.state.totalProtien-this.state.dailyProtein)} ]}
      colorScale={["#19B3A6", "#EEEEEE" ]}
     />
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={208} y={90}
    text={`Protein`}
    style={{ fontSize: 20,fill:'#EEEEEE' }}/>
    
 </Svg> 
 <Svg>
  <VictoryPie 
  
      padAngle={0}
      cornerRadius={2}
      innerRadius={85/2}
      height={500 / 2.5}
      data={[{'x': this.state.dailyresVegs, 'y': this.state.dailyresVegs}, {'x': (this.state.totalresVeg-this.state.dailyresVegs), 'y': (this.state.totalresVeg-this.state.dailyresVegs)} ]}
      colorScale={["#19B3A6", "#EEEEEE" ]}
     />
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={208} y={90}
    text={`resVegs`}
    style={{ fontSize: 20,fill:'#EEEEEE' }}/>
    
 </Svg> 
 <Svg>
  <VictoryPie 
  
      padAngle={0}
      cornerRadius={2}
      innerRadius={85/2}
      height={500 / 2.5}
      data={[{'x': this.state.dailyCarbs, 'y': this.state.dailyCarbs}, {'x': (this.state.totalCarbs-this.state.dailyCarbs), 'y': (this.state.totalCarbs-this.state.dailyCarbs)} ]}
      colorScale={["#19B3A6", "#EEEEEE" ]}
     />
  <VictoryLabel
    textAnchor="middle" verticalAnchor="middle"
    x={208} y={90}
    text={`Carbs`}
    style={{ fontSize: 20,fill:'#EEEEEE' }}/>
   
 </Svg> 
 </View>
 </View>   

        
      )
    };  
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: '#1C1C1E',
      padding: 16,
      alignSelf: 'stretch',
      marginBottom: 8,
      marginTop: 16
    
      
    },
    image: {
     
      margin:2,
      height: 65,
      width: 48,
      resizeMode: 'cover',
      
      alignItems: 'stretch'
    
  },
  modalSeprateLine:{
    width:'100%',
    height:'2%',
    position:'absolute',
    backgroundColor:'black',
    bottom:0
       },
       imageRow1: {
        flexDirection: "row",
        justifyContent: 'space-around',
        
    },
    imageRow2: {
        flexDirection: "row",
        justifyContent: 'space-around',
        
    },
  });

