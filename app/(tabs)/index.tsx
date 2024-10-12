import { Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const [blueRGB, setBlueRGB] = useState(0);
  const [greenRGB, setGreenRGB] = useState(0);
  const [redRGB, setRedRGB] = useState(0);

  const [color, setColor] = useState("rgb(0,0,0)");
  const MAX_VALUE = 255; // Max value for RGB

  const closeSlider = () => {
    console.log("Slider closed");
  };

  useEffect(() => {
    setColor(`rgb(${redRGB},${greenRGB},${blueRGB})`);
    document.body.style.backgroundColor = color;
    Colors.light.background = color;
    Colors.dark.background = color;

    {
      /**
      https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
      */
    }
    const brightness = 0.299 * redRGB + 0.587 * greenRGB + 0.114 * blueRGB;

    if (brightness >= 128) {
      document.body.style.color = "black";
      Colors.light.text = "black";
      Colors.dark.text = "black";
    } else {
      document.body.style.color = "white";
      Colors.light.text = "white";
      Colors.dark.text = "white";
    }
  }, [blueRGB, greenRGB, redRGB]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Please fill the form below to get started.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          {" "}
          Red: {redRGB}/{MAX_VALUE}{" "}
        </ThemedText>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={MAX_VALUE}
          step={1}
          minimumTrackTintColor={Colors.dark.text}
          maximumTrackTintColor={Colors.dark.text}
          onSlidingComplete={closeSlider}
          onValueChange={(value) => setRedRGB(value)}
        />

        <ThemedText>
          {" "}
          Blue: {blueRGB}/{MAX_VALUE}
        </ThemedText>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={MAX_VALUE}
          step={1}
          minimumTrackTintColor={Colors.dark.text}
          maximumTrackTintColor={Colors.dark.text}
          onSlidingComplete={closeSlider}
          onValueChange={(value) => setBlueRGB(value)}
        />

        <ThemedText>
          {" "}
          Green: {greenRGB}/{MAX_VALUE}{" "}
        </ThemedText>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={MAX_VALUE}
          step={1}
          minimumTrackTintColor={Colors.dark.text}
          maximumTrackTintColor={Colors.dark.text}
          onSlidingComplete={closeSlider}
          onValueChange={(value) => setGreenRGB(value)}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  mainBackground: {
    backgroundColor: "rgb(0,0,0)",
    flex: 1,
  },
});
