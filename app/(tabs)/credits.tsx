import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
export default function Credits() {
  return (
    <ParallaxScrollView
      headerImage={<div />}
      headerBackgroundColor={{ light: "", dark: "" }}
    >
      <ThemedText type="subtitle"> Información </ThemedText>
      <ThemedText> Andrés Daniel Martínez - A00227463 </ThemedText>
    </ParallaxScrollView>
  );
}
