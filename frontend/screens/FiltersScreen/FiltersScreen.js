import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import { useState } from 'react';

const FiltersScreen = () => {
    const navigation = useNavigation();
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState(null);

    const handleBackButton = () => {
        navigation.navigate("RecommendationsRoutesScreen");
    };

    const mockPlace = [
        { id: 1, name: 'Все маршруты', level: 1 },
        { id: 2, name: 'Гастрономические маршруты', level: 1 },
        { id: 3, name: 'Рестораны', level: 2 },
        { id: 4, name: 'Бары', level: 2 },
        { id: 5, name: 'Кофейни', level: 2 },
        { id: 6, name: 'Только достопримечательности', level: 1 },
        { id: 7, name: 'Памятники культуры', level: 2 },
        { id: 8, name: 'Музеи', level: 2 },
        { id: 9, name: 'Арт-галереи', level: 2 },
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

    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackButton}/>
            <Text style={styles.filtersTitle}>Фильтры</Text>
            
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
        </View>
    );
};

export default FiltersScreen;