import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import SegmentedControlTab from "react-native-segmented-control-tab";
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'



export default class ProgressScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            weightEntry: [],
            data: [],
            timeStamp: [],
            startingWeight: [],
            selectedIndex: 0,
            time: [],
            chest : [],
            waist : [],
            hips : []
        }
    }

    async componentDidMount() {
        await this.list()
        await this.time()
        await this.startingWeight()
        // await this.progress()
        await this.getTime()
        await this.getValues()

    }

    handleIndexChange = async (index) => {
        console.log(index + " HI")
        this.setState({ selectedIndex: index })



    }

    getTime = async () => {
       // if (index == 1) {
            let uid = await firebase.auth().currentUser.uid
            await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").orderBy("timeStamp", "desc").limit(5).get().then((querySnapshot) => {
                let time = []
                querySnapshot.forEach((doc) => {
                    let D = new Date(doc.data().timeStamp)
                    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                    const datee = D.getDate()
                    const month = Months[D.getMonth()]
                    const year = D.getFullYear()

                    let obj = {
                        time: `${month} ${datee}, ${year}`
                    }
                    time.push(obj)
                    //console.log(obj)
                    this.setState({ time })
                })
               
            })
       // }
      
       
        
    }

    getValues = async() => {

        let uid = await firebase.auth().currentUser.uid
        await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").limit(5).get().then((querySnapshot) => {
           
            let chest = []
            let waist = []
            let hips = []
            querySnapshot.forEach((doc) => {
                let obj = {
                   
                    chest : doc.data().chestEntry,
                    waist: doc.data().waistEntry,
                    hips: doc.data().hipsEntry
                }
               
                chest.push(obj)
                waist.push(obj)
                hips.push(obj)
                console.log(obj)
               
                this.setState({chest})
                this.setState({waist})
                this.setState({hips})
            })
        })


    }


    list = async () => {

        let uid = await firebase.auth().currentUser.uid


        await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").orderBy("weightEntry", "desc").limit(17).get().then((doc) => {

            let weightEntry = []
            doc.forEach((doc) => {
                let obj = {
                    weightEntry: doc.data().weightEntry
                }
                weightEntry.push(obj)
                //console.log(obj)

                this.setState({ weightEntry })
            })


        })


    }

    startingWeight = async () => {

        let uid = await firebase.auth().currentUser.uid

        let sw = await firebase.firestore().collection("userData").doc(uid).get().then((doc) => {
            return doc.data().startingWeight
        })
        this.setState({ startingWeight: sw })

    }

    // progress = async() => {
    //     let uid = await firebase.auth().currentUser.uid

    //      await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").orderBy("weightEntry", "desc").limit(17).get().then((querySnapshot) => {


    //                 let progress = []

    //                 querySnapshot.forEach((doc) => {
    //                     let Obj = {
    //                         progress: (doc.data().startingWeight) - ((doc.data().weightEntry))
    //                     }
    //                     progress.push(Obj)
    //                    // console.log(Obj)
    //                     this.setState({progress})
    //                 })

    //         })

    // }

    time = async () => {

        let uid = await firebase.auth().currentUser.uid

        await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").orderBy("timeStamp", "asc").limit(17).get().then((querySnapshot) => {


            let timeStamp = []

            querySnapshot.forEach((doc) => {

                let d = new Date(doc.data().timeStamp)
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                const date = d.getDate()
                const Month = months[d.getMonth()]
                const Year = d.getFullYear()
                let obj = {
                    timeStamp: `${Month} ${date}, ${Year}`
                }

                timeStamp.push(obj)
                //console.log(obj)
                this.setState({ timeStamp })
            })
        })

    }
    render() {
        //this is how to use the segmented tabs, anything you want to display on the weight screen goes in the if (this.state.selectedIndex == 0) { return,
        //anything you want on the progress bar goes in the  else if (this.state.selectedIndex == 1) {

        if (this.state.selectedIndex == 0) {
            return (
                //this is where you build the weight screen
                <View style={styles.container}  >

                    <SegmentedControlTab
                        values={["Weight", "Measurement"]}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}

                        allowFontScaling={false}
                        tabsContainerStyle={segmented.tabsContainerStyle}
                        tabStyle={segmented.tabStyle}
                        firstTabStyle={segmented.firstTabStyle}
                        lastTabStyle={segmented.lastTabStyle}
                        tabTextStyle={segmented.tabTextStyle}
                        activeTabStyle={segmented.activeTabStyle}
                        activeTabTextStyle={segmented.activeTabTextStyle}
                    />


                    <FlatList

                        data={this.state.weightEntry}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => <Text>{item.weightEntry}</Text>}


                    />

                    <FlatList

                        data={this.state.timeStamp}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => <Text>{item.timeStamp}</Text>}
                    />


                </View>

            )

        }
        else if (this.state.selectedIndex == 1) {
            return (
                //this is where you build the measurements screen
                <View style={styles.container}  >

                    <SegmentedControlTab
                        values={["Weight", "Measurement"]}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}

                        allowFontScaling={false}
                        tabsContainerStyle={segmented.tabsContainerStyle}
                        tabStyle={segmented.tabStyle}
                        firstTabStyle={segmented.firstTabStyle}
                        lastTabStyle={segmented.lastTabStyle}
                        tabTextStyle={segmented.tabTextStyle}
                        activeTabStyle={segmented.activeTabStyle}
                        activeTabTextStyle={segmented.activeTabTextStyle}
                    />

                    <FlatList

                    data={this.state.time}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => <Text>{item.time}</Text>}


                    />
                    
                     <FlatList

                        data={this.state.chest}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => <Text>Chest: {item.chest}</Text>}
                        />

                    <FlatList

                    data={this.state.waist}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => <Text>Waist:{item.waist}</Text>}
                    />

                    <FlatList

                    data={this.state.hips}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => <Text>Hips:{item.hips}</Text>}
                    />

                </View>

            )
        }
        else {
            return (
                <View>
                    <Text>Error</Text>
                </View>
            )
        }


    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginBottom: 20,
        marginTop: 20
    },


})


//Segmented controls DONE******
const segmented = StyleSheet.create({
    tabsContainerStyle: {
        width: 250,
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16,
      },
      tabStyle: {
        borderColor: '#636366',
        backgroundColor: '#1C1C1E'
      },
      tabTextStyle: {
        color: '#DDDEDE'
      },
      activeTabStyle: {
        backgroundColor: '#636366',
      },
      activeTabTextStyle: {
        color: '#DDDEDE'
      }
})
