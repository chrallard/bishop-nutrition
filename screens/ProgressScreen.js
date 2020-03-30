import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView, Image, Modal, TouchableOpacity, TextInput } from 'react-native'
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'

import { DataContext } from '../contexts/DataContext'


export default class ProgressScreen extends Component {

    static contextType = DataContext

    constructor(props) {
        super(props)
        this.state = {
            weightEntry: [],
            data: [],
            timeStamp: [],
            startingWeight: [],
            selectedIndex: 0,
            time: [],
            measurements: [],
            xData: [],
            yData: [],

            
            

            showWeightAdd: false,
            showMeasurementAdd: false,
            chest: 0,
            hips: 0,
            waist: 0,
            weight: 0


        }
        this.addModal = this.addModal.bind(this);
    }

    async componentDidMount() {
        await this.list()
        await this.time()
        await this.startingWeight()
        await this.getTime()
        await this.getValues()
        await this.xData()
        await this.yData()

         console.log(this.state.xData)
        // console.log(this.state.yData)
    }

    handleIndexChange = async (index) => {
        this.setState({ selectedIndex: index })

    }

    xData = async() => {

        let bodyTrackingData = this.context.bodyTrackingData
        
            let xData = []
            bodyTrackingData.forEach((doc) => {

                let dt = new Date(doc.timeStamp)
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                const date = dt.getDate()
                const Month = months[dt.getMonth()]
                let xValue = `${Month} ${date}`

                xData.unshift(xValue)
            })
            this.setState({xData}) 
        
    }

    yData = async() => {

            let yData = []
            this.context.bodyTrackingData.forEach((doc) => {
                let yValue = doc.weightEntry

                yData.push(yValue)
            })
            this.setState({yData}) 
    }


    addModal = () => {
        this.refs.addModal.showModal();
    }

    getTime = async () => {

            let time = []
            this.context.bodyTrackingData.forEach((doc) => {
                let D = new Date(doc.timeStamp)
                const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                const datee = D.getDate()
                const month = Months[D.getMonth()]
                const year = D.getFullYear()

                let obj = {
                    time: `${month} ${datee}, ${year}`
                }
                time.push(obj)

                this.setState({ time })
            })

    }

    getValues = async () => {

        let uid = await firebase.auth().currentUser.uid
        await firebase.firestore().collection("userData").doc(uid).collection("bodyTracking").limit(5).get().then((querySnapshot) => {

            let measurements = []
            querySnapshot.forEach((doc) => {

                let d = new Date(doc.data().timeStamp)
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                const date = d.getDate()
                const Month = months[d.getMonth()]
                const Year = d.getFullYear()
                let obj = {

                    date: `${Month} ${date}, ${Year}`,
                    timeStamp: doc.data().timeStamp,
                    chest: doc.data().chestEntry,
                    waist: doc.data().waistEntry,
                    hips: doc.data().hipsEntry
                }
                measurements.push(obj)

                this.setState({ measurements })
            })
        })


    }


    list = async () => {

            let weightEntry = []

            let nullChecker = []
            let lastWeightEntry = ""

            this.context.bodyTrackingData.forEach((doc) => {
                nullChecker.unshift(doc)
            })

            nullChecker.forEach((doc) => {
                if(doc.weightEntry !== null){
                    lastWeightEntry = doc.weightEntry
                }
            })

            this.context.bodyTrackingData.forEach((doc) => {

                let d = new Date(doc.timeStamp)
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                const date = d.getDate()
                const Month = months[d.getMonth()]
                const Year = d.getFullYear()
                let obj = {
                    date: `${Month} ${date}, ${Year}`,
                    timeStamp: doc.timeStamp,
                    weightEntry: doc.weightEntry
                }

                if(doc.weightEntry == null){
                    obj.weightEntry = lastWeightEntry
                }

                weightEntry.push(obj)

                this.setState({ weightEntry })
            })

    }

    startingWeight = async () => {
        this.setState({ startingWeight: this.context.userInfo.startingWeight })
    }

    time = async () => {

    


            let timeStamp = []

            this.context.bodyTrackingData.forEach((doc) => {

                let d = new Date(doc.timeStamp)
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                const date = d.getDate()
                const Month = months[d.getMonth()]
                const Year = d.getFullYear()
                let obj = {
                    timeStamp: `${Month} ${date}, ${Year}`
                }

                timeStamp.unshift(obj)
                this.setState({ timeStamp })
            })

    }


    _renderWeightContent = () => {
        this.state.weightEntry.sort(function (a, b) { return b.timeStamp - a.timeStamp })
        return (
            this.state.weightEntry.map((item, key) => (
                <View key={key}>
                    <Text style={weight.date}>{item.date}</Text>
                    <View style={weight.container}>
                        <View style={weight.progressContainer}>
                            <Text style={weight.progressText}>Progress </Text>
                            <Text style={weight.progressDifference}>-{this.state.startingWeight - item.weightEntry}lbs</Text>
                        </View>
                        <Text style={weight.weight}>{item.weightEntry} </Text>
                    </View>
                </View>
            ))
        )
    }

