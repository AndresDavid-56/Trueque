import { CometChat } from '@cometchat-pro/react-native-chat'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import { Avatar, Button, Overlay } from 'react-native-elements'
import { setGlobalState, useGlobalState } from '../store'

const timeAgo = (date) => {
  let seconds = Math.floor((new Date() - date) / 1000)
  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + 'yr'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + 'mo'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + 'd'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + 'h'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + 'm'
  }
  return Math.floor(seconds) + 's'
}

const UserList = ({ navigation }) => {
  const viewport = useWindowDimensions()
  const [showUsers] = useGlobalState('showUsers')
  const [users, setUsers] = useState([])

  const toggleOverlay = () => setGlobalState('showUsers', !showUsers)

  const getUsers = () => {
    const limit = 30
    const usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(limit)
      .build()

    usersRequest
      .fetchNext()
      .then((userList) => setUsers(userList))
      .catch((error) => {
        console.log('User list fetching failed with error:', error)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Overlay
      isVisible={showUsers}
      onBackdropPress={toggleOverlay}
      overlayStyle={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: viewport.width.toFixed(0) - 200,
        maxWidth: viewport.width.toFixed(0) - 194,
      }}
    >
      <ScrollView
        style={{
          maxHeight: viewport.height.toFixed(0) - 196,
          padding: 20,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
      >
       {users.map((user, index) => (
          <User user={user} key={index} navigation={navigation} />
        ))} 
      </ScrollView>
    </Overlay>
  )
}

const User = ({ navigation, user }) => {
  const handleNavigation = () => {
    navigation.navigate('ChatScreen', {
      id: user.id,
      name: user.name,
    })
    setGlobalState('showUsers', false)
    console.log("holaa", user.uid, "sd ", user.name);
  }

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
      }}
      onPress={handleNavigation}
      
    >
      <View>
        <Avatar
          size={50}
          rounded
          source={{ uri: user.avatar }}
          placeholderStyle={{ opacity: 0 }}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text h5 style={{ fontWeight: 700 }}>
            {user.name}
          </Text>
          <Text style={{ color: 'gray' }}>{user.status}</Text>
        </View>

        <Text style={{ color: 'gray' }}>
          {timeAgo(new Date(Number(user.lastActiveAt) * 1000).getTime())}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})

export default UserList