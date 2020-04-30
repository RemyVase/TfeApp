import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, Image } from 'react-native';
import Message from '../Components/Message';

const CONVERS = [
    {
        id: '1',
        nom: 'Toto',
        dernierMsg: 'Bonjour',
        date: "15/04/2020"
    },
    {
        id: '2',
        nom: 'Tata',
        dernierMsg: 'Ca va et toi ?',
        date: "17/04/2020"
    },
    {
        id: '3',
        nom: 'Tutu',
        dernierMsg: 'Yoyoyoyoyoooo',
        date: "04/03/2020"
    }
]
class Messagerie extends React.Component {

    constructor() {
        super();
    }

    render() {
        //const { navigation } = this.props;
        let test = {
            dernierMsg: "Yoyoyoyoyoooo",
            ok: "OKIDOKI"
        };
        return (

            <View>
                <ScrollView style={styles.scroll}>
                    <FlatList
                        data={CONVERS}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Message', {
                                        ok: item.dernierMsg
                                    })
                                }}>
                                <View style={styles.caseMessage}>
                                    <View style={styles.zoneNomContact}>
                                        <Text style={styles.nomContact}>{item.nom}</Text>
                                    </View>
                                    <View style={styles.zoneMessage}>
                                        <View style={styles.zoneLastMessage}>
                                            <Text style={styles.lastMsg}>{item.dernierMsg}</Text>
                                        </View>
                                        <View style={styles.zoneHeure}>
                                            <Text style={styles.dateMsg}>{item.date}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>}
                    />
                </ScrollView>
            </View>
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
    zoneLastMessage:{
        justifyContent: "flex-end",
        alignItems: 'flex-start'
    },
    zoneHeure: {
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    }
});

export default Messagerie