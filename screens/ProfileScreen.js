import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity, TextInput } from 'react-native'
import * as firebase from "firebase/app"

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPasswordInput: "",
      newPasswordInput: "",
      showUpdatePassword: false
    }
    this.addModal = this.addModal.bind(this);
  }

  signOut = async () => { //calls the firebase to sign the user out
    await firebase.auth().signOut().then()
      .catch((err) => {
        console.log(err)
      });
  }

  updatePassword = () => { //passes the current password, new password, and email to firebase, checks if the current password is correct, and if it is, updates the password to the new one
    let currentUser = firebase.auth().currentUser
    let cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, this.state.currentPasswordInput)
    currentUser.reauthenticateWithCredential(cred).then(() => {
      currentUser.updatePassword(this.state.newPasswordInput).then(() => {
        alert("Password updated successfully.")
        this.setState({ showUpdatePassword: false })
      }).catch((err) => {
        alert(err)
      })
    }).catch((err) => {
      alert(err)
    })
  }

  addModal = () => {
    this.refs.addModal.showModal();
  }

  render() {
    return (
      <View style={styles.container} >
        <Button
          title="Sign Out"
          onPress={this.signOut} />
        <Button
          title="Update Password"
          onPress={() => { this.setState({ showUpdatePassword: true }) }} />

        <Modal visible={this.state.showUpdatePassword} animationType={'slide'} transparent={true}>

          <View style={styles.modalStyle}>

            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => { this.setState({ showUpdatePassword: false }) }}>
                <Text style={styles.modalNav}>Cancel</Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Update Password</Text>

              <TouchableOpacity onPress={this.updatePassword}>
                <Text style={styles.modalNav}>Save</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="Current password"
                placeholderTextColor="#6E6F6F"
                onChangeText={(text) => this.setState({ currentPasswordInput: text })}
                value={this.state.currentPasswordInput}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="New password"
                placeholderTextColor="#6E6F6F"
                onChangeText={(text) => this.setState({ newPasswordInput: text })}
                value={this.state.newPasswordInput}
                secureTextEntry={true}
              />
            </View>

          </View>

        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  /***** Update Password Modal DONE ******/
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
    padding: 16,
    marginBottom: 20
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
  input: {
    height: 45,
    width: '90%',
    paddingLeft: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#1C1C1E',
    marginBottom: 8,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    color: '#DDDEDE',
    fontSize: 15
  },
})