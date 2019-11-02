import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ParametersContext } from '../context/ParametersContext';

export const MeasurementsScreen = ({ navigation }) => {
    const parameters = useContext(ParametersContext);
    const location = navigation.getParam('location');

    return (
        <View style={styles.container}>
            <FlatList
                data={location.measurements}
                keyExtractor={item => item.parameter}
                renderItem={({ item }) => {
                    const parameter = parameters.find(p => p.id === item.parameter);

                    return (
                        <View key={item.parameter} style={styles.card}>
                            <View style={styles.left}>
                                <Text style={styles.title}>{parameter.name}</Text>
                                <Text style={styles.description}>{parameter.description}</Text>
                            </View>
                            <View  style={styles.right}>
                            <Text style={styles.value}>{item.value.toFixed(2)} {item.unit}</Text>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

MeasurementsScreen.navigationOptions = {
    title: 'Measurements'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 18
    },
    description: {
        fontSize: 14,
        color: '#444'
    },
    value: {
        fontSize: 18
    },
    left: {
        flex: 1
    },
    right: {
        paddingLeft: 10
    }
});