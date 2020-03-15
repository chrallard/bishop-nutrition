import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, Button, ScrollView, Item, SectionList, TouchableOpacity, Image } from 'react-native'
import { List, Checkbox } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { SearchBar } from 'react-native-elements';
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
let str = "hi"




export default class ProfileScreen extends Component {


  constructor(props) {
    super(props)

    this.state = {
      db: firebase.firestore(),
      expanded: false,
      activeSections: [],
      search: '',
      searchActive: false,
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
      ],
      searchLists: [
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

    await this.state.db.collection("foodList").doc("allFood").get().then((doc) => {
      Object.values(doc.data()).forEach((item) => { //only changed this line, and removed .data() after each 'item'

        if (item.category == "Dairy") {
          dairyList.push(item)
        }
        if (item.category == "Restricted Vegetables") {
          restrictedList.push(item)
        }
        if (item.category == "Fruit") {
          fruitList.push(item)
        }
        if (item.category == "Simple Carbs") {
          simpleCarbList.push(item)
        }
        if (item.category == "Protein") {
          proteinList.push(item)
        }
        if (item.category == "Fats") {
          fatsList.push(item)
        }
        if (item.category == "Free Vegetables") {
          freeVegList.push(item)
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

  updateSearch = search => {
    let lists = [
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

    if (search != "") {
      this.setState({ searchActive: true })

    }
    else {
      this.setState({ searchActive: false })

    }
    this.state.lists[0].list.forEach(element => {
      if (element.name.toLowerCase().includes(search.toLowerCase()) && search != "") {
        // console.log(element)
        lists[0].list.push(element)
      }
    });
    this.state.lists[1].list.forEach(element => {
      if (element.name.toLowerCase().includes(search.toLowerCase()) && search != "") {
        // console.log(element)
        lists[1].list.push(element)
      }
    });

    this.state.lists[2].list.forEach(element => {
      if (element.name.toLowerCase().includes(search.toLowerCase()) && search != "") {
        // console.log(element)
        lists[2].list.push(element)
      }
    });
    this.state.lists[3].list.forEach(element => {
      if (element.name.toLowerCase().includes(search.toLowerCase()) && search != "") {
        // console.log(element)
        lists[3].list.push(element)
      }
    });
    this.state.lists[4].list.forEach(element => {
      if (element.name.toLowerCase().includes(search.toLowerCase()) && search != "") {
        // console.log(element)
        lists[4].list.push(element)
      }
    });
    this.state.lists[5].list.forEach(element => {
      if (element.name.toLowerCase().includes(search.toLowerCase()) && search != "") {
        // console.log(element)
        lists[2].list.push(element)
      }
    });
    this.state.lists[6].list.forEach(element => {
      if (element.name.toLowerCase().includes(search.toLowerCase()) && search != "") {
        // console.log(element)
        lists[6].list.push(element)
      }
    });


    this.setState({ searchLists: lists })
    this.setState({ search });
  };
  _handlePress = (food) =>
    this.setState({
      expanded: !this.state.expanded
    });



  _renderHeader = section => {
    return (
      <View style={styles.listItemContainer}>
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
            <TouchableOpacity onPress={() => this._addPortion(item.category)}>
              {item.favourite ? (
                <Image
                  style={styles.icon}
                  source={require('../assets/star_Selected.png')}
                />
              ) : (
                  <Image
                    style={styles.icon}
                    source={require('../assets/star_NotSelected.png')}
                  />
                )}

            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._addPortion(item.category)}>
              <Image
                style={styles.icon}
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
    const { search } = this.state;
    if (this.state.searchActive) {

      return (
        <View style={styles.container}>
          <ScrollView>
            <View>


              <SearchBar
                placeholder="Search Your Food Here..."
                platform="ios"
                containerStyle={{ backgroundColor: '#000' }}
                inputContainerStyle={{ backgroundColor: '#1C1C1E' }}
                onChangeText={this.updateSearch}
                value={search}
              />

              {this._renderContent(this.state.searchLists[0])}
              {this._renderContent(this.state.searchLists[1])}
              {this._renderContent(this.state.searchLists[2])}
              {this._renderContent(this.state.searchLists[3])}
              {this._renderContent(this.state.searchLists[4])}
              {this._renderContent(this.state.searchLists[5])}
              {this._renderContent(this.state.searchLists[6])}
            </View>
          </ScrollView>
        </View>


      )

    }
    else if (!this.state.searchActive) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View>


              <SearchBar
                placeholder="Search Your Food Here..."
                platform="ios"
                containerStyle={{ backgroundColor: '#000' }}
                inputContainerStyle={{ backgroundColor: '#1C1C1E' }}
                onChangeText={this.updateSearch}
                value={search}
              />
              <Accordion style={styles.listContainer}
                sections={this.state.lists}
                activeSections={this.state.activeSections}
                renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
              />
            </View>
          </ScrollView>
        </View>


      )
    }

  }
}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    height: '100%',
    marginTop: 88
  },
  foodItems: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomColor: '#B7B7B7',
    borderBottomWidth: .5,
    borderBottomStartRadius: 16,
  },
  listContainer: {
    backgroundColor: '#1C1C1E',
    display: 'flex',
  },
  content: {
    color: '#DDDEDE',
    alignSelf: 'center',
    fontSize: 16,
    flex: 2
  },
  foodItemIcons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: "flex-end",
    alignContent: 'center'
  },


  listItemContainer: {


  },

  listItemTitle: {

    flex: 1,
    marginTop: 16,
    paddingLeft: 16,
    height: 45,
    fontSize: 22,
    color: '#DDDEDE',
    backgroundColor: '#1C1C1E',
    paddingTop: 10 //temp

  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 16
  },
});