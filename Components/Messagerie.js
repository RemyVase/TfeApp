import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';


class Messagerie extends React.Component {
    render() {
        return (
            <View style={styles.statusbar}><Text style={styles.textStatus}>Messagerie</Text></View>
        )
    }
}

const styles = StyleSheet.create({
    statusbar: {
        backgroundColor: "#6D071A",
        height: 88,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 11
    },
    textStatus: {
        color: "white",
        fontSize: 18,
        fontWeight: "600"
    }
});

export default Messagerie