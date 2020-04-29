import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialFixedLabelTextbox5 from "../Components/MaterialFixedLabelTextbox5";
import MaterialFixedLabelTextbox6 from "../Components/MaterialFixedLabelTextbox6";


class Connexion extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rect}></View>
                <MaterialFixedLabelTextbox5
                    style={styles.materialFixedLabelTextbox5}
                ></MaterialFixedLabelTextbox5>
                <MaterialFixedLabelTextbox6
                    style={styles.materialFixedLabelTextbox6}
                ></MaterialFixedLabelTextbox6>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:'-70%' }}>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Inscription')}>
                            <Text style={styles.submitButton}>Se connecter</Text>
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
    materialFixedLabelTextbox5: {
        width: 352,
        height: 43,
        marginTop: -526,
        alignSelf: "center"
    },
    materialFixedLabelTextbox6: {
        width: 352,
        height: 43,
        marginTop: 27,
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

export default Connexion