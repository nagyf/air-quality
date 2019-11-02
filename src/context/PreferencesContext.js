import React, { useReducer, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

const defaultPreferences = {
    loading: true,
    country: null,
    city: null
};

const PreferencesContext = React.createContext();

const createAction = (type, payload = null) => { return { type, payload } };
export const createNoPreferences = () => createAction('NO_PREFERENCES');
export const createSetCountry = (country) => createAction('SET_COUNTRY', country);
export const createSetCity = (city) => createAction('SET_CITY', city);

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...action.payload,
                loading: false,
                hasPreferences: true
            };
        case 'NO_PREFERENCES':
            return {
                ...defaultPreferences,
                loading: false,
                hasPreferences: false
            };
        case 'SET_COUNTRY':
            return {
                ...state,
                country: action.payload
            };
        case 'SET_CITY':
            const newState = {
                ...state,
                city: action.payload,
                hasPreferences: true
            };

            AsyncStorage.setItem('preferences', JSON.stringify(newState));

            return newState;
        default:
            console.warn(`Unknown action ${action.type}`);
            return state;
    }
};

const PreferencesProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultPreferences);

    useEffect(() => {
        AsyncStorage.getItem('preferences')
            .then(preferences => {
                preferences = JSON.parse(preferences);
                if (!!preferences) {
                    dispatch(createAction('INIT', preferences));
                } else {
                    dispatch(createNoPreferences());
                }
            })
            .catch(() => {
                dispatch(createNoPreferences());
            });
    }, []);

    return (
        <PreferencesContext.Provider value={[{ ...state }, dispatch]}>
            {props.children}
        </PreferencesContext.Provider>
    );
};

export { PreferencesContext, PreferencesProvider };