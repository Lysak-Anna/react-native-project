import { Dimensions, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  console.log(route.params.location.mapValue.fields);
  const { latitude, longitude } = route.params.location.mapValue.fields;
  return (
    <View>
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        region={{
          latitude: latitude.doubleValue,
          longitude: longitude.doubleValue,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: latitude.doubleValue,
            longitude: longitude.doubleValue,
          }}
        />
      </MapView>
    </View>
  );
}
