import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

class Message extends React.Component {
    constructor() {
        super();
      }

    render() {
        const { test } = this.props.route.params;
        console.log(this.props.route.params.ok);
        return (
        <Text>{this.props.route.params.ok}</Text>
        )
    }
}

const styles = StyleSheet.create({
    messageEnvoye:{
        
    }
});

export default Message