import {
  Button,
  StyleSheet,
  TextInput,
  Alert,
  View,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

export default function HomeScreen() {
  const MAX_VALUE = 255; // Max value for RGB
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [color, setColor] = useState("#000");
  const [redRGB, setRedRGB] = useState(0);
  const [greenRGB, setGreenRGB] = useState(0);
  const [blueRGB, setBlueRGB] = useState(0);
  const [textColor, setTextColor] = useState("black");

  const submitProject = async () => {
    const data = {
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
      color,
      redRGB,
      greenRGB,
      blueRGB,
      textColor,
    };
    try {
      await AsyncStorage.setItem("formData", JSON.stringify(data));
      Alert.alert("Data saved successfully");
      if (Platform.OS === "web") {
        console.log("Data saved successfully:", data);
        alert("Data saved successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      if (Platform.OS === "web") {
        console.error("Error saving data:", error);
        alert("Error saving data");
      }
    }
  };

  const downloadJSON = async () => {
    const data = {
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
      color,
      redRGB,
      greenRGB,
      blueRGB,
      textColor,
    };
    const jsonString = JSON.stringify(data, null, 2);

    if (Platform.OS === "web") {
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "formData.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert("Download Successful");
    } else {
      const fileUri = `${FileSystem.documentDirectory}/formData.json`;
      try {
        await FileSystem.writeAsStringAsync(fileUri, jsonString, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        Alert.alert(
          "Descarga exitosa",
          `El archivo fue guardado en ${fileUri}`
        );
      } catch (error) {
        console.error("Error saving file:", error);
        Alert.alert("Error", "Falla en guardar el archivo");
      }
    }
  };

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("formData");
        if (savedData) {
          const {
            name,
            email,
            password,
            confirmPassword,
            phoneNumber,
            color,
            redRGB,
            greenRGB,
            blueRGB,
            textColor,
          } = JSON.parse(savedData);

          setName(name);
          setEmail(email);
          setPassword(password);
          setConfirmPassword(confirmPassword);
          setPhoneNumber(phoneNumber);
          setColor(color);
          setRedRGB(redRGB);
          setGreenRGB(greenRGB);
          setBlueRGB(blueRGB);
          setTextColor(textColor);
        }
      } catch (error) {
        console.error("Error loading persisted data:", error);
      }
    };

    loadPersistedData();
  }, []);

  useEffect(() => {
    setColor(`rgb(${redRGB},${greenRGB},${blueRGB})`);
    const brightness = (redRGB * 299 + greenRGB * 587 + blueRGB * 114) / 1000;

    if (brightness > 125) {
      setTextColor("black");
      Colors.dark.text = "black";
    } else {
      setTextColor("white");
      Colors.dark.text = "white";
    }
  }, [redRGB, greenRGB, blueRGB]);

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
      backgroundColor: color,
    },
    mainBackground: {
      backgroundColor: color,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
      color: "black",
    },
    text: {
      color: textColor,
    },
    slider: {
      width: 200,
      height: 40,
    },
  });

  return (
    <ThemedView style={styles.mainBackground}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">¡Bienvenido!</ThemedText>
      </View>
      <View style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Por favor rellena los recuadros debajo para continuar.
        </ThemedText>
        <ThemedText>Nombre: </ThemedText>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <ThemedText>Correo Electrónico: </ThemedText>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <ThemedText>Contraseña: </ThemedText>
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <ThemedText>Confirmar Contraseña: </ThemedText>
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <ThemedText>Número Telefónico: </ThemedText>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          maxLength={10}
        />

        <ThemedText type="subtitle">Colores</ThemedText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={MAX_VALUE}
          step={1}
          minimumTrackTintColor="red"
          maximumTrackTintColor={Colors.dark.text}
          onValueChange={setRedRGB}
          value={redRGB}
        />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={MAX_VALUE}
          step={1}
          minimumTrackTintColor="green"
          maximumTrackTintColor={Colors.dark.text}
          onValueChange={setGreenRGB}
          value={greenRGB}
        />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={MAX_VALUE}
          step={1}
          minimumTrackTintColor="blue"
          maximumTrackTintColor={Colors.dark.text}
          onValueChange={setBlueRGB}
          value={blueRGB}
        />
        <Button title="Guardar" onPress={submitProject} />
        <Button title="Descargar Información" onPress={downloadJSON} />
      </View>
    </ThemedView>
  );
}
