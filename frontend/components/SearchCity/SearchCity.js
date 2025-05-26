import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';

const SearchCity = ({ onCitySelect, selectedCity }) => {
    const [searchQuery, setSearchQuery] = useState(selectedCity || '');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cityCoordinates, setCityCoordinates] = useState(null);

    const timerRef = useRef(null);

    const extractCityName = (fullAddress) => {
        return fullAddress.split(',')[0].trim();
    };

    useEffect(() => {
        const loadUserCity = async () => {
            try {
                const cachedData = await AsyncStorage.getItem('userData');
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    if (parsedData.city) {
                        setSearchQuery(parsedData.city);
                        await fetchCityCoordinates(parsedData.city);
                    }
                }
            } catch (e) {
                console.error("Ошибка загрузки города пользователя:", e);
            }
        };
    
        loadUserCity();
        return () => clearTimeout(timerRef.current);
    }, []);

    const fetchCityCoordinates = async (cityName) => {
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
                const location = response.data.results[0].geometry.location;
                setCityCoordinates({ lat: location.lat, lng: location.lng });
                fetchCities(searchQuery, location); 
            }
        } catch (error) {
            console.error('Ошибка получения координат:', error);
        }
    };

    
    const getLatLngFromCity = async (city) => {
        try {
            const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: `${city}, Россия`,
                    key: API_KEY,
                    language: 'ru'
                }
            });
        
            if (res.data.results.length > 0) {
                return res.data.results[0].geometry.location;
            }
        } catch (e) {
            console.error("Ошибка получения координат города:", e);
        }
        
        return null; 
    };
    

    const fetchCities = async (query, locationOverride = null) => {
        setIsLoading(true);
        try {
            const locationParam = locationOverride
                ? `${locationOverride.lat},${locationOverride.lng}`
                : cityCoordinates
                ? `${cityCoordinates.lat},${cityCoordinates.lng}`
                : null;
    
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/place/autocomplete/json',
                {
                    params: {
                        input: query,
                        types: '(regions)',
                        language: 'ru',
                        components: 'country:ru',
                        key: API_KEY,
                        ...(locationParam && { location: locationParam, radius: 50000 })
                    }
                }
            );
    
            const cities = response.data.predictions.map(prediction => ({
                id: prediction.place_id,
                name: prediction.description,
                shortName: extractCityName(prediction.description)
            }));
    
            setFilteredCities(cities);
        } catch (error) {
            console.error('Ошибка при поиске городов:', error);
        } finally {
            setIsLoading(false);
        }
    };  

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.length > 2) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(async () => {
                if (cityCoordinates) {
                    await fetchCities(text, cityCoordinates);
                } else {
                    try {
                        const coords = await getLatLngFromCity(searchQuery);
                        await fetchCities(text, coords);
                    } catch (e) {
                        await fetchCities(text);
                    }
                }
            }, 500);
        } else {
            setFilteredCities([]);
        }
    };

    const handleCitySelect = (city) => {
        setSearchQuery(city.shortName);
        setFilteredCities([]);
        setIsSearchFocused(false);
        if (onCitySelect) onCitySelect(city.shortName);
    };

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchMain}>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Начните вводить город"
                />
                <Image
                    source={require('../../assets/search.png')}
                    style={styles.imageSearch}
                />
                {isLoading && <ActivityIndicator style={styles.loader} />}
                {isSearchFocused && filteredCities.length > 0 && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={filteredCities}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleCitySelect(item)}
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

export default SearchCity;