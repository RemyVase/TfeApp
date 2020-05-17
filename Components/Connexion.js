import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Image, AsyncStorage, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,ImageBackground } from "react-native";
import { NavigationEvents } from "react-navigation";



class Connexion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: '',
            mdp: '',
        }
    }

    componentWillUnmount() {
        this.props.navigation.navigate('Compte');
        this.props.route.params.onBack();
    }

    connexion = () => {
        const { pseudo } = this.state;
        const { mdp } = this.state;
        if (pseudo == "") {
            alert("Entrez votre pseudo");
        }
        else if (mdp == "") {
            alert("Entrez votre mot de passe.");
        }
        else {

            fetch('https://www.sapandfriends.be/flash/controller/appConnexionController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    pseudoUser: pseudo,
                    passwordUser: mdp,
                })

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson === "mdpPasOk") {
                        alert("Pseudo/Mail ou mot de passe incorrect.");
                    } else {
                        //alert(JSON.stringify(responseJson[0]["id_user"]));
                        try {
                            AsyncStorage.setItem('UserId', JSON.stringify(responseJson[0]["id_user"]));
                            AsyncStorage.setItem('UserEmail', JSON.stringify(responseJson[0]["mail_user"]));
                            AsyncStorage.setItem('UserPseudo', JSON.stringify(responseJson[0]["pseudo_user"]));
                            AsyncStorage.setItem('UserIdAssoc', JSON.stringify(responseJson[0]["id_assoc"]));
                            this.componentWillUnmount();
                            //this.props.navigation.navigate('Compte',{ onBack: onBack.bind(this) });
                        } catch (error) {
                            console.log(error);
                        }
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
                        <Text style={styles.label}>Mot de passe :</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.mdp}
                            secureTextEntry={true}
                            onChangeText={(mdp) => this.setState({ mdp: mdp })}
                        >
                        </TextInput>
                    </View>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={this.connexion}>
                            <Text style={styles.submitButton}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView >

        )
    }
}

const styles = StyleSheet.create({

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

export default Connexion