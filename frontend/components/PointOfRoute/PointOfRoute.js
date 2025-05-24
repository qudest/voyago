import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";
const SEARCH_RADIUS = 50000;

const PointOfRoute = ({
  onAddressSelect,
  selectedAddress,
  onRemove,
  showRemoveButton,
  placeholder,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAddress, setFilteredAddress] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const timerRef = useRef(null);
  const blurTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedAddress !== searchQuery) {
      setSearchQuery(selectedAddress || "");
    }
  }, [selectedAddress]);

  useEffect(() => {
    const loadUserCity = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("userData");
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
      if (timerRef.current) clearTimeout(timerRef.current);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  const getCityCoordinates = async (cityName) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        { params: { address: cityName, key: API_KEY, language: "ru" } }
      );
      if (response.data.results.length > 0) {
        return response.data.results[0].geometry.location;
      }
    } catch (error) {
      console.error("Ошибка получения координат города:", error);
    }
    return null;
  };

  const handleAddressSelect = (prediction) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setSearchQuery(prediction.name);
    setFilteredAddress([]);
    setIsSearchFocused(false);
    Keyboard.dismiss();
    onAddressSelect?.({
      place_id: prediction.id,
      name: prediction.name,
    });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        try {
          const params = {
            input: text,
            key: API_KEY,
            language: "ru",
            components: "country:ru",
          };
          if (userLocation) {
            params.location = `${userLocation.lat},${userLocation.lng}`;
            params.radius = SEARCH_RADIUS;
          }
          const response = await axios.get(
            "https://maps.googleapis.com/maps/api/place/autocomplete/json",
            { params }
          );
          const predictions = response.data.predictions.map((p) => ({
            id: p.place_id,
            name: p.description,
          }));
          setFilteredAddress(predictions);
        } catch (error) {
          console.error("Ошибка при загрузке мест:", error);
          setFilteredAddress([]);
        }
      }, 300);
    } else {
      setFilteredAddress([]);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setIsSearchFocused(false);
    }, 250);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchMain}>
        <Image
          source={require("../../assets/addPointRoute/map.png")}
          style={styles.mapIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder || "Введите адрес"}
          placeholderTextColor={
            styles.searchInput.placeholderTextColor || "#8E8E93"
          }
        />
        {showRemoveButton && (
          <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
            <Image
              source={require("../../assets/addPointRoute/delete.png")}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        )}
      </View>
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
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

export default PointOfRoute;
