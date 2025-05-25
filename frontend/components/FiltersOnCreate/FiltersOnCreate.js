import React from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const FiltersOnCreate = ({ onCardPress, selectedPreferences = [] }) => {
  const imageCard = [
    {
      id: "PARK",
      title: "Парк",
    },
    {
      id: "CAFE",
      title: "Кафе",
    },
    {
      id: "BAR",
      title: "Бар",
    },
    {
      id: "SHOPPING",
      title: "Шоппинг",
    },
    {
      id: "ARCHITECTURE",
      title: "Архитектура",
    },
    {
      id: "SPORT",
      title: "Спорт",
    },
  ];

  return (
    <View style={styles.cardsContainer}>
      {imageCard.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={[
            styles.containerDisable,
            selectedPreferences.includes(card.id) && styles.containerEnable,
          ]}
          onPress={() => onCardPress(card.id)}
        >
          <Text style={styles.titlePreference}>{card.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FiltersOnCreate;
