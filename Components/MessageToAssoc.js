import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Image, AsyncStorage } from "react-native";



class MessageToAssoc extends React.Component {
    constructor() {
        super();
        this.state = {
            pseudoUser: "",
            mailUser: "",
            idUser: "",
            idAssocUser: "",
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('UserId');
        var value2 = await AsyncStorage.getItem('UserEmail');
        var value3 = await AsyncStorage.getItem('UserPseudo');
        var value4 = await AsyncStorage.getItem('UserIdAssoc');
        this.setState({ idUser: value });
        this.setState({ mailUser: value2 });
        this.setState({ pseudoUser: value3 });
        this.setState({ idAssocUser: value4 });
    }

    render() {
        let testLog = this.state.pseudoUser;


        function CheckSiCo() {
            if (testLog != null) {
                return (
                    <View style={styles.zoneBouton}>
                        <ScrollView style={styles.zoneMessageInput}>
                            <TextInput
                                style={{ flex: 1, width: 270 }}
                                placeholder="Ecrivez votre message ici !"
                                multiline={true}
                            />
                        </ScrollView>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.submitContainer}>
                                <TouchableOpacity
                                    onPress={() => alert("YAHOUUUUUUU")}>
                                    <Text style={styles.submitButton}>Envoyer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.messageAlert}>Vous devez vous connecter pour envoyer un message à une association.</Text>
                    </View>
                )
            }
        }
        return (

            <CheckSiCo />

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
    },
    messageAlert: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});


export default MessageToAssoc