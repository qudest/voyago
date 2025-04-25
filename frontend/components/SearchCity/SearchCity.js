import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './styles';

const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';

const SearchCity = ({ onCitySelect, selectedCity }) => {
    const [searchQuery, setSearchQuery] = useState(selectedCity || '');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const timerRef = useRef(null);

    const extractCityName = (fullAddress) => {
        return fullAddress.split(',')[0].trim();
    };

    const fetchCities = async (query) => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/place/autocomplete/json',
                {
                    params: {
                        input: query,
                        types: '(cities)',
                        language: 'ru',
                        components: 'country:ru',
                        key: API_KEY
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
            console.error('Error fetching cities:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.length > 2) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => fetchCities(text), 500);
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