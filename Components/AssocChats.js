import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, Image } from 'react-native';

const ASSOC = [
    {
        id: '1',
        nom: 'Inni',
        placesQ: '15',
        placesEO: '4',
        adresse: 'Charleroi',
        description: "blablablablablablablablabla",
        typeAnimal: 'Chats',
        logo: 'http://localhost:8878/TFE-RemyVase/TFE-Ephec-2019-2020/flash/img/img_assoc/chatAdopte7100462.jpeg'
    },
    {
        id: '2',
        nom: 'Cat à Cat',
        placesQ: '2',
        placesEO: '29',
        adresse: "La Louvière",
        description: "blublublublublublublublublublu",
        typeAnimal: 'Chats',
        logo: 'http://localhost:8878/TFE-RemyVase/TFE-Ephec-2019-2020/flash/img/img_assoc/chatAdopte7100462.jpeg'
    },
    {
        id: '3',
        nom: 'Chabidou',
        placesQ: '4',
        placesEO: '4',
        adresse: 'Pont-à-Celles',
        description: 'bliblibliblibliblibliblibliblibli',
        typeAnimal: 'Chiens',
        logo: 'http://localhost:8878/TFE-RemyVase/TFE-Ephec-2019-2020/flash/img/img_assoc/chatAdopte7100462.jpeg'
    }
]

class AssocChats extends React.Component {

    render() {
        return (
            <View>
                <ScrollView style={styles.scroll}>
                    <FlatList
                        data={ASSOC}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View style={styles.caseAssoc}>
                                <View>
                                    <Image
                                        style={styles.imgAssoc}
                                        source={{ uri: item.logo }}
                                    />
                                    <View style={styles.zonePlace}>
                                        <Text style={styles.stylePlaceTitre}>Places disponibles :</Text>
                                        <View>
                                            <Text style={styles.stylePlace}>Quarantaine : {item.placesQ}</Text>
                                            <Text style={styles.stylePlace}>Ordre : {item.placesEO}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.zoneText}>
                                    <View style={styles.zoneTitre}>
                                        <Text style={styles.nomAssoc}>{item.nom}</Text>
                                        <Text style={styles.adresseStyle}>Ville : {item.adresse}</Text>
                                        <Text style={styles.typeStyle}>Type d'animaux : {item.typeAnimal}</Text>
                                    </View>
                                    <View style={styles.zoneDesc}>
                                        <View style={styles.submitContainer}>
                                            <TouchableOpacity
                                                onPress={() => alert("Ahahahah")}>
                                                <Text style={styles.submitButton}>Contacter {item.nom}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>}
                    />
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    caseAssoc: {
        alignSelf: 'stretch',
        height: 250,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        //borderRadius: 25,
    },
    nomAssoc: {
        flex: 1,
        fontSize: 25,
        fontWeight: "500",
        top: 25
    },
    imgAssoc: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        marginTop: 7

    },
    scroll: {
        paddingLeft: 10,
        paddingRight: 10
    },
    zoneText: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoneTitre: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    zoneDesc: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    adresseStyle: {
        fontSize: 17,
        fontWeight: '400',
        marginTop: 10
    },
    typeStyle: {
        fontSize: 14,
        fontWeight: '400',
        marginTop: 3
    },
    zonePlace: {
        marginTop: 5,
        alignItems: 'center'
    },
    stylePlace: {
        fontSize: 14
    },
    stylePlaceTitre: {
        fontSize: 14,
        //fontWeight: '600',
        textDecorationLine: "underline",
        marginBottom: 2
    },
    submitButton: {
        width: 150,
        borderRadius: 25,
        marginVertical: 7,
        paddingVertical: 8,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    submitContainer: {
        backgroundColor: "#6D071A",
        borderRadius: 25,
    }
});

export default AssocChats