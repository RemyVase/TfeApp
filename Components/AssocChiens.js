import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, Image, ImageBackground,SafeAreaView } from 'react-native';

class AssocChiens extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pseudoUser: "",
            mailUser: "",
            idUser: "",
            idAssocUser: "",
            listeAssoc: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/appListeAssociationsChiensController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ listeAssoc: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../img/backImage.jpg')}
                    style={{ width: '100%', height: '80%', resizeMode: 'repeat', justifyContent: 'center', alignItems: 'center', right: 20, top: 120, opacity: 0.2, position: 'absolute', }}
                >
                </ImageBackground>
                <ScrollView style={styles.scroll}>
                    <FlatList
                        data={this.state.listeAssoc}
                        keyExtractor={(item) => item.id_assoc}
                        renderItem={({ item }) =>
                            <View style={styles.caseAssoc}>
                                <View>
                                    <Image
                                        style={styles.imgAssoc}
                                        source={{ uri: 'http://localhost:8878/TFE-RemyVase/TFE-Ephec-2019-2020/flash/img/img_assoc/chatAdopte7100462.jpeg' }}
                                    />
                                    <View style={styles.zonePlace}>
                                        <Text style={styles.stylePlaceTitre}>Places disponibles :</Text>
                                        <View>
                                            <Text style={styles.stylePlace}>Quarantaine : {item.nbPlaceQuarant_assoc}</Text>
                                            <Text style={styles.stylePlace}>Ordre : {item.nbPlaceRegle_assoc}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.zoneText}>
                                    <View style={styles.zoneTitre}>
                                        <Text style={styles.nomAssoc}>{item.nom_assoc}</Text>
                                        <Text style={styles.adresseStyle}>Ville : {item.adresse_assoc}</Text>
                                        <Text style={styles.typeStyle}>Type d'animaux : {item.typeAnimal_assoc}</Text>
                                    </View>
                                    <View style={styles.zoneDesc}>
                                        <View style={styles.submitContainer}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.props.navigation.navigate('MessageToAssoc', {
                                                        idAssoc: item.id_assoc
                                                    })
                                                }}>
                                                <Text style={styles.submitButton}>Contacter {item.nom}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    caseAssoc: {
        alignSelf: 'stretch',
        height: 250,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 25,
        opacity: 0.9,
        marginBottom: 10,
        marginTop: 5

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
        marginTop: 7,
        left: 5

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

export default AssocChiens