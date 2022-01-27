import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {theme} from './color';

const App = () => {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = payload => {
    setText(payload);
  };

  const addToDo = () => {
    if (text === '') {
      return;
    }
    //save to do - object assign = object 가져다가 다른 object와 합쳐줌
    const newToDos = {...toDos, [Date.now()]: {text, working}};
    setToDos(newToDos);
    setText('');
  };

  const deleteToDo = key => {
    Alert.alert('Delete To Do', 'Are you Sure?', [
      {text: 'Cancel'},
      {
        text: "I'm Sure",
        style: 'destructive',
        onPress: () => {
          const newToDos = {...toDos};
          delete newToDos[key];
          setToDos(newToDos);
        },
      },
    ]);
    return;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{...styles.btnText, color: working ? 'white' : theme.grey}}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{...styles.btnText, color: !working ? 'white' : theme.grey}}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
          style={styles.input}
        />
      </View>
      <ScrollView>
        {Object.keys(toDos).map(key =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.bg, paddingHorizontal: 20},
  header: {
    flexDirection: 'row',
    marginTop: 100,
    justifyContent: 'space-between',
  },
  btnText: {fontSize: 38, fontWeight: '600'},
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toDoText: {color: 'white', fontSize: 16, fontWeight: '500'},
});

export default App;
