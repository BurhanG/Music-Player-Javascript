
const getStorage = (text) => JSON.parse(localStorage.getItem(text));

const setStorage = (name, text) => {
    console.log('setStorage worked');

    let savedData = getStorage(name);
    let data;
    if (savedData) {
        console.log('if çalıştı', savedData);
        savedData.push(text);
        console.log('saved data', savedData);

        data = JSON.stringify(savedData);
        console.log('data', data);
    } else {
        console.log('else çalıştı');
        data = JSON.stringify([text]);
        console.log('data', data);
    }
    localStorage.setItem(name, data);

};
const deleteStorage = (text) => {
    localStorage.removeItem(text);
};