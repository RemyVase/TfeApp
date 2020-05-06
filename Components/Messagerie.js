import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, Image, AsyncStorage } from 'react-native';
import Message from '../Components/Message';

class Messagerie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudoUser: "",
            mailUser: "",
            idUser: 0,
            idAssocUser: "",
            listConvers: [],
            //Si le dernier message vient de la personne connectée il me faut le pseudo de l'autre personne ou assoc à qui la personne connectée parle
            //J'utilise un state por récupérer la donnée de mon fetch
            pseudoConvers: "",
            //Pareil il me faut un state pour stocker et sortir la valeur de mon fetch 
            pseudoUserConvers: "",
        }
    }


    componentDidMount() {
        const checkSiRetourSurCetEcran = this.props.navigation.addListener('focus', e => {
            this._loadInitialState().done();
            this._recupAllConv().done();
            this.recupNomOuAssoc().done();
        });

    }

    _recupAllConv = async () => {
        var userId = await AsyncStorage.getItem('UserId');
        var userIdAssoc = await AsyncStorage.getItem('UserIdAssoc');
        if (userIdAssoc === "null") {
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
        } else {
            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/listeConversationUserAssocController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: '{"idUserAssoc": ' + userIdAssoc + '}'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ listConvers: responseJson });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
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

    //Fonction permettant de savoir si l'utilisateur est le dernier envoyeur afin d'afficher un bon nom de conversation
    recupNomOuAssoc = async () => {
        //Boucle pour parcourir la liste de conversation
        for (let i = 0; i < this.state.listConvers.length; i++) {
            var pseudoEnvoyeur = '"' + this.state.listConvers[i]['pseudo_user'] + '"';
            //Si l'utilisateur connecté est l'envoyeur du dernier message j'essaie de récupérer le pseudo de l'utilisateur à qui il parle ou celui de l'association à qui il parle
            if (pseudoEnvoyeur === this.state.pseudoUser) {
                let pseudoConvers = "";
                //alert(this.state.listConvers[i]['id_convers']);
                //alert("pseudo connecté");
                //Vu que l'utilisateur connecté est l'envoyeur du dernier message je vérifie d'abord si l'envoyeur est un user, 
                //si le fetch retourne quelque chose c'est que c'est un user normal et pas une assoc
                fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/checkUserMessageController.php', {
                    method: 'post',
                    header: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: '{"idConv": "' + this.state.listConvers[i]['id_convers'] + '"}'
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        pseudoConvers = responseJson[0]["id_user"];
                        if(pseudoConvers === []){
                            this.setState({pseudoConvers : "null"});
                        }else{
                            this.setState({pseudoConvers : pseudoConvers});
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                // Si le résultat du fetch est non null ca veut dire que l'envoyeur est un utilisateur je vais donc faire un fetch pour récupérer son pseudo
                if(this.state.pseudoConvers != "null"){
                    fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/recupPseudoUserController.php', {
                    method: 'post',
                    header: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: '{"idConv": "' + this.state.listConvers[i]['id_convers'] + '"}'
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //Je place le pseudo de l'utilisateur dans un state pour pouvoir le récupérer
                        pseudoUserConvers = responseJson[0]["pseudo_user"];
                            this.setState({pseudoUserConvers : pseudoUserConvers});
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                    //Je remplace le pseudo envoyeur par le bon pseudo pour bien afficher
                    //On ne peux modifier directement l'array du state donc je créé un nouveau tableau sur base de celui du state et je le modifier avant de setstate
                    let tab = this.state.listConvers;
                    tab[i]['pseudo_user'] = this.state.pseudoUserConvers;
                    this.setState({listConvers : tab});
                    //this.state.listConvers[i]['pseudo_user'] = this.state.pseudoUserConvers;
                    //alert(this.state.listConvers[i]['pseudo_user']);
                }
                //Le else ici c'est pour dire que si le premier fetch vérifiant si l'envoyeur était juste un simple utilisateur n'est pas concluant c'est que c'est une assoc qui a envoyé le message
                else{
                    // faire un fetch pour récupérer l'id de l'assoc 

                    //Ensuite refaire un fetch pour récupérer le nom de l'assoc

                }
            } else {
                //Afficher le pseudo de l'utilisateur d'en face ou de l'assoc d'en face
                //alert("Pas pseudo connecté");
            }
        }
    }

    render() {
        const testLog = this.state.pseudoUser;
        const estDansAssoc = this.state.idAssocUser;
        var nav = this.props;
        var state = this.state;
        const Entities = require('html-entities').AllHtmlEntities;
        const entities = new Entities();

        function CheckSiCo() {
            if (testLog != null) {
                if (state.idAssocUser === "null") {
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
                                                    <Text style={styles.nomContact}>{item.pseudo_user}</Text>
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

                }

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