import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialFixedLabelTextbox from "../Components/MaterialFixedLabelTextbox";
import MaterialFixedLabelTextbox1 from "../Components/MaterialFixedLabelTextbox1";
import MaterialFixedLabelTextbox3 from "../Components/MaterialFixedLabelTextbox3";
import MaterialFixedLabelTextbox4 from "../Components/MaterialFixedLabelTextbox4";


class Inscription extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rect}></View>
                <MaterialFixedLabelTextbox
                    style={styles.materialFixedLabelTextbox}
                ></MaterialFixedLabelTextbox>
                <MaterialFixedLabelTextbox1
                    style={styles.materialFixedLabelTextbox1}
                ></MaterialFixedLabelTextbox1>
                <MaterialFixedLabelTextbox3
                    style={styles.materialFixedLabelTextbox3}
                ></MaterialFixedLabelTextbox3>
                <MaterialFixedLabelTextbox4
                    style={styles.materialFixedLabelTextbox4}
                ></MaterialFixedLabelTextbox4>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Inscription')}>
                            <Text style={styles.submitButton}>S'inscrire</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },
    rect: {
        width: 352,
        height: 234,
        backgroundColor: "rgba(230, 230, 230,1)",
        marginTop: 454,
        marginLeft: 914
    },
    materialFixedLabelTextbox: {
        width: 352,
        height: 43,
        marginTop: -526,
        alignSelf: "center"
    },
    materialFixedLabelTextbox1: {
        width: 352,
        height: 43,
        marginTop: 27,
        alignSelf: "center"
    },
    materialFixedLabelTextbox3: {
        width: 352,
        height: 43,
        marginTop: 32,
        alignSelf: "center"
    },
    materialFixedLabelTextbox4: {
        width: 352,
        height: 43,
        marginTop: 33,
        alignSelf: "center"
    },
    submitButton: {
        width: 100,
        borderRadius: 25,
        paddingVertical: 13,
        textAlign: 'center',
        color: '#FFFFFF'
      },
      submitContainer:{
        backgroundColor: "#6D071A",
        borderRadius: 25,
        marginVertical: 10,
    }
});

export default Inscription