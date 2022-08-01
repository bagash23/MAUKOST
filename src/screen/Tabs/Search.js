import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import SearchTopNavigator from '../../components/SearchTopNavigator'

const Search = () => {
  return (
    <View style = {styles.container} >
      <View style = {styles.headerBody} >
        <Image source={require("../../assets/logo_app.png")} style ={styles.avatarLogo} />
        <Text style = {styles.titleLogo} >MAUKOST</Text>
      </View>
      <SearchTopNavigator/>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerBody: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    marginVertical: Dimensions.get("window").height * 0.01,
  },
  avatarLogo: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
  },
  titleLogo: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    color: "#000",
    marginLeft: Dimensions.get('window').width * 0.04,
  }
})