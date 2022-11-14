import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Avatar, Text } from 'react-native-elements'
import { getAuth, signOut } from '../firebase-cometchat/firebase'
import { CometChat } from '@cometchat-pro/react-native-chat'
import { setGlobalState } from '../store'

const HomeHeader = () => {
  const PLACEHOLDER_AVATAR =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

  const auth = getAuth()

  const signOutUser = async () => {
    try {
      await signOut(auth).then(() => {
        CometChat.logout()
          .then(() => {
            console.log('Logout completed successfully')
            setGlobalState('currentUser', null)
            setGlobalState('isLoggedIn', false)
          })
          .catch((error) =>
            console.log('Logout failed with exception:', { error })
          )
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ paddingVertical: 15, paddingHorizontal: 30 }}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.5}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL || PLACEHOLDER_AVATAR,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <TouchableOpacity style={{ marginRight: 15 }} activeOpacity={0.5}>
            <Icon name="search" size={18} color="white" />
          </TouchableOpacity> */}
        </View>
      </View>

      <Text h4 style={{ color: 'black', marginTop: 15 }}>
        Mensajes
      </Text>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
})