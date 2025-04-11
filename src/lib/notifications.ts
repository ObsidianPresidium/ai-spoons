let swRegistration: ServiceWorkerRegistration | undefined = undefined;

const showNotification = async (title: string, message?: string | undefined) => {
    const options = message ? { body: message } : {};
    swRegistration?.showNotification(title, options);
}
// I added a function that can be used to register a service worker.
const registerServiceWorker = async () => {
    swRegistration = await navigator.serviceWorker.register("service-worker.ts"); //notice the file name
    return swRegistration;
}
const main = async () => { //notice I changed main to async function so that I can use await for registerServiceWorker
    const swRegistration = await registerServiceWorker();
    showNotification("test", "test message");
}