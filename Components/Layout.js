//Components/Layout.js
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";

class Layout extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectColumn}>
          <View style={styles.rect}></View>
          <View style={styles.rect2}>
            <Text style={styles.tfeApp}>Tfe-App</Text>
          </View>
        </View>
        <View style={styles.rectColumnFiller}></View>
        <View style={styles.rect3}>
          <View style={styles.icon3Row}>
            <FeatherIcon name="alert-triangle" style={styles.icon3}></FeatherIcon>
            <FontAwesomeIcon name="users" style={styles.icon6}></FontAwesomeIcon>
            <EntypoIcon name="chat" style={styles.icon4}></EntypoIcon>
            <FontAwesomeIcon name="user" style={styles.icon5}></FontAwesomeIcon>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    width: 375,
    height: 234,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 454,
    marginLeft: 914
  },
  rect2: {
    height: 83,
    backgroundColor: "rgba(60,23,23,1)",
    marginTop: -688,
    marginRight: 852
  },
  tfeApp: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    marginTop: 35,
    marginLeft: 162,
    marginRight: 161
  },
  rectColumn: {
    marginRight: -852
  },
  rectColumnFiller: {
    flex: 1
  },
  rect3: {
    backgroundColor: "rgba(60,23,23,1)",
    height: 81,
    flexDirection: "row"
  },
  icon3: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 40,
    width: 40
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 40,
    width: 43,
    marginLeft: 67
  },
  icon4: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 40,
    width: 40,
    marginLeft: 72
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 40,
    width: 29,
    marginLeft: 72
  },
  icon3Row: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 41,
    marginLeft: 33,
    marginTop: 20
  }
});

export default Layout