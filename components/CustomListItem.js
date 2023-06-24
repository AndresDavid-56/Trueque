import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
  auth,
  database
  
} from '../firebase-cometchat/firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() =>
    onSnapshot(
      query(
        collection(database, `chats/${id}`, 'messages'),
        orderBy('createdAt', 'desc')
      ),
      (snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({ id: doc._id, ...doc.data() }))
        )
      }
    )

  )

  return (
    <ListItem  style={{backgroundColor:'white'}} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        }}
      />
      <ListItem.Content >
        <ListItem.Title style={{}}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.user.displayName}: {chatMessages?.[0]?.text}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})