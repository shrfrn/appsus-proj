import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js';

const APPSUS_EMAIL = 'missBook'
const FULL_DAY = 100 * 60 * 60 * 24

export const emailService = {
    create,
    query,
    getById,
    remove,
    save,
}

// emails

function create(){
    return {
        id: null,  
        subject: '',
        body: '',
        isRead: false,
        sentAt: null
    }
}
function query(){
    return storageService.query(APPSUS_EMAIL)
}

function getById(bookId){
    return storageService.get(APPSUS_EMAIL, bookId)
  }
  
function remove(bookId){
    storageService.remove(APPSUS_EMAIL, bookId)
}

function save(book){
    if(book.id) {
        storageService.put(APPSUS_EMAIL, book)
      } else {
        storageService.post(APPSUS_EMAIL, book)
      }
}
    
// Demo data

function _createEmails() {
    let emails = utilService.loadFromStorage(APPSUS_EMAIL);
    if (!emails || !emails.length) {
        emails = []
        emails.push(..._emails)
        utilService.saveToStorage(APPSUS_EMAIL, emails);
    }
    return emails;
}

const _emails = [
    {
        id: utilService.makeId(),  
        subject: 'Hi there!',
        body: 'Welcome to Appsus Mail.',
        isRead: false,
        sentAt: Date.now()
    },
    {
        id: utilService.makeId(),  
        subject: 'Important',
        body: 'Try this.',
        isRead: true,
        sentAt: Date.now() - FULL_DAY 
    },
    {
        id: utilService.makeId(),  
        subject: 'Warning',
        body: 'Your account may have been hacked...',
        isRead: false,
        sentAt: Date.now() - FULL_DAY * 2
    },
    {
        id: utilService.makeId(),  
        subject: 'Good news!',
        body: 'You won',
        isRead: false,
        sentAt: Date.now() - FULL_DAY * 3
    },
    {
        id: utilService.makeId(),  
        subject: 'Thanks',
        body: 'We appriciate your contribution',
        isRead: true,
        sentAt: Date.now() - FULL_DAY * 4
    },
]  

_createEmails()

