import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, TouchableOpacity, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import styles from "./styles";
import BackButton from '../../components/BackButton/BackButton';
import ChooseButton from '../../components/ChooseButton/ChooseButton';

const PremiumCreateRouteScreen = () => {
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState(null);

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

    const points = ["point1", "point2", "point3"]

    return(
        <View style={styles.container}>
        <BackButton onPress={handleBackButton}/>
        <Text style={styles.filtersTitle}>Фильтры</Text>
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
                </View>
                <View style={styles.filtersDurationContainer}>
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
            <View>
            <View style={styles.contentPoints}>
                        {points.map((point, index) => (
                            <Text key={`point-${index}`} style={styles.pointText}>
                                {point}
                            </Text>
                        ))}
            </View>
            <View style={styles.infoContainer}>
                        <View style={styles.timeDistanceContainer}>
                            <View style={styles.timeContainer}>
                                <Image 
                                    source={require('../../assets/routeCardImages/clock.png')}
                                    style={styles.timeImage}
                                />
                                <Text style={styles.time}>{10}</Text>
                            </View>
                            
                            <Text style={styles.distance}>{'10 км'}</Text>
                            
                        </View>
                    </View>
                    <View style={styles.mapContainer}>
                            <Text style={styles.errorText}>Не удалось загрузить карту</Text>
                    </View>    
                <ChooseButton/>
            </View>
            </ScrollView>
        </View>
    );
};
export default PremiumCreateRouteScreen;