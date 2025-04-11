import React from 'react';
import { View, TextInput, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';

const PointOfRoute = ({ addressData = [], onAddressSelect, selectedAddress, onRemove, showRemoveButton }) => {
    const [searchQuery, setSearchQuery] = useState(selectedAddress || '');
    const [filteredAddress, setfilteredAddress] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
         
    const handleAddressSelect = (address) => {
        setSearchQuery(address);
        setfilteredAddress([]);
        setIsSearchFocused(false);
        if(onAddressSelect) onAddressSelect(address);
    };
    
    useEffect(() => {
        setSearchQuery(selectedAddress);
    }, [selectedAddress]);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.length > 0) {
            const filtered = addressData.filter(city =>
                city.name.toLowerCase().includes(text.toLowerCase())
            );
            setfilteredAddress(filtered);
        } else {
            setfilteredAddress([]);
            onAddressSelect('');
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
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleAddressSelect(item.name)}
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