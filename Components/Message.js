import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, TextInput } from "react-native";

const MESSAGES = [
    {
        id: '1',
        nom: 'Toto',
        msg: 'Bonjour',
        date: "15/04/2020",
        envoyeur: 1
    },
    {
        id: '2',
        nom: 'Moi',
        msg: 'Ca va et toi ?',
        date: "17/04/2020",
        envoyeur: 1
    },
    {
        id: '3',
        nom: 'Toto',
        msg: 'Tranquille la vie avec win for life',
        date: "04/03/2020",
        envoyeur: 0
    }
]

class Message extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        // RECUPERE LES DATAS DE MESSAGERIE (3H30 DE PERDU POUR des '', Courage à moi)
        const { test } = this.props.route.params;
        console.log(this.props.route.params.ok);
        //////////////////////////////////////////////////////////////////////////////

        //const [text, setText] = useState('');
        function TriMsg(props) {
            const envoyeur = props.envoyeur;
            const date = props.date;
            const nom = props.nom;
            const msg = props.msg;
            if (envoyeur) {
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
                <ScrollView style={styles.scroll}>
                    <FlatList
                        data={MESSAGES}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <TriMsg envoyeur={item.envoyeur} date={item.date} nom={item.nom} msg={item.msg} />
                        }
                    />
                </ScrollView>
                <View style={styles.zoneNewMessage}>
                    <View style={styles.inputText}>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Type here to translate!"

                        />
                    </View>
                    <View>
                        
                    </View>
                </View>
            </View>



        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 0.7,
    },
    messageRecu: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'flex-start',
        marginTop: 15,
        width: 200,
        flex: 1,
    },
    alignementDroitEnvoye: {
        alignItems: 'flex-end',
    },
    messageEnvoye: {
        backgroundColor: '#FAA697',
        borderRadius: 15,
        marginTop: 15,
        flex: 1,
        width: 200,
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
        backgroundColor: 'blue',
        flex: 0.1,
        borderTopWidth: 1,
        flexDirection: 'row',
    },
    inputText:{
        flex: 0.8,
        backgroundColor : 'green',
    }
});

export default Message