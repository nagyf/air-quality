import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Picker, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import api from '../api';
import { PreferencesContext, createSetCity } from '../context/PreferencesContext';

export const SelectCityScreen = ({ navigation }) => {
    const [preferences, dispatch] = useContext(PreferencesContext);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState(preferences.city);

    const fetchCities = async () => {
        try {
            const response = await api.get(`/cities?limit=10000&country=${preferences.country}`);
            setCities(response.data.results.filter(o => !!o.name));
        } catch (err) {
            console.log(err);
        }
    };

    const selectCity = () => {
        dispatch(createSetCity(city));
        navigation.navigate('InitLoading');
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const items = cities.map(item => <Picker.Item key={item.name} label={item.name} value={item.name} />);

    return (
        <SafeAreaView style={styles.container}>
            <Picker selectedValue={city} onValueChange={city => setCity(city)}>
                {items}
            </Picker>
            <Button title='Next' onPress={selectCity} />
        </SafeAreaView>
    );
};

SelectCityScreen.navigationOptions = {
    title: 'Select a city/region'
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