    _renderMeasuermentsContent = () => {
        this.state.measurements.sort(function (a, b) { return b.timeStamp - a.timeStamp })
        return (
            this.state.measurements.map((item, key) => (
                <View key={key}>
                    <Text style={measurement.date}>{item.date}</Text>

                    <View style={measurement.container}>

                        <View style={measurement.entryContainer}>
                            <Text style={measurement.content}>Chest: </Text>
                            <Text style={measurement.content}>{item.chest}</Text>
                        </View>

                        <View style={measurement.entryContainer}>
                            <Text style={measurement.content}>Waist: </Text>
                            <Text style={measurement.content}>{item.waist}</Text>
                        </View>

                        <View style={measurement.entryContainer}>
                            <Text style={measurement.content}>Hips: </Text>
                            <Text style={measurement.content}>{item.hips}</Text>
                        </View>

                    </View>
                </View>
            ))
        )

    }

    render() {
        
        //this is how to use the segmented tabs, anything you want to display on the weight screen goes in the if (this.state.selectedIndex == 0) { return,
        //anything you want on the progress bar goes in the  else if (this.state.selectedIndex == 1) {
           
        if (this.state.selectedIndex == 0) {

        
            const axesSvg = { fontSize: 10, fill: '#F3F3F3' };
            const verticalContentInset = { top: 10, bottom: 10 }
            const xAxisHeight = 30
        

            return (
                //this is where you build the weight screen
                <>
                    <ScrollView>
                        <View style={styles.container}  >

                            <View style={{ height: 200, padding: 10, flexDirection: 'row', backgroundColor: '#347EFB' }}>

                                <YAxis
                                    data={this.state.yData}
                                    style={{ marginBottom: xAxisHeight }}
                                    contentInset={verticalContentInset}
                                    svg={axesSvg}
                                />

                                <View style={{ flex: 1, marginLeft: 10, }}>
                                    <LineChart
                                        style={{ flex: 1 }}
                                        data={this.state.yData}
                                        contentInset={verticalContentInset}
                                        svg={{ 
                                            stroke: '#F3F3F3',
                                            strokeWidth: 3,
            
                                        }}
                                    >

                                        <Grid style={{ color: 'white', borderBottomWidth: 50, borderColor: 'red' }} />

                                    </LineChart>

                                    <XAxis
                                        data={this.state.yData} 
                                        style={{ marginHorizontal: 10, height: xAxisHeight, width: '100%'  }}
                                        formatLabel={(value, index) => this.state.xData[index]}
                                        contentInset={{ left: 20, right: 20 }}
                                        svg={{rotation: 30, fontSize: 8, fill: '#F3F3F3', y: 10 }}
                                    />
                                </View>

                            </View>

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

                            {this._renderWeightContent()}

                            <Modal visible={this.state.showWeightAdd} animationType={'slide'} transparent={true}>

                                <View style={styles.modalStyle}>
                                    <View style={styles.modalHeader}>
                                        <TouchableOpacity onPress={() => { this.setState({ showMeasurementAdd: false }) }}>
                                            <Text style={styles.modalNav}>Back</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.modalTitle}>Weight</Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ showWeightAdd: false })
                                                console.log(this.state.weight)
                                                let timeStamp = Date.now()
                                                console.log(timeStamp)
                                                // this.updateDb()
                                                //this onpress will be what pushs to the db
                                            }}>
                                            <Text style={styles.modalNav}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Image source={require('../assets/scale.png')} style={styles.scaleImage} />
                                    </View>
                                    <View>
                                        <TextInput style={styles.weightInput}
                                            underlineColorAndroid="transparent"
                                            multiline={false}
                                            numberOfLines={1}
                                            placeholder="Current Weight"
                                            placeholderTextColor='#DDDEDE'
                                            fontWeight='600'
                                            autoCapitalize="none"
                                            onChangeText={(text) => this.setState({ weight: text })}
                                            value={this.state.Text} />

                                    </View>
                                </View>
                            </Modal>
                        </View>


                    </ScrollView>

                    <TouchableOpacity title="Add" onPress={() => {
                        this.setState({ showWeightAdd: true })
                    }} style={styles.addBtn} >
                        <Image source={require('../assets/addHalfCircle.png')} style={styles.addBtnSize}/>
                    </TouchableOpacity>

                </>
             
            )

        }
        else if (this.state.selectedIndex == 1) {
            return (

                <>
                    <ScrollView>
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

                            {this._renderMeasuermentsContent()}

                            <Modal visible={this.state.showMeasurementAdd} animationType={'slide'} transparent={true}>

                                <View style={styles.modalStyle}>
                                    <View style={styles.modalHeader}>
                                        <TouchableOpacity onPress={() => { this.setState({ showMeasurementAdd: false }) }}>
                                            <Text style={styles.modalNav}>Back</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.modalTitle}>Measurement</Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ showMeasurementAdd: false })
                                                console.log(`Chest: ${this.state.chest}, Waist: ${this.state.waist}, Hips: ${this.state.hips}`)
                                                let timeStamp = Date.now()
                                                console.log(timeStamp)


                                                // this.updateDb()
                                                //this onpress will be what pushs to the db
                                            }}>
                                            <Text style={styles.modalNav}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.measurementModalLayout}>
                                            <Image source={require('../assets/body.png')} style={styles.bodyImage} />
                                        
                                        <View style={styles.measurementInputLayout}>
                                            <TextInput style={styles.measurementInput}
                                                underlineColorAndroid="transparent"
                                                multiline={false}
                                                numberOfLines={1}
                                                placeholder="Chest"
                                                placeholderTextColor='#DDDEDE'
                                                fontWeight='600'
                                                autoCapitalize="none"
                                                onChangeText={(text) => this.setState({ chest: text })}
                                                value={this.state.Text} />
                                            <TextInput style={styles.measurementInput}
                                                underlineColorAndroid="transparent"
                                                multiline={false}
                                                numberOfLines={1}
                                                placeholder="Waist"
                                                placeholderTextColor='#DDDEDE'
                                                fontWeight='600'
                                                autoCapitalize="none"
                                                onChangeText={(text) => this.setState({ waist: text })}
                                                value={this.state.Text} />
                                            <TextInput style={styles.measurementInput}
                                                underlineColorAndroid="transparent"
                                                multiline={false}
                                                numberOfLines={1}
                                                placeholder="Hips"
                                                placeholderTextColor='#DDDEDE'
                                                fontWeight='600'
                                                autoCapitalize="none"
                                                onChangeText={(text) => this.setState({ hips: text })}
                                                value={this.state.Text} />
                                            </View>
                                    </View>
                                </View>
                            </Modal>

                        </View>
                    </ScrollView>

                    <TouchableOpacity title="Add" onPress={() => {
                        this.setState({ showMeasurementAdd: true })
                    }} style={styles.addBtn}>
                        <Image source={require('../assets/addHalfCircle.png')} style={styles.addBtnSize}/>
                    </TouchableOpacity>
                </>
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
        backgroundColor: '#000000',
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex'
    },
    modalNoteInput: {
        height: 200,
        backgroundColor: '#2C2C2E',
        borderRadius: 8,
        color: '#DDDEDE'
    },
    modalStyle: {
        height: '100%',
        backgroundColor: '#0D0D0D',
        marginTop: 88,
        borderRadius: 15,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 16
    },
    modalTitle: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '700',
    },
    modalNav: {
        fontSize: 17,
        color: '#347EFB',
    },
    measurementModalLayout:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    modalInput: {
        height: 26,
        fontSize: 20,
        color: '#DDDEDE',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#DDDEDE'
    },
    weightInput:{
        height: 30,
        width: 245,
        marginTop: 45,
        fontSize: 24,
        color: '#DDDEDE',
        borderBottomWidth: 1,
        borderColor: '#DDDEDE',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    measurementInput:{
        height: 26,
        width: 135,
        fontSize: 22,
        color: '#DDDEDE',
        marginBottom: 45,
        borderBottomWidth: 1,
        borderColor: '#DDDEDE'
    },
    measurementInputLayout:{
        justifyContent: 'center',
        alignContent: 'center'
    },
    modalSeprateLine: {
        width: '100%',
        height: '2%',
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 0
    },
    scaleImage: {
        height: 176,
        width: 184,
        marginTop: 45,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    bodyImage:{
        height: 480,
        width: 146,
        marginTop: '20%',
        marginRight: 32
    },

    addBtn:{
        alignSelf: 'center',
        alignItems: 'center',                                
        position: 'absolute',
        top: '93%'
    },
    addBtnSize:{
        height: 40,
        resizeMode: 'contain'
    }
})

const weight = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    date: {
        color: '#DDDEDE',
        fontSize: 20,
        marginTop: 8
    },
    weight: {
        fontSize: 22,
        color: '#347EFB',
    },

    progressContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    progressText: {
        color: '#DDDEDE',
        opacity: 0.6
    },
    progressDifference: {
        color: '#347EFB'
    }

})

const measurement = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 8,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    entryContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    date: {
        color: '#DDDEDE',
        fontSize: 20,
        marginTop: 8,
        marginBottom: 8
    },
    content: {
        color: '#347EFB',
        fontSize: 16
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

