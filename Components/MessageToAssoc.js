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
            message: "",
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

    sendMessage = () => {
        const { message } = this.state;
        if (message == "") {
            alert("Entrez votre pseudo");
        }
        else {

            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/envoiMessageUserToAssocController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    idAssocUserCo: this.state.idAssocUser,
                    idEnvoyeur: this.state.idUser,
                    idReceveur: this.props.route.params.idAssoc,
                })

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    alert(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        //alert("Hanhanhan");
    }

    render() {
        let tis = this;
        let testLog = this.state.pseudoUser;
        //let envoi = this.sendMessage();
        



        function CheckSiCo() {
            if (testLog != null) {
                return (
                    <View style={styles.zoneBouton}>
                        <ScrollView style={styles.zoneMessageInput}>
                            <TextInput
                                style={{ flex: 1, width: 270 }}
                                placeholder="Ecrivez votre message ici !"
                                multiline={true}
                                value={tis.state.message}
                                onChangeText={(message) => tis.setState({ message: message })}
                            />
                        </ScrollView>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <View style={styles.submitContainer}>
                                <TouchableOpacity
                                    onPress={() => tis.sendMessage()}>
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