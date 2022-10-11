import { CometChat } from '@cometchat-pro/react-native-chat'
import { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native'
import { Avatar, Text } from 'react-native-elements'
import { useGlobalState } from '../store'
import { getAuth } from '../firebase-cometchat/firebase'

const auth = getAuth()

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

const ChatContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Stories />
      <ChatList navigation={navigation} />
    </View>
  )
}

const Stories = () => {
  const [stories] = useGlobalState('stories')

  return (
    <ScrollView
      style={[
        styles.shadow,
        {
          flexGrow: 0,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          paddingVertical: 15,
        },
      ]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {stories.map((story) => (
        <View
          key={story.id}
          style={{ alignItems: 'center', marginHorizontal: 5 }}
        >
          <Avatar size={60} rounded source={{ uri: story.avatar }} />
          <Text style={{ fontWeight: 600 }}>{story.fullname}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const ChatList = ({ navigation }) => {
  const viewport = useWindowDimensions()
  const [conversations, setConversations] = useState([])

  const getConversations = () => {
    let limit = 30
    let conversationsRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(limit)
      .build()

    conversationsRequest
      .fetchNext()
      .then((conversationList) => setConversations(conversationList))
      .catch((error) => {
        console.log('Conversations list fetching failed with error:', error)
      })
  }

  useEffect(() => {
    getConversations()
  }, [navigation])

  return (
    <ScrollView
      style={{
        minHeight: viewport.height.toFixed(0) - 189,
        marginTop: 50,
        paddingTop: 15,
      }}
      showsVerticalScrollIndicator={false}
    >
      {conversations.map((conversation, index) => (
        <Conversation
          key={index}
          currentUser={auth.currentUser.uid.toLowerCase()}
          owner={conversation.lastMessage.receiverId.toLowerCase()}
          conversation={conversation.lastMessage}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  )
}

const Conversation = ({ conversation, currentUser, owner, navigation }) => {
  const possessor = (key) => {
    return currentUser == owner
      ? conversation.sender[key]
      : conversation.receiver[key]
  }

  const handleNavigation = () => {
    navigation.navigate('ChatScreen', {
      id: possessor('uid'),
      name: possessor('name'),
      avatar: possessor('avatar'),
    })
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
      <Avatar size={50} rounded source={{ uri: possessor('avatar') }} />

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
            {possessor('name')}
          </Text>
          <Text style={{ color: 'gray' }}>
            {conversation.text.slice(0, 30) + '...'}
          </Text>
        </View>

        <Text style={{ color: 'gray' }}>
          {timeAgo(new Date(Number(conversation.sentAt) * 1000).getTime())}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChatContainer

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
    zIndex: 9999,
  },
})