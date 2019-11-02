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
                            <Text style={styles.title}>{parameter.name}: {item.value.toFixed(2)} {item.unit}</Text>
                            <Text style={styles.description}>{parameter.description}</Text>
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
    }
});