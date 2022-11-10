
export const passwordPattern = value => /^[A-za-z0-9_]{8,16}$/.test(value);
export const namePattern = value => /^[A-Z]+[a-z '-.,`]{1,22}$|^[А-ЯЄІ]+[а-яєі '-.,`]{1,22}$/gm.test(value);
export const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}
