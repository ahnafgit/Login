import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PinScreen = ({ navigation }) => {
  const [pin, setPin] = useState("");

  const handlePress = (value) => {
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 4) {
      navigation.replace("DiaryList");
    }
  }, [pin]);

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {[...Array(4)].map((_, i) => (
          <View
            key={i}
            style={[styles.dot, pin.length > i && styles.dotFilled]}
          />
        ))}
      </View>
    );
  };

  const renderKeypad = () => {
    const keys = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["", "0","Hapus"],
    ];

    return keys.map((row, i) => (
      <View key={i} style={styles.row}>
        {row.map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() =>
              key === "Hapus" ? handleDelete() : handlePress(key)
            }
            disabled={key === ""}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masukkan PIN Anda</Text>
      {renderDots()}
      <View style={styles.keypad}>{renderKeypad()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 40,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 10,
  },
  dotFilled: {
    backgroundColor: "#000",
  },
  keypad: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  key: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  keyText: {
    fontSize: 20,
    color: "#000",
  },
});

export default PinScreen;