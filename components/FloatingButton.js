import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { setGlobalState } from '../store'

const FloatingButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setGlobalState('showUsers', true)}
        style={styles.button}
        activeOpacity={0.5}
      >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    right: 30,
  },
  button: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 50,
    backgroundColor: 'black',
  },
})

export default FloatingButton