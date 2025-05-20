import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import styles from "./styles";
import MapView from 'react-native-maps';
import BackButton from '../../components/BackButton/BackButton';
import ChooseButton from '../../components/ChooseButton/ChooseButton';
import { useNavigation } from "@react-navigation/native";
import GenerateRoute from '../../components/GenerateRoute/GenerateRoute';

const PremiumCreateRouteScreen = () => {
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const navigation = useNavigation();

    const defaultRegion = {
        latitude: 55.751244,
        longitude: 37.618423,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const mockPlace = [
        { id: 1, name: 'Достопримечательности', level: 1 },
        { id: 2, name: 'Кафе', level: 1 },
        { id: 3, name: 'Общее', level: 1 },
        { id: 4, name: 'Активный отдых', level: 1 }
    ];

    const mockDuration = [
        { id: 1, name: 'Меньше часа' },
        { id: 2, name: 'До двух часов' },
    ];

    const handleGenerateButton = () => {
        Alert.alert("Генерация")
    }
    const togglePlaceSelection = (placeId) => {
        setSelectedPlaces(prev => 
            prev.includes(placeId) 
                ? prev.filter(id => id !== placeId)
                : [...prev, placeId]
        );
    };

    const selectDuration = (durationId) => {
        setSelectedDuration(prev => 
            prev === durationId ? null : durationId
        );
    };

    const handleBackButton = () => {
        navigation.navigate("RecommendationsRoutesScreen");
    };

    const points = ["Точка 1", "Точка 2", "Точка 3"];

    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackButton}/>
            <ScrollView contentContainerStyle={styles.scrollContent}>     
                <View style={styles.filtersContainer}>
                    <View style={styles.filtersPlaceContainer}>
                        {mockPlace.map(place => (
                            <TouchableOpacity
                                key={place.id}
                                style={[
                                    styles.tag,
                                    place.level === 2 && styles.tagLevel,
                                    selectedPlaces.includes(place.id) && styles.selectedTag
                                ]}
                                onPress={() => togglePlaceSelection(place.id)}
                            >
                                <View style={styles.tagContainer}>
                                    <Text style={styles.tagText}>
                                        {place.name}
                                    </Text>
                                    <Image 
                                        source={selectedPlaces.includes(place.id)
                                            ? require('../../assets/filtersImages/selected.png')
                                            : require('../../assets/filtersImages/notSelect.png')
                                        }
                                        style={styles.functionalImage}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.durationTitleContainer}>
                            <Text style={styles.durationTitle}>Длительность</Text>
                        </View>
                        {mockDuration.map(duration => (
                            <TouchableOpacity
                                key={duration.id}
                                style={[
                                    styles.duration,
                                    selectedDuration === duration.id && styles.selectedDuration
                                ]}
                                onPress={() => selectDuration(duration.id)}
                            >
                                <View style={styles.durationContainer}>
                                    <Text style={styles.durationText}>
                                        {duration.name}
                                    </Text>
                                    <Image 
                                        source={selectedDuration === duration.id
                                            ? require('../../assets/filtersImages/selected.png')
                                            : require('../../assets/filtersImages/notSelect.png')
                                        }
                                        style={styles.functionalImage}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <GenerateRoute onPress={handleGenerateButton}/>
                <View>
                    <View style={styles.infoContainer}>
                        <View style={styles.contentPoints}>
                            {points.map((point, index) => (
                                <Text key={`point-${index}`} style={styles.pointText}>
                                    {point}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.timeDistanceContainer}>
                            <View style={styles.timeContainer}>
                                <Image 
                                    source={require('../../assets/routeCardImages/clock.png')}
                                    style={styles.timeImage}
                                />
                                <Text style={styles.time}>10 мин</Text>
                            </View>
                            <Text style={styles.distance}>1.5 км</Text>
                        </View>
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                initialRegion={defaultRegion}
                                region={defaultRegion}
                            />
                        </View>  
                        <ChooseButton/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PremiumCreateRouteScreen;