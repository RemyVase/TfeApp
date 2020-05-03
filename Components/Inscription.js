import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";

class Inscription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: '',
            email: '',
            mdp: '',
            confirmMdp: ''
        }
    }

    inscription = () => {
        const { pseudo } = this.state;
        const { email } = this.state;
        const { mdp } = this.state;
        const { confirmMdp } = this.state;
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
        else if(confirmMdp ==""){
            alert("Entrez votre confirmation de mot de passe.")
        }
        else if (mdp != confirmMdp) {
            alert("Les deux mots de passes doivent être identiques.")
        }
        else {

            fetch('http://localhost:8878/TFE-APP/TfeApp/Controller/inscriptionController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    pseudoUser: pseudo,
                    mailUser: email,
                    passwordUser: mdp,
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
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email: email })}
                    >
                    </TextInput>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.mdp}
                        //secureTextEntry={true}
                        onChangeText={(mdp) => this.setState({ mdp: mdp })}
                    >
                    </TextInput>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.confirmMdp}
                        //secureTextEntry={true}
                        onChangeText={(confirmMdp) => this.setState({ confirmMdp: confirmMdp })}
                    >
                    </TextInput>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={this.inscription}>
                            <Text style={styles.submitButton}>S'inscrire</Text>
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

export default Inscription