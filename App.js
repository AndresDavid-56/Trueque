import { CometChat } from '@cometchat-pro/react-native-chat'
import { useEffect } from 'react'
import AuthNavigation from './other/AuthNavigation'
import { CONSTANTS } from './firebase-cometchat/CONSTANTS'


export default function App() {
const initCometChat = () => {
let appID = CONSTANTS.APP_ID
let region = CONSTANTS.REGION
let appSetting = new CometChat.AppSettingsBuilder()
.subscribePresenceForAllUsers()
.setRegion(region)
.build()
CometChat.init(appID, appSetting)
.then(() => console.log('Initialization completed successfully'))
.catch((error) => console.log('Initialization failed with error:', error))
}
useEffect(() => initCometChat(), [])
return <AuthNavigation />
}