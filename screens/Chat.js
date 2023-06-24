import { CometChat } from '@cometchat-pro/react-native-chat'
import { useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { Avatar, Input, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getAuth } from '../firebase-cometchat/firebase'

const ChatScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} route={route} />
      <MessageContainer route={route} />
    </SafeAreaView>
  )
}

const Header = ({ navigation, route }) => (
  <View
    style={[styles.flexify, { paddingHorizontal: 15, paddingVertical: 25 }]}
  >
    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
      <Icon name="arrow-left" size={18} color="black" />
    </TouchableOpacity>

    <View style={[styles.flexify, { flex: 1, marginLeft: 15 }]}>
      <View style={styles.flexify}>
        <Avatar
          rounded
          // source={{ uri: route.params.avatar }}
          placeholderStyle={{ opacity: 0 }}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: 600,
            marginLeft: 10,
            textTransform: 'capitalize',
          }}
        >
          {/* {route.params.name} */}
        </Text>
      </View>

      {/* <View style={styles.flexify}>
        <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 25 }}>
          <Icon name="video" size={18} color="white" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="phone-alt" size={18} color="white" />
        </TouchableOpacity>
      </View> */}
    </View>
  </View>
)

const MessageContainer = ({ route }) => {
  const viewport = useWindowDimensions()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const scrollViewRef = useRef()
  const auth = getAuth()

  const sendMessage = () => {
    // let receiverID = route.params.id
    let messageText = message
    let receiverType = CometChat.RECEIVER_TYPE.USER
    let textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    )

    CometChat.sendMessage(textMessage).then(
      (message) => {
        setMessages((prevState) => [...prevState, message])
        setMessage('')
        console.log('Message sent successfully:', message)
      },
      (error) => {
        console.log('Message sending failed with error:', error)
      }
    )
  }

  const getMessages = () => {

    // console.log("hola", location.pathname);

    let UID = "123"
    let limit = 30
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(UID)
      .setLimit(limit)
      .build()

    messagesRequest
      .fetchPrevious()
      .then((messages) => setMessages(messages))
      .catch((error) => {
        console.log('Message fetching failed with error:', error)
      })
  }

  const listenForMessage = () => {
    const listenerID = Math.random().toString(16).slice(2)
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          setMessages((prevState) => [...prevState, message])
        },
      })
    )
  }

  useEffect(() => {
    getMessages()
    listenForMessage()
  }, [route])

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(width, height) =>
          scrollViewRef.current.scrollTo({ y: height })
        }
        style={{
          backgroundColor: 'white',
          maxHeight: viewport.height.toFixed(0) - 162,
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 5,
          }}
        ></View>
        {messages.map((message, index) => (
          <Message
            key={index}
            currentUser={auth.currentUser.uid.toLowerCase()}
            owner={message.receiverId.toLowerCase()}
            message={message}
          />
        ))}
      </ScrollView>

      <View style={[styles.flexify, styles.positAtBottom, styles.shadow]}>
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 50,
            backgroundColor: '#fffaf2',
          }}
          activeOpacity={0.5}
        >
          <Icon name="plus" size={12} color="white" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Input
            placeholder="Write a message..."
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onSubmitEditing={() => sendMessage()}
            onChangeText={(text) => setMessage(text)}
            value={message}
            inputStyle={{ fontSize: 12 }}
            autoFocus={true}
          />
        </View>

        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 50,
            backgroundColor: '#c5c5c5',
          }}
          activeOpacity={0.5}
          disabled={message.length < 1}
          onPress={() => sendMessage()}
        >
          <Icon name="arrow-right" size={12} color="black" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const Message = ({ message, currentUser, owner }) => {
  const dateToTime = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  const isDateToday = (date) => {
    const today = new Date().getDate()
    const day = new Date(date * 1000).getDate()

    return today == day
  }

  return currentUser == owner ? (
    <View style={[styles.flexify, styles.spaceMsg]}>
      <Avatar
        placeholderStyle={{ opacity: 0 }}
        rounded
        source={{ uri: message.sender.avatar }}
      />

      <View style={[styles.msgBg, { marginLeft: 10 }]}>
        <Text
          style={{
            fontWeight: 800,
            fontSize: 13,
            color: '#4c4c4c',
            textTransform: 'capitalize',
          }}
        >
          {message.sender.name}
        </Text>
        <Text style={{ fontWeight: 600, marginVertical: 5 }}>
          {message.text}
        </Text>
        <Text style={{ fontWeight: 600 }}>
          {dateToTime(new Date(message.sentAt * 1000))}
        </Text>
      </View>
    </View>
  ) : (
    <View style={[styles.flexify, styles.spaceMsg]}>
      <View
        style={[styles.msgBg, { backgroundColor: '#c5c5c5', marginRight: 10 }]}
      >
        <Text
          style={{
            fontWeight: 800,
            fontSize: 13,
            color: '#4c4c4c',
            textTransform: 'capitalize',
          }}
        >
          {message.sender.name}
        </Text>
        <Text styles={{ fontWeight: 600, marginVertical: 5 }}>
          {message.text}
        </Text>
        <Text style={{ fontWeight: 600 }}>
          {dateToTime(new Date(message.sentAt * 1000))}
        </Text>
      </View>

      <Avatar
        placeholderStyle={{ opacity: 0 }}
        rounded
        source={{ uri: message.sender.avatar }}
      />
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf2',
  },
  flexify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgBg: {
    flex: 1,
    backgroundColor: '#efefef',
    borderRadius: 20,
    padding: 10,
  },
  spaceMsg: {
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
  },
  positAtBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
})