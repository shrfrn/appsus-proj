export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    getRandomColor,
};

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
}

function makeId(length = 7) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomColor() {
    const colors = [
        '#A2DBFA',
        '#66DE93',
        '#F5A962',
        '#DBE6FD',
        '#39A6A3',
        '#FFF5B7',
        '#867AE9',
        '#CE97B0',
    ];
    const idx = [Math.floor(Math.random() * colors.length)];

    return colors[idx];
}
