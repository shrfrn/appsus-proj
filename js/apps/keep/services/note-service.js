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
};

function query() {
    return storageService.query(NOTES_KEY);
}

function create(note) {
    note.id = utilService.makeId();
    if (note.type === 'noteTodo') note.info.todos = _foramtTodos(note);

    return storageService.post(NOTES_KEY, note);
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function update(updatedNote) {
    if (updatedNote.type === 'noteTodo') updatedNote.info.todos = _foramtTodos(updatedNote);
    return storageService.put(NOTES_KEY, updatedNote);
}

function setNotePinned(noteId) {
    const idx = gNotes.findIndex((note) => note.id === noteId);
    gNotes[idx].isPinned = !gNotes[idx].isPinned;
    return storageService.put(NOTES_KEY, gNotes[idx]);
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
                    backgroundColor: '#ffffff',
                },
            },
            {
                id: utilService.makeId(),
                type: 'noteImg',
                isPinned: false,
                info: {
                    url: 'https://d1aeri3ty3izns.cloudfront.net/media/63/631151/1200/preview.jpg',
                    title: 'Me playing Mi',
                    backgroundColor: '#ffffff',
                    txt: '',
                },
            },
            {
                id: utilService.makeId(),
                type: 'noteTodo',
                isPinned: false,
                info: {
                    backgroundColor: '#ffffff',
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
                    backgroundColor: '#ffffff',
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
