import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


class TypeAnimalTrouve extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.submitContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AssocChats')}>
                        <Text style={styles.submitButton}>Chat</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AssocChiens')}>
                        <Text style={styles.submitButton}>Chien</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        width: 155,
        height: 66,
        flex: 1
    },
    submitButton: {
        backgroundColor: "#6D071A",
        width: 100,
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        textAlign: 'center',
        color: '#FFFFFF'
    }

});

export default TypeAnimalTrouve