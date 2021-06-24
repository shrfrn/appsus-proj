import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js';

const APPSUS_EMAIL = 'appsusEmail'
const FULL_DAY = 1000 * 60 * 60 * 24

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
    return storageService.remove(APPSUS_EMAIL, emailId)
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
        from: 'Ezra Hillelovich',
        to: 'DooDoo',
        cc: '',
        bcc: '',
        subject: 'Hi there!',
        body: 'Welcome to Appsus Mail. \nLorem ipsum dolor, sit amet consectetur adipisicing elit. Quas eaque delectus illo? Qui commodi, dignissimos nemo minus voluptas molestias esse earum ab magni dolore, laborum facere voluptatibus aliquam. Aliquam maiores asperiores beatae. Eum accusantium, praesentium deserunt iure beatae repellendus minima nisi sed explicabo suscipit voluptatum dignissimos repellat perspiciatis officia cumque sint mollitia quo ab! Tenetur, distinctio mollitia. Natus voluptatibus iure, ea, cupiditate aliquid aperiam necessitatibus dolorum nobis aliquam ipsam nemo cum enim sit quidem vel labore ipsa quod voluptates libero praesentium in consectetur! Odio, fugiat repellendus assumenda deserunt cumque accusamus, id numquam nobis consequatur consequuntur rem tempora necessitatibus dolorum ex officiis ad sint quisquam quas aperiam! Perferendis vel laudantium cum esse debitis nisi ducimus consequatur autem enim accusamus, expedita non maiores suscipit totam ullam minima unde libero. Eligendi, ut velit similique dignissimos facere molestiae atque doloremque explicabo quas expedita itaque architecto reprehenderit eveniet iste odit, voluptatibus ea repellendus ipsum. Magnam repellat odio recusandae consequuntur accusamus dicta eveniet ea. Ducimus deleniti similique fugiat, quia dolore numquam adipisci exercitationem dolorum aut nam placeat voluptatem! Eligendi, voluptatem dignissimos architecto consequuntur rerum dolore possimus quo nisi a facilis, numquam quam! Architecto assumenda vitae accusamus consectetur. Excepturi velit nesciunt neque tenetur nihil magnam maiores porro?',
        isRead: false,
        sentAt: Date.now()
    },
    {
        id: utilService.makeId(),  
        from: 'James Tompson',
        to: 'Lalu S',
        cc: '',
        bcc: '',
        subject: 'Important',
        body: 'Try this. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas eaque delectus illo? Qui commodi, dignissimos nemo minus voluptas molestias esse earum ab magni dolore, laborum facere voluptatibus aliquam. Aliquam maiores asperiores beatae. Eum accusantium, praesentium deserunt iure beatae repellendus minima',
        isRead: true,
        sentAt: Date.now() - FULL_DAY 
    },
    {
        id: utilService.makeId(),  
        from: 'Boaz',
        to: 'Miriam',
        cc: '',
        bcc: '',
        subject: 'Warning',
        body: 'Your account may have been hacked... \nLorem ipsum dolor, sit amet consectetur adipisicing elit. Quas eaque delectus illo? Qui commodi, dignissimos nemo minus voluptas molestias esse earum ab magni dolore, laborum facere voluptatibus aliquam. Aliquam maiores asperiores beatae. Eum accusantium, praesentium deserunt iure beatae repellendus minima',
        isRead: false,
        sentAt: Date.now() - FULL_DAY * 2
    },
    {
        id: utilService.makeId(),  
        from: 'Yonni',
        to: 'Jonni',
        cc: '',
        bcc: '',
        subject: 'Good news! \nLorem ipsum dolor, sit amet consectetur adipisicing elit. Quas eaque delectus illo? Qui commodi, dignissimos nemo minus voluptas molestias esse earum ab magni dolore, laborum facere voluptatibus aliquam. Aliquam maiores asperiores beatae. Eum accusantium, praesentium deserunt iure beatae repellendus minima',
        body: 'You won',
        isRead: false,
        sentAt: Date.now() - FULL_DAY * 3
    },
    {
        id: utilService.makeId(),  
        from: 'Ron',
        to: 'Ronit',
        cc: '',
        bcc: '',
        subject: 'Thanks',
        body: 'We appriciate your contribution.\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Quas eaque delectus illo? Qui commodi, dignissimos nemo minus voluptas molestias esse earum ab magni dolore, laborum facere voluptatibus aliquam. Aliquam maiores asperiores beatae. Eum accusantium, praesentium deserunt iure beatae repellendus minima',
        isRead: true,
        sentAt: Date.now() - FULL_DAY * 4
    },
]  

_createEmails()

