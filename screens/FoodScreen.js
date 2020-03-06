import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, Button, ScrollView, Item, SectionList } from 'react-native'
import { List, Checkbox } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as firebase from "firebase/app"
import "firebase/firestore"
let dairyPortions = 0
let restrictedVegPortions = 0
let fruitPortions = 0
let simpleCarbPortions = 0
let proteinPortions = 0
let fatPortions = 0
let freeVegPortions = 0

export default class ProfileScreen extends Component {


  constructor(props) {
    super(props)
    // this.state = {
    //   db: firebase.firestore(),
    //   dairyList: [],
    //   restrictedList: [],
    //   fruitList: [],
    //   simpleCarbList: [],
    //   proteinList: [],
    //   fatsList: [],
    //   freeVegList: []
    // }
    this.state = {
      db: firebase.firestore(),
      expanded: false,
      activeSections: [],
      dairyPortions: 0,
      restrictedVegPortions: 0,
      fruitPortions: 0,
      simpleCarbPortions: 0,
      proteinPortions: 0,
      fatPortions: 0,
      freeVegPortions: 0,
      lists: [
        {
          type: "Dairy",
          list: []
        },
        {
          type: "Restricted Vegetables",
          list: []
        },
        {
          type: "Fruits",
          list: []
        },
        {
          type: "Simple Carbs",
          list: []
        },
        {
          type: "Proteins",
          list: []
        },
        {
          type: "Fats",
          list: []
        },
        {
          type: "Free Vegetables",
          list: []
        }
      ]
    }
  }
  async componentDidMount() {
    this._isMounted = true
    let dairyList = []
    let restrictedList = []
    let fruitList = []
    let simpleCarbList = []
    let proteinList = []
    let fatsList = []
    let freeVegList = []

    await this.state.db.collection("foodList").get().then((querySnapshot) => {
      querySnapshot.forEach((item) => {

        if (item.data().category == "Dairy") {
          dairyList.push(item.data())
        }
        if (item.data().category == "Restricted Vegetables") {
          restrictedList.push(item.data())
        }
        if (item.data().category == "Fruit") {
          fruitList.push(item.data())
        }
        if (item.data().category == "Simple Carbs") {
          simpleCarbList.push(item.data())
        }
        if (item.data().category == "Protein") {
          proteinList.push(item.data())
        }
        if (item.data().category == "Fats") {
          fatsList.push(item.data())
        }
        if (item.data().category == "Free Vegetables") {
          freeVegList.push(item.data())
        }

      })
    }).catch((err) => {
      console.log(err)
    })
    var listArray = [...this.state.lists]
    listArray[0].list = dairyList
    listArray[1].list = restrictedList
    listArray[2].list = fruitList
    listArray[3].list = simpleCarbList
    listArray[4].list = proteinList
    listArray[5].list = fatsList
    listArray[6].list = freeVegList

    this.setState({ lists: listArray })
  }


  _handlePress = (food) =>
    this.setState({
      expanded: !this.state.expanded
    });

  _renderSectionTitle = section => {
    return (

      // console.log((section.type))
      <View style={styles.content}>
        <Text style={styles.content}>{}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>

        <Text style={{ fontSize: 24 }}>{section.type}</Text>
      </View>
    );
  };

  _addPortion = (item) => {
    switch (item) {
      case "Dairy":
        dairyPortions++;
        console.log(item)
        break;
      case "Restricted Vegetables":
        restrictedVegPortions++;
        console.log(item)
        break;
      case "Fruit":
        fruitPortions++;
        console.log(item)
        break;
      case "Simple Carbs":
        simpleCarbPortions++;
        console.log(item)
        break;
      case "Protein":
        proteinPortions++;
        console.log(item)
        break;
      case "Fats":
        fatPortions++;
        console.log(item)
        break;
      case "Free Vegetables":
        freeVegPortions++;
        console.log(item)
        break;

      default:
        break;
    }


  }

  _renderContent = section => {

    return (
      section.list.map((item, key) => (
        <View key={key} style={styles.content}>
          <Text >{item.name}</Text>
          <Button title="Add" onPress={() => this._addPortion(item.category)} ></Button>
        </View>
      ))
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
  render() {
    return (

      <View style={{ margin: 30, width: "auto" }}>
        <Accordion
          sections={this.state.lists}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </View>








      // <View>

      //   <List.Section style={{ marginTop: 30 }} title="Food List">

      //     {this.state.lists.map((item, key) => (
      //       <List.Accordion key={key}
      //         title={item.type}
      //       >
      //         {item.list.map((item, key) => (
      //           <List.Item key={key} title={item.name} />
      //         ))}
      //       </List.Accordion>
      //     ))}
      //   </List.Section>
      // </View>


      //#region failed attempts
      //     {/* <SectionList
      //       sections={[
      //         { title: 'Dairy', data: this.state.lists[0].list },
      //         { title: 'Restricted Vegetable', data: this.state.lists[1].list },
      //         { title: 'Fruits', data: this.state.lists[2].list },
      //         { title: 'Simple Carbs', data: this.state.lists[3].list },
      //         { title: 'Proteins', data: this.state.lists[4].list },
      //         { title: 'Fats', data: this.state.lists[5].list },
      //         { title: 'Free Vegetables', data: this.state.lists[6].list },
      //       ]}
      //       renderItem={({ item }) => <Text style={styles.listItemSub}>{item.name}</Text>}
      //       renderSectionHeader={({ section }) => <Text style={styles.listItemTitle}>{section.title}</Text>}
      //       keyExtractor={(item, index) => index}
      //     /> */}








      // {/* <Text style={styles.listItemTitle}>Dairy</Text>

      //     <FlatList
      //       data={this.state.lists[0].list}
      //       renderItem={({ item }) => (
      //         <Button title={item.name} style={styles.listItemSub}></Button>
      //       )}
      //     /> */}


      // {/* 
      //     <ScrollView style={{ alignSelf: 'stretch' }}>
      //       {
      //         this.state.lists
      //           ? this.state.lists.map((param, i) => {
      //             return (
      //               <DropDownItem
      //                 key={i}
      //                 style={styles.dropDownItem}
      //                 contentVisible={false}
      //                 header={
      //                   <View>
      //                     <Text style={{
      //                       fontSize: 16,
      //                       color: 'blue',
      //                     }}>{param.type}</Text>
      //                   </View>
      //                 }
      //               >
      //                 {param.list.map((item, key) => (
      //                   <Text key={key}>{item.name}</Text>)
      //                 )}



      //               </DropDownItem>
      //             );
      //           })
      //           : null
      //       }
      //       <View style={{ height: 96 }} />
      //     </ScrollView> */}
      //#endregion

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 20

  },
  screenTitle: {
    fontSize: 45,
    fontWeight: "bold"
  },
  listContainer: {
    paddingTop: 20
  },
  listItemTitle: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "500"
  },
  listItemSub: {
    color: "#505050",
    paddingTop: 3
  }
});