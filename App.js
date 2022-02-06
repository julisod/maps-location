import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //expo install react-native-maps 
import { Input } from 'react-native-elements';

export default function App() {

  const [text, setText] = useState("");
  const [markerTitle, setMarkerTitle] = useState("");
  const [region, setRegion] = useState({
      latitude: 60.240332499999994,
      longitude: 25.07525595193482,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    }
  );

  const search = () => {
    setMarkerTitle(text.trim())
    console.log(markerTitle);
    let keyword = text.trim().replace(/ /g, '+');
    fetch(`https://nominatim.openstreetmap.org/search?q=${keyword}&format=json`)
    .then(response => response.json())
    .then(data => {
      setRegion({...region, latitude: parseFloat(data[0].lat)});
      setRegion({...region, longitude: parseFloat(data[0].lon)});
    })
    .catch(error => {
      Alert.alert('Error', error);
    });
  }

  return (
    <View style={styles.container}>
      {/* <Text>hello</Text> */}
      <MapView
        style={styles.map}
        region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude}}
          title={markerTitle}
          pinColor="indigo" />
      </MapView>
      <View style={styles.search}>
      <Input
          style={{ paddingLeft: 4,}}
          value={text}
          placeholder="Address"
          leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
          onChangeText={input => setText(input)}
        />
      <Button onPress={search} title="Show" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  search: {
    flexDirection:"row",
    width:"70%",
    alignItems: 'center',
    justifyContent: 'center'
  }
});
