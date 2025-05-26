import React, { useState, useEffect } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import BackButton from "../../components/BackButton/BackButton";

const FiltersScreen = ({ route }) => {
  const navigation = useNavigation();

  const { onApplyFilters, currentAppliedFilters } = route.params || {};

  const [selectedTags, setSelectedTags] = useState(() => {
    const initialTags = currentAppliedFilters?.tags || [];
    return initialTags;
  });
  const [selectedDuration, setSelectedDuration] = useState(() => {
    const initialDuration = currentAppliedFilters?.duration || null;
    return initialDuration;
  });

  useEffect(() => {
    if (currentAppliedFilters) {
      const newTags = currentAppliedFilters.tags || [];
      const newDuration = currentAppliedFilters.duration || null;

      setSelectedTags((prevSelectedTags) => {
        if (JSON.stringify(prevSelectedTags) !== JSON.stringify(newTags)) {
          console.log(
            "[FiltersScreen] useEffect - Обновление selectedTags на:",
            JSON.stringify(newTags)
          );
          return newTags;
        }
        return prevSelectedTags;
      });

      setSelectedDuration((prevSelectedDuration) => {
        if (prevSelectedDuration !== newDuration) {
          console.log(
            "[FiltersScreen] useEffect - Обновление selectedDuration на:",
            newDuration
          );
          return newDuration;
        }
        return prevSelectedDuration;
      });
    }
  }, [currentAppliedFilters]);

  const handleBackButton = () => {
    handleApplyFilters();
  };

  const handleApplyFilters = () => {
    const filters = {
      tags: selectedTags,
      duration: selectedDuration,
    };

    if (typeof onApplyFilters === "function") {
      onApplyFilters(filters);
      console.log("Applied filters:", filters);
    } else {
      console.log("FiltersScreen: onApplyFilter");
    }
    navigation.goBack();
  };

  const availableTags = [
    { id: "PARK", name: "Парки" },
    { id: "CAFE", name: "Кафе" },
    { id: "BAR", name: "Бары" },
    { id: "SHOPPING", name: "Шоппинг" },
    { id: "ARCHITECTURE", name: "Архитектура" },
    { id: "SPORT", name: "Спорт" },
  ];

  const durationOptions = [
    { id: "LESS_THAN_HOUR", name: "Меньше часа", value: { from: 0, to: 3600 } },
    {
      id: "ONE_TO_TWO_HOURS",
      name: "1-2 часа",
      value: { from: 3600, to: 7200 },
    },
    {
      id: "MORE_THAN_TWO_HOURS",
      name: "Более 2 часов",
      value: { from: 7200, to: null },
    },
  ];

  const toggleTagSelection = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const selectDuration = (durationId) => {
    setSelectedDuration((prev) => (prev === durationId ? null : durationId));
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBackButton} />
      <Text style={styles.filtersTitle}>Фильтры</Text>

      <View style={styles.filtersContainer}>
        <View style={styles.filtersPlaceContainer}>
          {availableTags.map((tag) => (
            <TouchableOpacity
              key={tag.id}
              style={[
                styles.tag,
                selectedTags.includes(tag.id) && styles.selectedTag,
              ]}
              onPress={() => toggleTagSelection(tag.id)}
            >
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{tag.name}</Text>
                <Image
                  source={
                    selectedTags.includes(tag.id)
                      ? require("../../assets/filtersImages/selected.png")
                      : require("../../assets/filtersImages/notSelect.png")
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
          {durationOptions.map((duration) => (
            <TouchableOpacity
              key={duration.id}
              style={[
                styles.duration,
                selectedDuration === duration.id && styles.selectedDuration,
              ]}
              onPress={() => selectDuration(duration.id)}
            >
              <View style={styles.durationContainer}>
                <Text style={styles.durationText}>{duration.name}</Text>
                <Image
                  source={
                    selectedDuration === duration.id
                      ? require("../../assets/filtersImages/selected.png")
                      : require("../../assets/filtersImages/notSelect.png")
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
