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