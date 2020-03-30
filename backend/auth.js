import * as firebase from 'firebase/app'
import 'firebase/auth'

export const getUid = async () => {
    let uid = await firebase.auth().currentUser.uid
    return uid
  }