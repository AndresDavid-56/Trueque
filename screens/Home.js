import { SafeAreaView, StyleSheet } from 'react-native'
import ChatContainer from '../components/ChatContainer'
import FloatingButton from '../components/FloatingButton'
import HomeHeader from '../components/HomeHeader'
import UserList from '../components/UserList'
const HomeScreen = ({ navigation }) => {
return (
<SafeAreaView style={styles.container}>
<HomeHeader />
<ChatContainer navigation={navigation} />
<FloatingButton />
<UserList navigation={navigation} />
</SafeAreaView>
)
}
export default HomeScreen
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#122643',
},
})