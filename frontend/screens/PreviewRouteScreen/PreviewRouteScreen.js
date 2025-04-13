import BackButton from "../../components/BackButton/BackButton";
import styles from "./styles";
import ChooseButton from "../../components/ChooseButton/ChooseButton";
import { View, Image, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

const PreviewRouteScreen = () => {
    const navigation = useNavigation();

    const handleBackButton = () => {
        navigation.goBack(); 
    }
    
    const points = ["Точка раз", "Точка двас", "Точка трис"];
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <BackButton onPress={handleBackButton}/>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                        Маршрут2
                    </Text>

                    <View style={styles.locationContainer}>
                        <Image 
                            source={require('../../assets/routeCardImages/map.png')}
                            style={styles.locationImage}
                        />
                        <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                            Воронеж
                        </Text>
                    </View>
                </View>

                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.mapContainer}>
                        <Text>Здесь будет карта</Text>
                    </View>
                    
                    <View style={styles.contentPoints}>
                        {points.map((point, index) => (
                            <Text key={index} style={styles.pointText}>{point}</Text>
                        ))}
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.timeDistanceContainer}>
                            <View style={styles.timeContainer}>
                                <Image 
                                    source={require('../../assets/routeCardImages/clock.png')}
                                    style={styles.timeImage}
                                />
                                <Text style={styles.time}>2 ч.</Text>
                            </View>
                            
                            <Text style={styles.distance}>2 км</Text>
                            
                            <View style={styles.ratingContainer}>
                                <Image 
                                    source={require('../../assets/routeCardImages/rating.png')}
                                    style={styles.ratingImage}
                                />
                                <Text style={styles.rating}>4.5</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <ChooseButton style={styles.chooseButton}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PreviewRouteScreen;