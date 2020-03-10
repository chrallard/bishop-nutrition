import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, Button, ScrollView, Item, SectionList, TouchableOpacity, Image } from 'react-native'
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

    this.state = {
      db: firebase.firestore(),
      expanded: false,
      activeSections: [],
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

  // _renderSectionTitle = section => {
  //   return (

  //     // console.log((section.type))
  //     <View style={styles.content}>
  //       <Text /*style={styles.content}*/>{}</Text>
  //     </View>
  //   );
  // };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.listItemTitle}>{section.type}</Text>
      </View>
    );
  };

  _renderContent = section => {

    return (
      section.list.map((item, key) => (
        <View key={key} style={styles.foodItems}>
          <Text style={styles.content}>{item.name}</Text>
          <View style={styles.foodItemIcons}>
          <TouchableOpacity onPress={() => this._addPortion(item.category)} style={styles.foodItemIcons}>
            {item.favourite ? (
              <Image style={styles.foodItemIcons}
                style={{ width: 15, height: 15}}
                source={require('../assets/star_Selected.png')}
              />
            ) : (
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require('../assets/star_NotSelected.png')}
                />
              )}

          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._addPortion(item.category)} style={{ paddingLeft: 8, paddingRight: 8}}>
            <Image
              style={{ width: 15, height: 15 }}
              source={require('../assets/add_Circle.png')}
            />
          </TouchableOpacity>
          </View>
        </View>
      ))
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
  render() {
    return (

      <View style={{ marginTop: 100, backgroundColor: '#000000' }}>
        <Accordion style={styles.listContainer}
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
  foodItems: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 14,
    borderBottomColor: '#404043',
    borderBottomWidth: .5,
    borderBottomStartRadius: 16
  },
  foodItemIcons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: "flex-end"
  },
  content: {
    backgroundColor: '#1C1C1E',
    color: '#F3F3F3'
  },
  screenTitle: {
    fontSize: 45,
    fontWeight: "bold"
  },
  listContainer: {
    backgroundColor: '#1C1C1E'
  },
  listItemTitle: {
    marginTop: 16,
    height: 43,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 17,
    color: '#F3F3F3',
    backgroundColor: '#1C1C1E'
  },
  listItemSub: {
    color: "#505050",
    paddingTop: 3
  }
});