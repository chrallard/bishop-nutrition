import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import healthTrackingTemplate from '../dataTemplates/healthTrackingTemplate'
import bodyTrackingTemplate from '../dataTemplates/bodyTrackingTemplate'

export let todaysHealthTrackingDocId = ""
export let todaysBodyTrackingDocId = ""

export const checkIfTodaysObjectsExist = async (uid) => { //checking if there are existing objects for today in the db

    //get todays date
    let d = new Date()
    let today = await formatDate(d)

    let todaysObjectsExist = false

    await firebase.firestore()
      .collection("userData")
      .doc(uid)
      .collection("healthTracking")
      .orderBy("timeStamp", "desc")
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            let timeStamp = doc.data().timeStamp
            let timeStampDate = new Date(timeStamp)
            let day = formatDate(timeStampDate)

            if (today == day) { //if today's date matches one in the database, set it to true. if not todaysObjectsExist remains false
                todaysObjectsExist = true
                todaysHealthTrackingDocId = doc.id
            }
        });
      });

    await firebase.firestore()
      .collection("userData")
      .doc(uid)
      .collection("bodyTracking")
      .orderBy("timeStamp", "desc")
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            let timeStamp = doc.data().timeStamp
            let timeStampDate = new Date(timeStamp)
            let day = formatDate(timeStampDate)
  
            if (today == day) { //if today's date matches one in the database, set todaysBodyTrackingDocId
              todaysBodyTrackingDocId = doc.id
            }
          })
      })

    if (todaysObjectsExist == false) { //setting an empty template object to healthTracking collection if one for today doesn't exist
      console.log("No tracking object exists for today's date. Creating...")
      await createTodaysEmptyObjects(uid)
    } else {
      console.log("Today's tracking objects already exist.")
      return { todaysHealthTrackingDocId, todaysBodyTrackingDocId }
    }
  }

  const createTodaysEmptyObjects = async (uid) => { //creating empty template objects for today's date in db
    let now = Date.now()
    let humanDate = formatDate(new Date(now))
    healthTrackingTemplate.timeStamp = bodyTrackingTemplate.timeStamp = now //both docs share the same timestamp
    healthTrackingTemplate.humanDate = bodyTrackingTemplate.humanDate = humanDate //also a human readable date to make life easier

    let healthTrackingRef = firebase.firestore().collection("userData").doc(uid).collection("healthTracking")
    let bodyTrackingRef = firebase.firestore().collection("userData").doc(uid).collection("bodyTracking")

    await healthTrackingRef
      .doc(`health_${humanDate}`)
      .set(healthTrackingTemplate) //imported data template
      .then(() => {
        console.log("healthTrackingTemplate successfully written!");
        todaysHealthTrackingDocId = `health_${humanDate}`
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      })

    await bodyTrackingRef
      .doc(`body_${humanDate}`)
      .set(bodyTrackingTemplate) //imported data template
      .then(() => {
        console.log("bodyTrackingTemplate successfully written!");
        todaysBodyTrackingDocId = `body_${humanDate}`
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      })
  }

  const formatDate = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    const formattedDate = date + month + year //looks like this: 4March2020

    return formattedDate
  }