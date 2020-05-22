import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, Image, ImageBackground, SafeAreaView, AsyncStorage, ActivityIndicator } from 'react-native';

class AssocAutre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudoUser: "",
            mailUser: "",
            idUser: "",
            idAssocUser: "",
            listeAssoc: [],
            listeAssocCorrect: [],
            villeUser: "",
            load: 'true',
        }
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
            this.setState({ villeUser: value5 });
        }
    
        componentDidMount() {
            this.setState({ load: 'true' })
            this._loadInitialState().done();
            fetch('https://www.sapandfriends.be/flash/controller/appListeAssociationsAutreController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ listeAssoc: responseJson });
                    let tab = this.state.listeAssoc;
                    for (let i = 0; i < tab.length; i++) {
                        let image = tab[i]['img'].substring(2);
                        let lienImage = "https://www.sapandfriends.be/flash" + image;
                        tab[i]['img'] = lienImage;
                        if (this.state.villeUser != null) {
                            let ville = this.state.villeUser.slice(1);
                            let villeCorrect = ville.substring(0, ville.length - 1);
                            fetch('https://fr.distance24.org/route.json?stops=' + villeCorrect + '%7C' + tab[i]['adresse_assoc'], {
                                method: 'get',
                                header: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                }
                            })
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    //console.log(responseJson['distance'] + "km");
                                    tab[i]["distance"] = responseJson['distance'] + 'km';
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }else{
                            tab[i]["distance"] = "Besoin de connexion";
                        }
                    }
                    setTimeout(() => this.setState({ listeAssocCorrect: tab }), 1000);
                })
                .catch((error) => {
                    console.error(error);
                });
            setTimeout(() => this.setState({ load: 'false' }), 1500);
            console.log(this.state.listeAssocCorrect)
        }


    render() {

        if (this.state.load === "true") {
            return (
                <ActivityIndicator size="large" color="#6D071A" />
            )
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground
                        source={require('../img/backImage.jpg')}
                        style={{ width: '100%', height: '80%', resizeMode: 'repeat', justifyContent: 'center', alignItems: 'center', right: 20, top: 120, opacity: 0.2, position: 'absolute', }}
                    >
                    </ImageBackground>
                    <ScrollView style={styles.scroll}>
                        <FlatList
                            data={this.state.listeAssocCorrect}
                            keyExtractor={(item) => item.id_assoc}
                            renderItem={({ item }) =>
                                <View style={styles.caseAssoc}>
                                    <View>
                                        <Image
                                            style={styles.imgAssoc}
                                            source={{ uri: item.img }}
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
                                            <Text style={styles.styleDistance}>Distance : {item.distance}</Text>
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
                                </View>
                            }
                        />
                    </ScrollView>
                </SafeAreaView>
            )
        }


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
        top: 25,
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
        top: 10
    },
    typeStyle: {
        fontSize: 14,
        fontWeight: '400',
        top: 10
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
    },
    styleDistance: {
        fontSize: 14,
        top: 10
    }
});

export default AssocAutre