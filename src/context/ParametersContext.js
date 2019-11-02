import React, { useState, useEffect } from 'react';
import api from '../api';

const ParametersContext = React.createContext();

const ParameterProvider = (props) => {
    const [parameters, setParameters] = useState([]);

    const getParameters = async () => {
        try {
            const response = await api.get('/parameters');
            setParameters(response.data.results);
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        getParameters();
    }, []);

    return (
        <ParametersContext.Provider value={parameters}>
            {props.children}
        </ParametersContext.Provider>
    );
};

export { ParametersContext, ParameterProvider };