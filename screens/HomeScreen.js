import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import WelcomeWidget from '../widgets/WelcomeWidget'
import DailyLogWidget from '../widgets/DailyLogWidget'
import FoodTrackingWidget from '../widgets/FoodTrackingWidget'
import WaterTrackingWidget from '../widgets/WaterTrackingWidget'
import SleepTrackingWidget from '../widgets/SleepTrackingWidget'  //imports all needed widgets and components
import ActivityTrackingWidget from '../widgets/ActivityTrackingWidget'
import WeightWidget from '../widgets/WeightWidget'
import MoodTrackingWidget from '../widgets/MoodTrackingWidget'


export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loadingVisible: true,
      mountedComponents: 0,
      displayStyle: styles.loading
    }
  }

  handleMount = () => {
    let num = this.state.mountedComponents
    num += 1
    this.setState({ mountedComponents: num })


    if(num == 6) { // this number is based on how many widgets are mounting - Activity and Sleep reset the count to 0 causing the loading state to stay. using 6 instead of 8 is a hacky fix 
      this.setState({ 
        loadingVisible: false,
        displayStyle: styles.invisible
      })
    }
  }

  render() {
      return (
        <>
          <View style={this.state.displayStyle} >
            <MaterialIndicator color='#347EFB' size={50} />
          </View>

          <ScrollView>
            <View style={styles.container} >
              <WelcomeWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
              <DailyLogWidget mounted={this.handleMount} visible={!this.state.loadingVisible} navProps={this.props.navigation} />
              <FoodTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
              <WaterTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
              <WeightWidget mounted={this.handleMount} visible={!this.state.loadingVisible} navProp={this.props.navigation} />
              <SleepTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} /> 
              <ActivityTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} /> 
              <MoodTrackingWidget mounted={this.handleMount} visible={!this.state.loadingVisible} />
            </View>
          </ScrollView>
        </>
      )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    height: '100%',
    justifyContent: 'center'
  },

  invisible: {
    display: 'none'
  }
})