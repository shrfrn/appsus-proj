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
    return storageService.put(NOTES_KEY, updatedNote);
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: 'noteText',
                isPinned: true,
                info: {
                    txt: 'Fullstack Me Baby!',
                },
            },
            {
                id: utilService.makeId(),
                type: 'noteImg',
                info: {
                    url: 'https://d1aeri3ty3izns.cloudfront.net/media/63/631151/1200/preview.jpg',
                    title: 'Me playing Mi',
                },
                style: {
                    backgroundColor: '#00d',
                },
            },
            {
                id: utilService.makeId(),
                type: 'noteTodo',
                info: {
                    label: 'How was it:',
                    todos: [
                        { id: utilService.makeId(), txt: 'Do that', doneAt: null },
                        { id: utilService.makeId(), txt: 'Do this', doneAt: 187111111 },
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
        };
    });
}

// VIDEO SAMPLE:
// http://techslides.com/demos/sample-videos/small.mp4

// IMAGE SAMPLE:
// https://images-na.ssl-images-amazon.com/images/I/71aku52GvSL._AC_SL1500_.jpg
