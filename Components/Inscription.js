import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Image, AsyncStorage, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,ImageBackground } from "react-native";

class Inscription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: '',
            email: '',
            mdp: '',
            confirmMdp: '',
            ville: '',
        }
    }

    inscription = () => {
        const { pseudo } = this.state;
        const { email } = this.state;
        const { mdp } = this.state;
        const { confirmMdp } = this.state;
        const {ville } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == "") {
            alert('Entrez votre adresse mail.');
        }

        else if (reg.test(email) === false) {
            alert("l'adresse mail entrée n'est pas correct.");
            return false;
        }
        else if (pseudo == "") {
            alert("Entrez un pseudo");
        }
        else if (mdp == "") {
            alert("Entrez votre mot de passe.");
        }
        else if (confirmMdp == "") {
            alert("Entrez votre confirmation de mot de passe.")
        }
        else if (mdp != confirmMdp) {
            alert("Les deux mots de passes doivent être identiques.")
        }
        else if(ville == ""){
            alert("Entrez votre ville.");
        }
        else {

            fetch('https://www.sapandfriends.be/flash/controller/appInscriptionController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    pseudoUser: pseudo,
                    mailUser: email,
                    passwordUser: mdp,
                    villeUser : ville,
                })

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson === "ok") {
                        alert('Le compte a bien été créé.');
                    } else if (responseJson === "mailPseudoPasOk") {
                        alert('Le mail et le pseudo sont déjà utilisés.');
                    } else if (responseJson === "mailPasOk") {
                        alert('Le mail est déjà utilisé.');
                    } else if (responseJson === "pseudoPasOk") {
                        alert('Le pseudo est déjà utilisé.');
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS == "ios" ? "padding" : 1000}
                keyboardVerticalOffset={64}
            >
                <ImageBackground
                    source={require('../img/backImage.jpg')}
                    style={{ width: '100%', height: '80%', resizeMode: 'repeat', justifyContent: 'center', alignItems: 'center', right: 20, top: 120, opacity: 0.2, position: 'absolute', }}
                >
                </ImageBackground>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.container2}>
                        <Text style={styles.label}>Pseudo :</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.pseudo}
                            onChangeText={(pseudo) => this.setState({ pseudo: pseudo })}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.label}>Email :</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email: email })}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.label}>Votre ville :</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.ville}
                            onChangeText={(ville) => this.setState({ ville: ville })}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.label}>Mot de passe :</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.mdp}
                            secureTextEntry={true}
                            onChangeText={(mdp) => this.setState({ mdp: mdp })}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.label}>Mot de passe :</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.confirmMdp}
                            secureTextEntry={true}
                            onChangeText={(confirmMdp) => this.setState({ confirmMdp: confirmMdp })}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={this.inscription}>
                            <Text style={styles.submitButton}>S'inscrire</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    submitButton: {
        width: 100,
        borderRadius: 25,
        paddingVertical: 13,
        textAlign: 'center',
        color: '#FFFFFF',

    },
    submitContainer: {
        backgroundColor: "#6D071A",
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
    },
    container2: {
        backgroundColor: "white",
        flexDirection: "row",
        paddingLeft: 16,
        borderColor: "#D9D5DC",
        borderWidth: 1,
        borderRadius: 30,
        width: 320,
        opacity: 0.9,
        marginTop: 10
    },
    label: {
        width: 110,
        height: 40,
        color: "#000",
        alignSelf: "flex-start",
        opacity: 0.5,
        paddingTop: 16,
        paddingBottom: 8,
        fontSize: 16,
        lineHeight: 16,
    },
    inputStyle: {
        width: 180,
        height: 42,
        color: "#000",
        alignSelf: "stretch",
        paddingTop: 14,
        paddingRight: 5,
        paddingBottom: 8,
        paddingLeft: 30,
        fontSize: 16,
        lineHeight: 16,
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

export default Inscription