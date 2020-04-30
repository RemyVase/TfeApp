import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Inscription from '../Components/Inscription';
import Connexion from '../Components/Connexion';
import Messagerie from '../Components/Messagerie';
import Association from '../Components/Association';
import AssocChats from '../Components/AssocChats';
import AssocChiens from '../Components/AssocChiens';
import Message from '../Components/Message';
import MessageToAssoc from '../Components/MessageToAssoc';

const Tab = createBottomTabNavigator();
const CompteStack = createStackNavigator();
const AnimalSauveStack = createStackNavigator();
const MessagerieStack = createStackNavigator();
const AssociationStack = createStackNavigator();


function TypeAnimalTrouveScreen({ navigation }) {
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
function AnimalSauveScreen({ navigation }) {
  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.submitContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TypeAnimalTrouveScreen')}>
          <Text style={styles.submitButton}>Sauver un animal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CompteScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.submitContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Inscription')}>
          <Text style={styles.submitButton}>Inscription</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Connexion')}>
          <Text style={styles.submitButton}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CompteStackScreen() {
  return (
    <CompteStack.Navigator>
      <CompteStack.Screen name="Compte" component={CompteScreen} options={{ title: 'Compte', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      <CompteStack.Screen name="Inscription" component={Inscription} options={{ title: 'Inscription', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      <CompteStack.Screen name="Connexion" component={Connexion} options={{ title: 'Connexion', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
    </CompteStack.Navigator>
  );
}


function AnimalSauveStackScreen() {
  return (
    <AnimalSauveStack.Navigator>
      <AnimalSauveStack.Screen name="AnimalSauveScreen" component={AnimalSauveScreen} options={{ title: 'Sauver un animal', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      <AnimalSauveStack.Screen name="TypeAnimalTrouveScreen" component={TypeAnimalTrouveScreen} options={{ title: 'De quel type d\'animal s\'agit t\'il ?', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      <AnimalSauveStack.Screen name="AssocChats" component={AssocChats} options={{ title: 'Associations de chats', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      <AnimalSauveStack.Screen name="AssocChiens" component={AssocChiens} options={{ title: 'Associations de chiens', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      <AnimalSauveStack.Screen name="MessageToAssoc" component={MessageToAssoc} options={{ title: 'Message', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
    </AnimalSauveStack.Navigator>
  );
}

function MessagerieStackScreen() {
  return (
    <MessagerieStack.Navigator>
      <MessagerieStack.Screen name="Messagerie" component={Messagerie} options={{ title: 'Messagerie', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      <MessagerieStack.Screen name="Message" component={Message} options={{ title: 'Message', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
    </MessagerieStack.Navigator>
  );
}

function AssociationStackScreen() {
  return (
    <AssociationStack.Navigator>
      <AssociationStack.Screen name="Association" component={Association} options={{ title: 'Associations', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      <AssociationStack.Screen name="MessageToAssoc" component={MessageToAssoc} options={{ title: 'Message', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
    </AssociationStack.Navigator>
  );
}



function MyTabs() {
  return (

    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'grey',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: '#6D071A'
        }
      }}
    >
      <Tab.Screen
        name="AnimalTrouve"
        component={AnimalSauveStackScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert-octagon" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Association"
        component={AssociationStackScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messagerie"
        component={MessagerieStackScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Compte"
        component={CompteStackScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({

  container: {
    width: 155,
    height: 66,
    flex: 1
  },
  submitButton: {
    width: 100,
    borderRadius: 25,
    paddingVertical: 13,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  submitContainer:{
    backgroundColor: "#6D071A",
    borderRadius: 25,
    marginVertical: 10,
}

});

export default MyTabs;