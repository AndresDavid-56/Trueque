import { SafeAreaView, StyleSheet } from 'react-native'
import ChatContainer from '../components/ChatContainer'
import FloatingButton from '../components/FloatingButton'
import HomeHeader from '../components/HomeHeader'
import UserList from '../components/UserList'
const HomeScreen1 = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader />
            <ChatContainer navigation={navigation} />
            {/* <FloatingButton />
            <UserList navigation={navigation} /> */}
        </SafeAreaView>
    )
}
export default HomeScreen1
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf2',
    },
})