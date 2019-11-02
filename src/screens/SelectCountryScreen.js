import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Picker, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import api from '../api';
import { PreferencesContext, createSetCountry } from '../context/PreferencesContext';

export const SelectCountryScreen = ({ navigation }) => {
    const [preferences, dispatch] = useContext(PreferencesContext);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(preferences.country);

    const fetchCountries = async () => {
        try {
            const response = await api.get('/countries?limit=10000');
            setCountries(response.data.results.filter(o => !!o.name));
        } catch (err) {
            console.log(err);
        }
    };

    const selectCountry = () => {
        dispatch(createSetCountry(country));
        navigation.navigate('SelectCity');
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const items = countries.map(item => <Picker.Item key={item.code} label={item.name} value={item.code} />);

    return (
        <SafeAreaView style={styles.container}>
            <Picker selectedValue={country} onValueChange={country => setCountry(country)}>
                {items}
            </Picker>
            <Button title='Next' onPress={selectCountry} />
        </SafeAreaView>
    );
};

SelectCountryScreen.navigationOptions = {
    title: 'Select a country'
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
