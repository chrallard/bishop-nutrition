import React, { createContext, Component } from 'react'

import { getUid } from '../backend/auth'
import { checkIfTodaysObjectsExist, todaysHealthTrackingDocId, todaysBodyTrackingDocId } from '../backend/dbObjects'
import { userInfo } from '../backend/userData'


export const DataContext = createContext()

class DataContextProvider extends Component {

    state = {
        isReady: false,

        uid: "",
        healthDocId: todaysHealthTrackingDocId,
        bodyDocId: todaysBodyTrackingDocId,

        userInfo: ""
    }

    async componentDidMount() {
        await this.setState({ uid: await getUid() })
        await checkIfTodaysObjectsExist(this.state.uid)

        await this.getAllData()
    }

    getAllData = async () => {

        await this.setState({ userInfo: await userInfo(this.state.uid) })
        

        this.setState({ isReady: true })
    }
    
    render() {
    
        return(
            this.state.isReady ? (
                <DataContext.Provider value={{...this.state}} >
                    {this.props.children}
                </DataContext.Provider>
            ) : (
                <></>
            )
        )
    }
}

export default DataContextProvider