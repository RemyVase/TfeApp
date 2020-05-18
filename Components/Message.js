import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Image, AsyncStorage, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Icon, Button, ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

var timer = null;
class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            listMessage: [],
            idUser: "",
            mailUser: "",
            pseudoUser: "",
            idAssocUser: "",
            message: "",
            load: 'true'
        }
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    componentDidMount() {
            timer = setInterval(() => {
            this._loadInitialState().done();
            fetch('https://www.sapandfriends.be/flash/controller/appListeMessageController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: '{"idConv": ' + this.props.route.params.idConv + '}'
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    let tab = responseJson;
                    let date = "";
                    for (let i = 0; i < tab.length; i++) {
                        date = this.getParsedDate(tab[i]['date_message']);
                        tab[i]['date_message'] = date;
                    }
                    setTimeout(() => this.setState({ listMessage: tab }), 1);
                    this.messageLu();
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 5000);
        setTimeout(() => { this.setState({ load: 'false' }) }, 5001);
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

    envoieMessage() {
        fetch('https://www.sapandfriends.be/flash/controller/appEnvoieMessageMessagerieController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: '{"idEnvoyeur": ' + this.state.idUser + ', "idConv" : ' + this.props.route.params.idConv + ', "message":"' + this.state.message + '"}'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.componentDidMount();
                this.setState({ message: "" });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    messageLu() {
        fetch('https://www.sapandfriends.be/flash/controller/appMessageLuController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: '{"idUserCo": ' + this.state.idUser + ', "idConv" : ' + this.props.route.params.idConv + ', "idAssocUserCo":' + this.state.idAssocUser + '}'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getParsedDate(date) {
        date = String(date).split(' ');
        let dateSH = String(date[0]).split('-');
        let heure = String(date[1].split(':'));

        let belleDate = dateSH[2] + '-' + dateSH[1] + '-' + parseInt(dateSH[0]) + " " + heure[0] + heure[1] + ":" + heure[3] + heure[4];
        return belleDate;
    }

    render() {
        // RECUPERE LES DATAS DE MESSAGERIE (3H30 DE PERDU POUR des '', Courage à moi)
        const { test } = this.props.route.params;
        messages = this.state.listMessage;
        idUserCo = this.state.idUser;
        //////////////////////////////////////////////////////////////////////////////

        function TriMsg(liste) {
            const envoyeur = '"' + liste.envoyeur + '"';
            const date = liste.date;
            const nom = liste.nom;
            const msg = liste.msg;

            if (envoyeur != idUserCo) {
                return (
                    <View style={styles.messageRecu}>
                        <View style={styles.zoneTextMessage}>
                            <Text style={styles.textMessage}>{msg}</Text>
                        </View>
                        <View style={styles.zoneDateUserMessage}>
                            <View style={styles.zoneNomMessageRecu}>
                                <Text style={styles.textDateNom}>{nom}</Text>
                            </View>
                            <View style={styles.zoneDateMessageRecu}>
                                <Text style={styles.textDateNom}>{date}</Text>
                            </View>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.alignementDroitEnvoye}>
                        <View style={styles.messageEnvoye}>
                            <View style={styles.zoneTextMessage}>
                                <Text style={styles.textMessage}>{msg}</Text>
                            </View>
                            <View style={styles.zoneDateUserMessage}>
                                <View style={styles.zoneDateMessageRecu}></View>
                                <Text style={styles.textDateNom}>{date}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }

        if (this.state.load === "false") {

            return (
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={Platform.OS == "ios" ? "padding" : 1000}
                    keyboardVerticalOffset={64}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView
                            ref={ref => { this.scrollView = ref }}
                            onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
                            <FlatList
                                data={messages}
                                keyExtractor={(item) => item.id_message}
                                renderItem={({ item }) =>
                                    <TriMsg envoyeur={item.id_envoyeur} date={item.date_message} nom={item.pseudo_user} msg={item.contenu_message} />
                                }
                            />
                        </ScrollView>
                    </TouchableWithoutFeedback>
                    <View style={styles.zoneNewMessage}>
                        <ScrollView style={styles.inputText}>
                            <TextInput
                                style={{ height: 40 }}
                                placeholder="Ecrivez votre nouveau message ici..!"
                                multiline={true}
                                value={this.state.message}
                                onChangeText={(message) => this.setState({ message: message })}
                            />
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.envoiButton}
                            onPress={() => this.envoieMessage()}>

                            <View style={styles.zoneButton}>
                                <Image
                                    source={require('../assets/iconEnvoi.png')}
                                />
                            </View>

                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView >

            )
        } else {
            return (
                <ActivityIndicator size="large" color="#6D071A" />
            )
        }
    }
}

const styles = StyleSheet.create({
    messageRecu: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'flex-start',
        marginTop: 15,
        width: 250,

        padding: 6,
        marginLeft: 5,
        shadowColor: "#000",
        shadowOpacity: 0.58,
        shadowRadius: 5.00,
        elevation: 24,
        borderWidth: 0.3
    },
    alignementDroitEnvoye: {
        alignItems: 'flex-end',
    },
    messageEnvoye: {
        backgroundColor: '#FAA697',
        borderRadius: 15,
        marginTop: 15,
        width: 250,
        padding: 6,
        marginRight: 5,
        shadowColor: "#000",
        shadowOpacity: 0.58,
        shadowRadius: 5.00,
        elevation: 24,
        borderWidth: 0.3
    },
    zoneTextMessage: {
        marginTop: 5,
        marginLeft: 8,
        marginRight: 8,
    },
    textMessage: {
        fontSize: 17,
    },
    zoneDateUserMessage: {
        flex: 1,
        marginTop: 5,
        marginLeft: 8,
        marginRight: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    zoneDateMessageRecu: {
        justifyContent: "flex-end",
        alignItems: 'flex-end',
    },
    zoneNomMessageRecu: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'flex-start'
    },
    textDateNom: {
        fontSize: 12,
        color: 'grey'
    },
    zoneNewMessage: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        flexDirection: 'row',
    },
    inputText: {
        height: 70,
        width: 100,
    },
    envoiButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoneButton: {
        alignItems: 'center',

    }
});

export default Message