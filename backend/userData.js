import * as firebase from 'firebase/app'
import 'firebase/firestore'

export const userInfo = async (uid) => {

    let result = null

    await firebase.firestore().collection("userData").doc(uid).get().then((doc) => {
        if(doc.exists){
            result = doc.data()
        }else{
            alert("Error: This user does not exist.")
        }
    })

    return result

}

export const planData = async (plan) => {

    let result = null

    await firebase.firestore().collection("plans").doc(plan).get().then((doc) => {
        if(doc.exists){
            result = doc.data()
        }else{
            alert("Error: This plan does not exist.")
        }
    })

    return result

}

export const healthTrackingData = async (uid) => {

    let result = []

    await firebase.firestore().collection("userData").doc(uid).collection("healthTracking").orderBy("timeStamp", "desc").limit(30).get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
            result.push(item.data())
        })
    })

    return result

}