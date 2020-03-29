import React, { createContext, Component } from 'react'

import { getUid } from '../backend/auth'
import { checkIfTodaysObjectsExist, todaysHealthTrackingDocId, todaysBodyTrackingDocId } from '../backend/dbObjects'
import { userInfo, planData, healthTrackingData } from '../backend/userData'


export const DataContext = createContext()

class DataContextProvider extends Component {

    state = {
        isReady: false,

        uid: "",
        healthDocId: "",
        bodyDocId: "",

        userInfo: "",
        planData: "",
        healthTrackingData: ""
    }

    async componentDidMount() {
        await this.setState({ uid: await getUid() })
        await checkIfTodaysObjectsExist(this.state.uid)

        await this.setDocIds()
        await this.getAllData()

        this.setState({ isReady: true })
    }

    setDocIds = async () => {
        await this.setState({
            healthDocId: todaysHealthTrackingDocId,
            bodyDocId: todaysBodyTrackingDocId
        })
    }

    getAllData = async () => {

        await this.setState({ userInfo: await userInfo(this.state.uid) })
        await this.setState({ planData: await planData(this.state.userInfo.plan) })
        await this.setState({ healthTrackingData: await healthTrackingData(this.state.uid) })

        
        
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