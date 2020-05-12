import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, Image, AsyncStorage, ImageBackground, SafeAreaView } from 'react-native';
import Message from '../Components/Message';
import { format } from "date-fns";

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
            pseudoAssocConvers: "",
            listConversCorrect: [],
        }
    }

    componentDidMount() {
        const checkSiRetourSurCetEcran = this.props.navigation.addListener('focus', e => {
            this._loadInitialState().done();
            //let tab = this.recupNomOuAssoc();
            this.setState({ listConversCorrect: this.recupNomOuAssoc() });

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

        //ICI JE RECUPERE LES CONVERSATIONS (Ancienne fonction copiée collée pour limiter les setState différents)
        var userId = await AsyncStorage.getItem('UserId');
        var userIdAssoc = await AsyncStorage.getItem('UserIdAssoc');
        if (userIdAssoc === "null") {
            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appListeConversationUserController.php', {
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
            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appListeConversationUserAssocController.php', {
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

    getParsedDate(date) {
        date = String(date).split(' ');
        let dateSH = String(date[0]).split('-');
        let jour = "";
        let mois = "";

        let belleDate = dateSH[2] + '-' + dateSH[1] + '-' + parseInt(dateSH[0]);
        return belleDate;
    }

    //Fonction permettant de savoir si l'utilisateur est le dernier envoyeur afin d'afficher un bon nom de conversation
    recupNomOuAssoc() {
        let tab = this.state.listConvers;
        //Boucle pour parcourir la liste de conversation
        for (let i = 0; i < tab.length; i++) {
            var pseudoEnvoyeur = '"' + tab[i]['pseudo_user'] + '"';
            //Si l'utilisateur connecté est l'envoyeur du dernier message j'essaie de récupérer le pseudo de l'utilisateur à qui il parle ou celui de l'association à qui il parle
            if (pseudoEnvoyeur === this.state.pseudoUser) {

                fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appRecupPseudoUserController.php', {
                    method: 'post',
                    header: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: '{"idConv": "' + tab[i]['id_convers'] + '"}'
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //Je place le pseudo de l'utilisateur dans un state pour pouvoir le récupérer
                        if (responseJson[0] === undefined) {

                            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appRecupPseudoAssocController.php', {
                                method: 'post',
                                header: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                },
                                body: '{"idConv": "' + tab[i]['id_convers'] + '", "idAssocCo" : ' + (this.state.idAssocUser === "null" ? 3000000 : this.state.idAssocUser) + '}'
                            })
                                .then((response) => response.json())
                                .then((responseJson2) => {
                                    //Je place le pseudo de l'utilisateur dans un state pour pouvoir le récupérer
                                    if (responseJson2[0] != undefined) {
                                        pseudoAssocConvers = responseJson2[0]["nom_assoc"];
                                        tab[i]["pseudo_user"] = pseudoAssocConvers;
                                        tab[i]['lu_destinataire'] = "1";
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });

                        } else if ('"' + responseJson[0]['pseudo_user'] + '"' === this.state.pseudoUser) {
                            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appRecupPseudoAssocController.php', {
                                method: 'post',
                                header: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                },
                                body: '{"idConv": "' + tab[i]['id_convers'] + '", "idAssocCo" : ' + (this.state.idAssocUser === "null" ? 3000000 : this.state.idAssocUser) + '}'
                            })
                                .then((response) => response.json())
                                .then((responseJson2) => {
                                    //Je place le pseudo de l'utilisateur dans un state pour pouvoir le récupérer
                                    if (responseJson2[0] != undefined) {
                                        pseudoAssocConvers = responseJson2[0]["nom_assoc"];
                                        tab[i]["pseudo_user"] = pseudoAssocConvers;
                                        tab[i]['lu_destinataire'] = "1";
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                        else {
                            pseudoUserConvers = responseJson[0]["pseudo_user"];
                            tab[i]["pseudo_user"] = responseJson[0]["pseudo_user"];
                            tab[i]['lu_destinataire'] = "1";
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                tab[i]['lu_destinataire'] = "1";
                //Je remplace le pseudo envoyeur par le bon pseudo pour bien afficher
                //On ne peux modifier directement l'array du state donc je créé un nouveau tableau sur base de celui du state et je le modifier avant de setstate
            } else {
                fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appCheckUserIntoAssocController.php', {
                    method: 'post',
                    header: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: '{"idEnvoyeur": "' + tab[i]['id_envoyeur'] + '"}'
                })
                    .then((response) => response.json())
                    .then((responseJson3) => {
                        if (responseJson3[0][0] != null) {
                            if ('"' + responseJson3[0]['id_assoc'] + '"' === this.state.idAssocUser) {
                                fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appCheckUserMessageController.php', {
                                    method: 'post',
                                    header: {
                                        'Accept': 'application/json',
                                        'Content-type': 'application/json'
                                    },
                                    body: '{"idConv": ' + tab[i]['id_convers'] + '}'
                                })
                                    .then((response) => response.json())
                                    .then((responseJson2) => {
                                        if (responseJson2[0] != undefined) {

                                            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appRecupPseudoUserController.php', {
                                                method: 'post',
                                                header: {
                                                    'Accept': 'application/json',
                                                    'Content-type': 'application/json'
                                                },
                                                body: '{"idConv": "' + tab[i]['id_convers'] + '"}'
                                            })
                                                .then((response) => response.json())
                                                .then((responseJson) => {
                                                    pseudoUserConvers = responseJson[0]["pseudo_user"];
                                                    tab[i]["pseudo_user"] = responseJson[0]["pseudo_user"];
                                                    tab[i]['lu_destinataire'] = "1";
                                                })
                                        } else {
                                            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appRecupPseudoAssocController.php', {
                                                method: 'post',
                                                header: {
                                                    'Accept': 'application/json',
                                                    'Content-type': 'application/json'
                                                },
                                                body: '{"idConv": "' + tab[i]['id_convers'] + '", "idAssocCo" : ' + (this.state.idAssocUser === "null" ? 3000000 : this.state.idAssocUser) + '}'
                                            })
                                                .then((response) => response.json())
                                                .then((responseJson2) => {
                                                    //Je place le pseudo de l'utilisateur dans un state pour pouvoir le récupérer
                                                    if (responseJson2[0] != undefined) {
                                                        pseudoAssocConvers = responseJson2[0]["nom_assoc"];
                                                        tab[i]["pseudo_user"] = pseudoAssocConvers;
                                                        tab[i]['lu_destinataire'] = "1";
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.error(error);
                                                });
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                                tab[i]['lu_destinataire'] = "1";
                            } else {
                                fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appRecupPseudoAssocController.php', {
                                    method: 'post',
                                    header: {
                                        'Accept': 'application/json',
                                        'Content-type': 'application/json'
                                    },
                                    body: '{"idConv": "' + tab[i]['id_convers'] + '", "idAssocCo" : ' + (this.state.idAssocUser === "null" ? 3000000 : this.state.idAssocUser) + '}'
                                })
                                    .then((response) => response.json())
                                    .then((responseJson2) => {
                                        //Je place le pseudo de l'utilisateur dans un state pour pouvoir le récupérer
                                        if (responseJson2[0] != undefined) {
                                            pseudoAssocConvers = responseJson2[0]["nom_assoc"];
                                            tab[i]["pseudo_user"] = pseudoAssocConvers;
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });

                            }
                        } else {
                            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appRecupPseudoAssocController.php', {
                                method: 'post',
                                header: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                },
                                body: '{"idConv": "' + tab[i]['id_convers'] + '", "idAssocCo" : ' + (this.state.idAssocUser === "null" ? 3000000 : this.state.idAssocUser) + '}'
                            })
                                .then((response) => response.json())
                                .then((responseJson2) => {
                                    //Je place le pseudo de l'utilisateur dans un state pour pouvoir le récupérer
                                    if (responseJson2[0] != undefined) {
                                        pseudoAssocConvers = responseJson2[0]["nom_assoc"];
                                        tab[i]["pseudo_user"] = pseudoAssocConvers;
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });

                        }
                    });
            }
            let date = this.getParsedDate(tab[i]["date_message"]);
            tab[i]['date_message'] = date;
        }
        return tab;
    }

    render() {
        const testLog = this.state.pseudoUser;
        const estDansAssoc = this.state.idAssocUser;
        var nav = this.props;
        var state = this.state;
        var tis = this;
        const Entities = require('html-entities').AllHtmlEntities;
        const entities = new Entities();

        function CheckSiCo() {
            if (testLog != null) {
                if (state.idAssocUser === "null") {
                    return (
                        <SafeAreaView style={{ flex: 1 }}>
                            <ImageBackground
                                source={require('../img/backImage.jpg')}
                                style={{ width: '100%', height: '80%', resizeMode: 'repeat', justifyContent: 'center', alignItems: 'center', right: 20, top: 120, opacity: 0.2, position: 'absolute', }}
                            >
                            </ImageBackground>
                            <ScrollView style={styles.scroll}>
                                <FlatList
                                    data={state.listConversCorrect}
                                    keyExtractor={(item) => item.id_convers.toString()}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => {
                                                nav.navigation.navigate('Message', {
                                                    idConv: item.id_convers
                                                })
                                            }}>
                                            <View style={
                                                item.lu_destinataire === "1" ? styles.caseMessage : styles.caseMessage2
                                            }>
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
                        </SafeAreaView>
                    )
                } else {
                    return (
                        <SafeAreaView style={{ flex: 1 }}>
                            <ImageBackground
                                source={require('../img/backImage.jpg')}
                                style={{ width: '100%', height: '80%', resizeMode: 'repeat', justifyContent: 'center', alignItems: 'center', right: 20, top: 120, opacity: 0.2, position: 'absolute', }}
                            >
                            </ImageBackground>
                            <ScrollView style={styles.scroll}>
                                <FlatList
                                    data={state.listConversCorrect}
                                    keyExtractor={(item) => item.id_convers.toString()}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => {
                                                nav.navigation.navigate('Message', {
                                                    idConv: item.id_convers
                                                })
                                            }}>
                                            <View style={
                                                item.lu_destinataire === "1" ? styles.caseMessage : styles.caseMessage2
                                            }>
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
                        </SafeAreaView>
                    )

                }

            } else {
                return (
                    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.messageAlert}>Vous devez vous connecter pour pouvoir accéder à votre messagerie.</Text>
                    </SafeAreaView>
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
        flex: 1,
        flexDirection: 'column',
        borderRadius: 25,
        backgroundColor: 'white',
        borderWidth: 0.3,
        marginTop: 10,
        opacity: 0.9,
        shadowColor: "#000",
        shadowOpacity: 0.58,
        shadowRadius: 1,
        elevation: -24,
    },
    caseMessage2: {
        alignSelf: 'stretch',
        height: 80,
        flex: 1,
        flexDirection: 'column',
        borderRadius: 25,
        backgroundColor: '#FAA697',
        borderWidth: 0.3,
        marginTop: 10,
        opacity: 0.9,
        shadowColor: "#000",
        shadowOpacity: 0.58,
        shadowRadius: 1,
        elevation: -24,
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
        marginRight: 10,
        marginBottom: 5
    },
    lastMsg: {
        fontSize: 15,
        color: 'grey',
        marginLeft: 10,
        marginBottom: 5,
    },
    zoneMessage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    zoneNomContact: {
        flex: 1,
        marginLeft: 10
    },
    zoneLastMessage: {
        justifyContent: "flex-end",
        alignItems: 'flex-start',
        width: 180
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
    },
    imgBack: {
        width: '100%',
        height: '80%',
        resizeMode: 'repeat',
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        top: 120,
        opacity: 0.2,
        position: 'absolute',
    }
});

export default Messagerie