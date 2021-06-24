import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes';
const gNotes = _createNotes();
utilService.saveToStorage(NOTES_KEY, gNotes);

export const noteService = {
    query,
    create,
    remove,
    update,
    setNotePinned,
    createMailAsNote,
};

function query() {
    return storageService.query(NOTES_KEY);
}

function create(note) {
    note.isPinned = false;
    if (!note.info.backgroundColor) note.info.backgroundColor = utilService.getRandomColor();
    if (note.type === 'noteTodo') note.info.todos = _foramtTodos(note);

    return storageService.post(NOTES_KEY, note);
}

function createMailAsNote(mail) {
    console.log('mail :>> ', mail);
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function update(updatedNote) {
    if (updatedNote.type === 'noteTodo') updatedNote.info.todos = _foramtTodos(updatedNote);
    return storageService.put(NOTES_KEY, updatedNote);
}

function setNotePinned(noteId) {
    return query().then((notes) => {
        const idx = notes.findIndex((note) => {
            return note.id === noteId;
        });

        notes[idx].isPinned = !notes[idx].isPinned;
        return storageService.put(NOTES_KEY, notes[idx]);
    });
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: 'noteText',
                isPinned: false,
                info: {
                    txt: 'Fullstack Me Baby!',
                    backgroundColor: utilService.getRandomColor(),
                },
            },
            {
                id: utilService.makeId(),
                type: 'noteImg',
                isPinned: false,
                info: {
                    url: 'https://d1aeri3ty3izns.cloudfront.net/media/63/631151/1200/preview.jpg',
                    title: 'Me playing Mi',
                    backgroundColor: utilService.getRandomColor(),
                    txt: '',
                },
            },
            {
                id: utilService.makeId(),
                type: 'noteAudio',
                isPinned: false,
                info: {
                    url: 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3',
                    backgroundColor: utilService.getRandomColor(),
                    txt: '',
                },
            },
            {
                id: utilService.makeId(),
                type: 'noteTodo',
                isPinned: false,
                info: {
                    backgroundColor: utilService.getRandomColor(),
                    label: 'How was it:',
                    txt: '',
                    todos: [
                        { id: utilService.makeId(), txt: 'Do that', doneAt: null, isDone: false },
                        {
                            id: utilService.makeId(),
                            txt: 'Do this',
                            doneAt: '',
                            isDone: false,
                        },
                    ],
                },
            },
            {
                id: utilService.makeId(),
                type: 'noteVideo',
                isPinned: false,
                info: {
                    txt: 'My video!',
                    url: 'http://techslides.com/demos/sample-videos/small.mp4',
                    backgroundColor: utilService.getRandomColor(),
                },
            },
        ];
    }
    return notes;
}

function _foramtTodos(note) {
    const todos = note.info.todos.split(',');
    return todos.map((todo) => {
        return {
            id: utilService.makeId(),
            txt: todo,
            doneAt: null,
            isDone: false,
        };
    });
}

// VIDEO SAMPLE:
// http://techslides.com/demos/sample-videos/small.mp4

// IMAGE SAMPLE:
// https://images-na.ssl-images-amazon.com/images/I/71aku52GvSL._AC_SL1500_.jpg
