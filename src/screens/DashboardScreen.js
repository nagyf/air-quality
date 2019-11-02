import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import { PreferencesContext } from '../context/PreferencesContext';
import api from '../api';

export const DashboardScreen = ({ navigation }) => {
    const [preferences] = useContext(PreferencesContext);
    const [locations, setLocations] = useState([]);

    const getLatest = async () => {
        try {
            const response = await api.get(`/latest`, {
                params: {
                    country: preferences.country
                }
            });
            setLocations(response.data.results);
        } catch (err) {
            setLocations([]);
            console.log(err);
        }
    };

    useEffect(() => {
        getLatest();
    }, []);

    const markers = locations.map(location =>
        <Marker
            onPress={() => navigation.navigate('Measurements', {
                location
            })}
            key={location.location}
            coordinate={{ latitude: location.coordinates.latitude, longitude: location.coordinates.longitude }} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <MapView style={styles.map}>
                {markers}
            </MapView>
        </SafeAreaView>
    );
};

DashboardScreen.navigationOptions = {
    title: 'Dashboard'
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    }
});