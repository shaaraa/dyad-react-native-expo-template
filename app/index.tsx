// app/index.tsx
import { View, Text, Pressable } from "react-native";
import * as Linking from "expo-linking";

const TIP_URL = "https://www.buymeacoffee.com/shaaraa";

export default function HomeScreen() {
  const handleTipPress = async () => {
    try {
      const supported = await Linking.canOpenURL(TIP_URL);
      if (supported) await Linking.openURL(TIP_URL);
      else console.warn("Cannot open:", TIP_URL);
    } catch (e) {
      console.warn("Open URL failed:", e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "600" }}>
        Dyad React Native (Expo)
      </Text>
      <Pressable
        onPress={handleTipPress}
        accessibilityRole="link"
        style={{ padding: 12, backgroundColor: "#111", borderRadius: 8 }}
      >
        <Text style={{ color: "white" }}>Tip me</Text>
      </Pressable>
    </View>
  );
}
