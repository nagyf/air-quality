import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PreferencesContext } from '../context/PreferencesContext';

export const InitLoadingScreen = ({ navigation }) => {
    const [preferences] = useContext(PreferencesContext);

    useEffect(() => {
        if (!preferences.loading) {
            navigation.navigate(preferences.hasPreferences ? 'App' : 'Init');
        }
    }, [preferences]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});