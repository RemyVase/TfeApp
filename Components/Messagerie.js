import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, Image, AsyncStorage } from 'react-native';
import Message from '../Components/Message';

class Messagerie extends React.Component {

    constructor() {
        super();
        this.state = {
            pseudoUser: "",
            mailUser: "",
            idUser: 0,
            idAssocUser: "",
            listConvers: [],
        }
    }


    componentDidMount() {
        const checkSiRetourSurCetEcran = this.props.navigation.addListener('focus', e => {
            this._loadInitialState().done();
            this._recupAllConv().done();
        });

    }

    refresh = () => {
        this.componentDidMount();
    }

    _recupAllConv = async () => {
        var userId = await AsyncStorage.getItem('UserId');
        fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/listeConversationUserController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: '{"idUser": ' + userId + '}'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ listConvers: responseJson });
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

        this.setState({ idUser: parseInt(value) });
        this.setState({ mailUser: value2 });
        this.setState({ pseudoUser: value3 });
        this.setState({ idAssocUser: value4 });
    }





    render() {
        let testLog = this.state.pseudoUser;
        var nav = this.props;
        var state = this.state;
        const Entities = require('html-entities').AllHtmlEntities;
        const entities = new Entities();

        function CheckSiCo() {
            if (testLog != null) {
                return (
                    <View>
                        <ScrollView style={styles.scroll}>
                            <FlatList
                                data={state.listConvers}
                                keyExtractor={(item) => item.id_user.toString()}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            nav.navigation.navigate('Message', {
                                                ok: item.dernierMsg
                                            })
                                        }}>
                                        <View style={styles.caseMessage}>
                                            <View style={styles.zoneNomContact}>
                                                <Text style={styles.nomContact}>{item.nom_assoc}</Text>
                                            </View>
                                            <View style={styles.zoneMessage}>
                                                <View style={styles.zoneLastMessage}>
                                                    <Text style={styles.lastMsg}>{entities.decode(item.contenu_message)}</Text>
                                                </View>
                                                <View style={styles.zoneHeure}>
                                                    <Text style={styles.dateMsg}>{item.date_message}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>}
                            />
                        </ScrollView>
                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.messageAlert}>Vous devez vous connecter pour pouvoir accéder à votre messagerie.</Text>
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
    caseMessage: {
        alignSelf: 'stretch',
        height: 80,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'column',
        //borderRadius: 25,
    },
    scroll: {
        paddingLeft: 10,
        paddingRight: 10
    },
    nomContact: {
        fontSize: 23,
        fontWeight: '600',
        marginTop: 5,
        marginLeft: 5
    },
    dateMsg: {
        fontSize: 15,
        color: 'grey',
        marginRight: 5,
        marginBottom: 5
    },
    lastMsg: {
        fontSize: 15,
        color: 'grey',
        marginLeft: 5,
        marginBottom: 5,
    },
    zoneMessage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    zoneNomContact: {
        flex: 1,
    },
    zoneLastMessage: {
        justifyContent: "flex-end",
        alignItems: 'flex-start'
    },
    zoneHeure: {
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    },
    messageAlert: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Messagerie