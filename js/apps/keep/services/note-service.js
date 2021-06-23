import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes';
const gNotes = _createNotes();
utilService.saveToStorage(NOTES_KEY, gNotes);

export const noteService = {
    query,
};

function query() {
    return storageService.query(NOTES_KEY);
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                type: 'noteText',
                isPinned: true,
                info: {
                    txt: 'Fullstack Me Baby!',
                },
            },
            {
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
