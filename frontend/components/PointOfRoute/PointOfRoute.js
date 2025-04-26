import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';
const SEARCH_RADIUS = 50000;

const PointOfRoute = ({ onAddressSelect, selectedAddress, onRemove, showRemoveButton }) => {
    const [searchQuery, setSearchQuery] = useState(selectedAddress || '');
    const [filteredAddress, setFilteredAddress] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const loadUserCity = async () => {
            try {
                const cachedData = await AsyncStorage.getItem('userData');
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    if (parsedData.city) {
                        const coords = await getCityCoordinates(parsedData.city);
                        if (coords) {
                            setUserLocation(coords);
                        }
                    }
                }
            } catch (e) {
                console.error("Ошибка загрузки города пользователя:", e);
            }
        };

        loadUserCity();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const getCityCoordinates = async (cityName) => {
        try {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/geocode/json',
                {
                    params: {
                        address: cityName,
                        key: API_KEY,
                        language: 'ru'
                    }
                }
            );

            if (response.data.results.length > 0) {
                return response.data.results[0].geometry.location;
            }
        } catch (error) {
            console.error('Ошибка получения координат города:', error);
        }
        return null;
    };

    const handleAddressSelect = (prediction) => {
        setSearchQuery(prediction.name);
        setFilteredAddress([]);
        setIsSearchFocused(false);
        onAddressSelect?.({
            place_id: prediction.id,
            name: prediction.name
        });
    };

    useEffect(() => {
        setSearchQuery(selectedAddress);
    }, [selectedAddress]);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.length > 0) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            
            timerRef.current = setTimeout(async () => {
                try {
                    const params = {
                        input: text,
                        key: API_KEY,
                        language: 'ru',
                        components: 'country:ru',
                    };

                    if (userLocation) {
                        params.location = `${userLocation.lat},${userLocation.lng}`;
                        params.radius = SEARCH_RADIUS;
                        params.strictbounds = true;
                    }

                    const response = await axios.get(
                        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
                        { params }
                    );

                    const predictions = response.data.predictions.map(prediction => ({
                        id: prediction.place_id,
                        name: prediction.description,
                    }));
                    
                    setFilteredAddress(predictions);
                } catch (error) {
                    console.error('Ошибка при загрузке мест:', error);
                    setFilteredAddress([]);
                }
            }, 300);
        } else {
            setFilteredAddress([]);
            onAddressSelect?.('');
        }
    };

    return (      
        <View style={styles.searchContainer}>
            <View style={styles.searchMain}>
                <Image
                    source={require('../../assets/addPointRoute/map.png')}
                    style={styles.mapIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Введите адрес"
                />
                
                {showRemoveButton && (
                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={onRemove}
                    >
                        <Image
                            source={require('../../assets/addPointRoute/delete.png')}
                            style={styles.deleteIcon}
                        />
                    </TouchableOpacity>
                )}

                {isSearchFocused && filteredAddress.length > 0 && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={filteredAddress}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleAddressSelect(item)}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyboardShouldPersistTaps="handled"
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default PointOfRoute;