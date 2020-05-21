import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Image, AsyncStorage, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,ImageBackground } from "react-native";

class MessageToAssoc extends React.Component {
    constructor() {
        super();
        this.state = {
            pseudoUser: "",
            mailUser: "",
            idUser: "",
            idAssocUser: "",
            message: "",
            villeUser: "",
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
        var value5 = await AsyncStorage.getItem('UserVille');
        this.setState({ idUser: value });
        this.setState({ mailUser: value2 });
        this.setState({ pseudoUser: value3 });
        this.setState({ idAssocUser: value4 });
        this.setState({ villeUser: value5});
    }

    sendMessage = () => {
        const { message } = this.state;
        if (message == "") {
            alert("Entrez votre pseudo");
        }
        else {

            fetch('https://www.sapandfriends.be/flash/controller/appEnvoiMessageUserToAssocController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: '{"message": "' + message + '", "idAssocUserCo": ' + this.state.idAssocUser +', "idEnvoyeur": ' + this.state.idUser + ', "idReceveur": "' + this.props.route.params.idAssoc + '"}'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson === "messageEnvoye"){
                        alert("Votre message à bien été envoyé à l'association.");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        let tis = this;
        let testLog = this.state.pseudoUser;

        function CheckSiCo() {
            if (testLog != null) {
                return (
                    <View style={{ flex: 1, alignItems: 'center',}}>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity
                                onPress={() => tis.sendMessage()}>
                                <Text style={styles.submitButton}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1,alignItems: 'center',}}>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity
                                onPress={() => alert("Vous devez être connecté pour pouvoir contacter une association.")}>
                                <Text style={styles.submitButton}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        }
        return (

            <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : 1000}
            keyboardVerticalOffset={64}
        >
            <ImageBackground
                source={require('../img/backImage.jpg')}
                style={{ width: '100%', height: '80%', resizeMode: 'repeat', justifyContent: 'center', alignItems: 'center', right: 20, top: 120, opacity: 0.2, position: 'absolute', }}
            >
            </ImageBackground>
                <ScrollView style={styles.zoneMessageInput}>
                    <TextInput
                        style={{ flex: 1, width: 270 }}
                        placeholder="Ecrivez votre message ici !"
                        multiline={true}
                        value={tis.state.message}
                        onChangeText={(message) => tis.setState({ message: message })}
                    />
                </ScrollView>
                <CheckSiCo />
            </KeyboardAvoidingView>
            

        )
    }
}

const styles = StyleSheet.create({
    submitButton: {
        width: 100,
        borderRadius: 25,
        paddingVertical: 13,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    submitContainer: {
        backgroundColor: "#6D071A",
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoneBouton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoneMessageInput: {
        flex: 1,
        borderWidth: 1,
        margin: 70,
        marginTop: 150,
        backgroundColor: 'white',
        borderRadius: 15,
        opacity: 0.9,
        padding : 15
    },
    messageAlert: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});


export default MessageToAssoc