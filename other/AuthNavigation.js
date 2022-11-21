import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './navigation'
import { onAuthStateChanged, getAuth } from '../firebase-cometchat/firebase'
import { CometChat } from '@cometchat-pro/react-native-chat'
import { CONSTANTS } from '../firebase-cometchat/CONSTANTS'

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const auth = getAuth()

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null)

  const signUpWithCometChat = (data) => {
    const authKey = CONSTANTS.Auth_Key
    const user = new CometChat.User(data.uid)
    user.setName(data.displayName)
    //user.setAvatar(data.photoURL)
    user.avatar===null? user.setAvatar(data.photoURL) : user.setAvatar("https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg");
    CometChat.createUser(user, authKey)
      .then((res) => {
        console.log('User signed up...', res)
        CometChat.login(data.uid, authKey)
          .then((u) => {
            console.log(u)
            userHandler(data)
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => {
        console.log(error)
        alert(error.message)
      })
  }

  const loginWithCometChat = (data) => {
    const authKey = CONSTANTS.Auth_Key
    CometChat.login(data.uid, authKey)
      .then((u) => {
        console.log('User Logged in...', u)
        userHandler(data)
      })
      .catch((error) => {
        if (error.code === 'ERR_UID_NOT_FOUND') {
          signUpWithCometChat(data)
        } else {
          console.log(error)
        }
      })
  }

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (currentUser == null && user) {
          loginWithCometChat(user)
        } else {
          userHandler(null)
        }
      }),
    []
  )

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation