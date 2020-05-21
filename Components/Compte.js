import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage, ImageBackground,SafeAreaView } from "react-native";
import { NavigationEvents } from "react-navigation";

class Compte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudoUser: "",
            mailUser: "",
            idUser: "",
            idAssocUser: "",
            villeUser:"",
        };
    }
    //<NavigationEvents onDidFocus={() => this.componentDidMount()} />
    componentDidMount() {
        this._loadInitialState().done();
        this.props.navigation.addListener('willFocus', this._loadInitialState().done());
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
        this.setState({ villeUser: value5});
    }

    deconnexion = async () => {
        AsyncStorage.clear();
        this.componentDidMount();
    }

    onBack = () => {
        this.componentDidMount();
    }

    render() {
        let testLog = this.state.pseudoUser;
        var nav = this.props;
        var deco = this.deconnexion;
        var back = this.onBack;
        const image = { source: "https://reactjs.org/logo-og.png" };



        function CheckSiCo() {
            if (testLog != null) {
                return (
                    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground
                            source={require('../img/backImage.jpg')}
                            style={{ width: '100%', height: '80%', resizeMode: 'repeat', justifyContent: 'center', alignItems: 'center', right: 20, top: 120, opacity: 0.2, position: 'absolute', }}
                        >
                        </ImageBackground>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity
                                onPress={deco}>
                                <Text style={styles.submitButton}>Déconnexion</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView >
                )
            } else {
                return (
                    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground
                            source={require('../img/backImage.jpg')}
                            style={styles.imgBack}
                        >
                        </ImageBackground>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity

                                onPress={() => nav.navigation.navigate('Inscription')}>
                                <Text style={styles.submitButton}>Inscription</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity
                                onPress={() => nav.navigation.navigate('Connexion', { onBack: back.bind(this) })}>
                                <Text style={styles.submitButton}>Connexion</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
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
        alignContent: 'center',

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

export default Compte