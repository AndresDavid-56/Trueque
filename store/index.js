import { createGlobalState } from 'react-hooks-global-state'

const stories = [
  
]

const { setGlobalState, useGlobalState } = createGlobalState({
  isLoggedIn: false,
  currentUser: null,
  stories,
  showUsers: false,
})

export { useGlobalState, setGlobalState }