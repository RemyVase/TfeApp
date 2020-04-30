import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Image } from "react-native";



class MessageToAssoc extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (

            <View style={styles.zoneBouton}>
                <ScrollView style={styles.zoneMessageInput}>
                    <TextInput
                        style={{ height: 300, width: 300 }}
                        placeholder="Ecrivez votre message ici !"
                        multiline= {true}
                    />
                </ScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-start'}}>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={() => alert("YAHOUUUUUUU")}>
                            <Text style={styles.submitButton}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    submitButton: {
        width: 100,
        borderRadius: 25,
        paddingVertical: 13,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    submitContainer: {
        backgroundColor: "#6D071A",
        borderRadius: 25,
        marginVertical: 10,
    },
    zoneBouton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoneMessageInput: {
        flex: 1,
        borderWidth: 1,
        margin: 70,
        marginTop: 150,
        backgroundColor: 'white'
    }
});


export default MessageToAssoc