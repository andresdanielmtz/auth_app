import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function Credits() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "white",
      padding: 20,
    },
    personalInfo: {
      paddingTop: 20,
      backgroundColor: "white",
      textAlign: "center",
    },
    personalData: {
      fontStyle: "italic",
      paddingBottom: 10,
    },
  });
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Información </ThemedText>
      <ThemedText type="subtitle"> Prof. Arturo Javier Lopez Fausto</ThemedText>

      <ThemedView style={styles.personalInfo}>
        <ThemedText style={styles.personalData}>
          {" "}
          Andrés Daniel Martínez - A00227463{" "}
        </ThemedText>
        <ThemedText>
          {" "}
          Integración de Seguridad Informática en Redes y Sistemas de Software{" "}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
