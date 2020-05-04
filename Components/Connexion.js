import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage } from "react-native";
import { NavigationEvents } from "react-navigation";



class Connexion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: '',
            mdp: '',
        }
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

            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/connexionController.php', {
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
                            this.props.navigation.goBack();
                        } catch(error){
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
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Text style={styles.label}>Pseudo</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.pseudo}
                        onChangeText={(pseudo) => this.setState({ pseudo: pseudo })}
                    >
                    </TextInput>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.mdp}
                        onChangeText={(mdp) => this.setState({ mdp: mdp })}
                    >
                    </TextInput>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={this.connexion}>
                            <Text style={styles.submitButton}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
    },
    submitButton: {
        width: 100,
        borderRadius: 25,
        paddingVertical: 13,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    submitContainer: {
        backgroundColor: "#6D071A",
        borderRadius: 25,
        marginVertical: 10,
    },
    container2: {
        backgroundColor: "transparent",
        flexDirection: "row",
        paddingLeft: 16,
        borderColor: "#D9D5DC",
        borderBottomWidth: 1
    },
    label: {
        width: 223,
        height: 40,
        color: "#000",
        alignSelf: "flex-start",
        opacity: 0.5,
        paddingTop: 16,
        paddingBottom: 8,
        fontSize: 16,
        lineHeight: 16
    },
    inputStyle: {
        width: 282,
        height: 42,
        color: "#000",
        alignSelf: "stretch",
        paddingTop: 14,
        paddingRight: 5,
        paddingBottom: 8,
        paddingLeft: 30,
        fontSize: 16,
        lineHeight: 16
    }
});

export default Connexion