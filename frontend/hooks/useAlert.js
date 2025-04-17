import { useState } from 'react';

const useAlert = () => {
    const [alert, setAlert] = useState({ isVisible: false, type: '', title: '', message: '' });

    const showAlert = (type, title, message) => {
        setAlert({ isVisible: true, type, title, message });
    };

    const hideAlert = () => {
        setAlert({ isVisible: false, type: '', title: '', message: '' });
    };

    return { alert, showAlert, hideAlert };
};

export default useAlert;