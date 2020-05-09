import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Image, AsyncStorage } from "react-native";

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
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
        fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/listeMessageController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: '{"idConv": ' + this.props.route.params.idConv + '}'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ listMessage: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });

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

        let tab = this.state.listMessage;
        let date = "";
        for (let i = 0; i < tab.length; i++) {
            date = this.getParsedDate(tab[i]['date_message']);
            tab[i]['date_message'] = date;
        }
        this.setState({ listMessage: tab });
        this.messageLu();
    }

    envoieMessage() {
        fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/envoieMessageMessagerieController.php', {
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
        fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/messageLuController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: '{"idUserCo": ' + this.state.idUser + ', "idConv" : ' + this.props.route.params.idConv + ', "idAssocUserCo":' + this.state.idAssocUser + '}'
        })
            .then((response) => response.json())
            .then((responseJson) => {
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

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.scroll}
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
            </View >



        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    messageRecu: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'flex-start',
        marginTop: 15,
        width: 250,
        flex: 1,
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
        flex: 1,
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
        flex: 1,
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
        flex: 0.1,
        borderTopWidth: 1,
        flexDirection: 'row',
    },
    inputText: {
        flex: 0.7,
        width: 100,
    },
    envoiButton: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoneButton: {
        alignItems: 'center',

    }
});

export default Message