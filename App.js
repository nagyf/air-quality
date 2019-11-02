import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { InitLoadingScreen } from './src/screens/InitLoadingScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { SelectCountryScreen } from './src/screens/SelectCountryScreen';
import { PreferencesProvider } from './src/context/PreferencesContext';
import { SelectCityScreen } from './src/screens/SelectCityScreen';
import { MeasurementsScreen } from './src/screens/MeasurementsScreen';
import { TouchableOpacity } from 'react-native';
import { ParameterProvider } from './src/context/ParametersContext';

const uninitialized = createStackNavigator({
    Init: SelectCountryScreen,
    SelectCity: SelectCityScreen
});

const initialized = createStackNavigator({
    Dashboard: DashboardScreen,
    Measurements: MeasurementsScreen
}, {
    initialRouteKey: 'Dashboard',
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Init')}>
                        <Ionicons style={{ marginRight: 10 }} name='md-settings' size={24} color='#333' />
                    </TouchableOpacity>
                );
            }
        };
    }
});

const App = createAppContainer(
    createSwitchNavigator({
        InitLoading: InitLoadingScreen,
        Init: uninitialized,
        App: initialized
    })
);

export default () => {
    return (
        <ParameterProvider>
            <PreferencesProvider>
                <App />
            </PreferencesProvider>
        </ParameterProvider>
    );
};