import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage } from "react-native";

class Compte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudoUser: "",
            mailUser: "",
            idUser: "",
            idAssocUser: "",
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
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
        alert(this.state.pseudoUser);
    }

    render() {
        let testLog = this.state.pseudoUser;
        var nav = this.props;

        async function deconnexion(){
            try {
                AsyncStorage.clear();
                return true;
            }
            catch(exception) {
                alert("marche pas");
                return false;
            }
        }

        function CheckSiCo() {
            if (testLog != null) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity
                                onPress={() => deconnexion()}>
                                <Text style={styles.submitButton}>Déconnexion</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            } else {
                return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={() => nav.navigation.navigate('Inscription')}>
                            <Text style={styles.submitButton}>Inscription</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            onPress={() => nav.navigation.navigate('Connexion')}>
                            <Text style={styles.submitButton}>Connexion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )
            }
        }

        return (
            <CheckSiCo />
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
    }
});

export default Compte