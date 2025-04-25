import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './styles';

const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';
const CITY_LOCATION = {
    lat: 55.7558,
    lng: 37.6173
};
const SEARCH_RADIUS = 50000;
const PointOfRoute = ({ onAddressSelect, selectedAddress, onRemove, showRemoveButton }) => {
    const [searchQuery, setSearchQuery] = useState(selectedAddress || '');
    const [filteredAddress, setFilteredAddress] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

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
                    const response = await axios.get(
                        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
                        {
                            params: {
                                input: text,
                                key: API_KEY,
                                language: 'ru',
                                components: 'country:ru',
                                location: `${CITY_LOCATION.lat},${CITY_LOCATION.lng}`,
                                radius: SEARCH_RADIUS,
                                strictbounds: true
                            },
                        }
                    );

                    const predictions = response.data.predictions.map(prediction => ({
                        id: prediction.place_id,
                        name: prediction.description,
                    }));
                    console.log(response.data)
                    
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