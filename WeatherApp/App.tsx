import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
//Dimensions : Size of Screen
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const API_KEY = '784ab24ff2ed5d94d4288abed9e25d13';

const latitude = 37.3351212;
const longitude = -122.03256229;

const App = () => {
  const [city, setCity] = useState('Loading...');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const granted = true;
    if (!granted) {
      setOk(false);
    }

    const location = 'Los Altos'; // expo GeoCode Not working
    setCity(location);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`,
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{marginTop: 80}}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'orange'},
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {fontSize: 68, fontWeight: '500'},
  weather: {}, // scrollView는 flex 없어도 됨.
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {marginTop: 50, fontSize: 178},
  description: {marginTop: -30, fontSize: 60},
  tinyText: {fontSize: 20},
});

export default App;
