import React, {useState, useRef, useEffect} from 'react';
import styles from './styles';
import { Image, View, TouchableOpacity, Animated, Text, Alert  } from 'react-native';
import ChooseButton from '../../components/ChooseButton/ChooseButton';

const RouteCard = ({ cardInformation = {}, functional}) => {
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [contentHeight, setContentHeight] = useState(200); 
    const contentRef = useRef(null);

    const {
        title = "",
        time = "",
        distance = "",
        points = []
    } = cardInformation;

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.measure((x, y, width, height) => {
                setContentHeight(height + 155);
            });
        }
    }, [points]); 

    const handleToggleExpand = () => {
        const toValue = expanded ? 0 : 1;
        
        Animated.timing(animation, {
            toValue,
            duration: 300,
            useNativeDriver: false
        }).start();
        
        setExpanded(!expanded);
    };

    const cardHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [120, contentHeight] 
    });

    const handleEditButton = () => {
        Alert.alert("Редактировать")
    };

    const handleLikeButton = () => {
        Alert.alert("Редактировать")
    };
    
    const renderFunctionalButton = () => {
        switch(functional) {
            case 'edit':
                return (
                    <TouchableOpacity onPress={handleEditButton}>
                        <Image 
                            source={require('../../assets/routeCardImages/edit.png')}
                            style={styles.functionalImage}
                        />
                    </TouchableOpacity>
                );
            case 'like':
                return (
                    <TouchableOpacity onPress={handleLikeButton}>
                        <Image 
                            source={require('../../assets/routeCardImages/like.png')}
                            style={styles.functionalImage}
                        />
                    </TouchableOpacity>
                );
            case 'done':
                return null; 
        }
    };

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={handleToggleExpand}>
            <Animated.View style={[styles.container, { height: cardHeight }]}>
                <View style={styles.header}>
                    <View style={styles.headerContainer}>
                        <Text 
                                   style={styles.title}
                                   numberOfLines={1}
                                   ellipsizeMode="tail">{title}</Text>

                    {renderFunctionalButton()}
                    </View>
                    <View style={styles.timeDistanceContainer}>
                        <View style={styles.timeContainer}>
                            <Image 
                                source={require('../../assets/routeCardImages/clock.png')}
                                style={styles.timeImage}
                            />
                             <Text style={styles.time}>{time} ч</Text>
                        </View>
                        <Text style={styles.distance}>{distance} км</Text>
                    </View>
                    <Image 
                        source={!expanded && require('../../assets/routeCardImages/bottom.png')
                        }
                        style={styles.navigationBottomImage}
                    />
                </View>
                
                <View 
                    ref={contentRef}
                    style={[styles.content, {opacity: expanded ? 1 : 0}]}
                >  
                <View style={styles.contentPoints}>
                    {points.map((point, index) => (
                        <Text key={index} style={styles.pointText}>{point}</Text>
                    ))}
                </View>
                    <ChooseButton style={styles.chooseButton}/>
                </View>
                
                <View style={styles.footer}>
                    <Image 
                        source={expanded 
                            ? require('../../assets/routeCardImages/up.png') 
                            : require('../../assets/routeCardImages/bottom.png')
                        }
                        style={styles.navigationImage}
                    />
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default RouteCard;