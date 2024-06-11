import React, { useState } from 'react'
import { Alert, StatusBar, View } from 'react-native'
import Home from './src/screens/home'
import AddNote from './src/screens/addNote'
import EditNote from './src/screens/editNote'

const CurrentPageWidget = ({ currentPage, noteList, setCurrentPage, addNote, selectedNote, setSelectedNote, editNote, deleteNote }) => {
  switch (currentPage) {
    case 'home':
      return (
        <Home setCurrentPage={setCurrentPage} noteList={noteList} selectedNote={selectedNote} setSelectedNote={setSelectedNote} editNote={editNote} deleteNote={deleteNote} />
      )
    case 'add':
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />
    case 'edit':
      return <EditNote setCurrentPage={setCurrentPage} selectedNote={selectedNote} editNote={editNote} />
    default:
      return <Home />
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: 'Note pertama',
      desc:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    },
  ]);

  const [selectedNote, setSelectedNote] = useState({})

  const addNote = (title, desc) => {
    const id =
      noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1

    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc,
      },
    ]);
    Alert.alert('Add Note Info', 'New note added!');
  }

  const editNote = (noteId, title, desc) => {
    const noteToUpdate = noteList.find((note) => note.id === noteId);

    if (noteToUpdate) {
      setNoteList(
        noteList.map((note) =>
          note.id === noteId
            ? { ...note, title, desc }
            : note
        )
      );
      Alert.alert('Edit Note Info', 'Note editted!');
    } else {
      console.log('No note found with the given ID');
    }
  }

  const deleteNote = (noteId) => {
    Alert.alert('Delete Confirmation', 'Are sure want to delete this note?', [
      {
        text: 'Yes',
        onPress: () => {
          setNoteList(noteList.filter((item) => item.id !== noteId));
          Alert.alert('Delete Note Info', 'Note deletted');
        },
        style: 'destructive',
      },
      {
        text: 'No',
        onPress: () => {console.log('Cancel Pressed');return},
        style: 'cancel',
      }
    ])
  }

  return (
    <View>
      <StatusBar showHideTransition={'fade'} animated={true} />
      <CurrentPageWidget
        currentPage={currentPage}
        noteList={noteList}
        setCurrentPage={setCurrentPage}
        addNote={addNote}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        editNote={editNote}
        deleteNote={deleteNote}
      />
    </View>
  );
}

export default App
