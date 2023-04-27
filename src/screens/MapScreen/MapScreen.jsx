import { Dimensions, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const { latitude, longitude } = route.params.location;

  return (
    <View>
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
    </View>
  );
}
