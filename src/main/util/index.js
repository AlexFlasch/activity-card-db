export default function promisifyOn(api, event) {
    return new Promise((resolve) => {
        api.on(event, response => resolve(response));
    });
}
