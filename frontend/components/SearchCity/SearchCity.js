import React from 'react';
import styles from './styles';
import { View, TextInput, Text, Image, FlatList, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';


const SearchCity = ({ citiesData = [], onCitySelect, selectedCity }) => {
    const [searchQuery, setSearchQuery] = useState(selectedCity || '');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
         
    const handleCitySelect = (cityName) => {
        setSearchQuery(cityName);
        setFilteredCities([]);
        setIsSearchFocused(false);
        if(onCitySelect) onCitySelect(cityName);
    };
    
    useEffect(() => {
        setSearchQuery(selectedCity);
    }, [selectedCity]);

    const handleSearch = (text) => {
          setSearchQuery(text);
          if (text.length > 0) {
              const filtered = citiesData.filter(city =>
                  city.name.toLowerCase().includes(text.toLowerCase())
              );
              setFilteredCities(filtered);
          } else {
              setFilteredCities([]);
              onCitySelect('');
          }
      };

  return (      
      <View style={styles.searchContainer}>
        <View style={styles.searchMain}>
        <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
        />
        
        <Image
            source={require('../../assets/search.png')}
            style={styles.imageSearch}
        />
        
        {(isSearchFocused || filteredCities.length > 0) && (
            <View style={styles.dropdown}>
                <FlatList
                    data={filteredCities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleCitySelect(item.name)}
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