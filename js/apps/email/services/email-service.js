import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js';

const APPSUS_EMAIL = 'appsusEmail'
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
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null
    }
}
function query(){
    return storageService.query(APPSUS_EMAIL)
}

function getById(emailId){
    return storageService.get(APPSUS_EMAIL, emailId)
  }
  
function remove(emailId){
    storageService.remove(APPSUS_EMAIL, emailId)
}

function save(email){
    if(email.id) {
        return storageService.put(APPSUS_EMAIL, email)
      } else {
        return storageService.post(APPSUS_EMAIL, email)
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
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: 'Hi there!',
        body: 'Welcome to Appsus Mail.',
        isRead: false,
        sentAt: Date.now()
    },
    {
        id: utilService.makeId(),  
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: 'Important',
        body: 'Try this.',
        isRead: true,
        sentAt: Date.now() - FULL_DAY 
    },
    {
        id: utilService.makeId(),  
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: 'Warning',
        body: 'Your account may have been hacked...',
        isRead: false,
        sentAt: Date.now() - FULL_DAY * 2
    },
    {
        id: utilService.makeId(),  
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: 'Good news!',
        body: 'You won',
        isRead: false,
        sentAt: Date.now() - FULL_DAY * 3
    },
    {
        id: utilService.makeId(),  
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: 'Thanks',
        body: 'We appriciate your contribution',
        isRead: true,
        sentAt: Date.now() - FULL_DAY * 4
    },
]  

_createEmails()

