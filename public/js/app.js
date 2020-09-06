if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register("/sw-gads-weather-app.js")
            .then((reg) => console.log('service worker registered', reg))
            .catch((err) => console.error(err));
    });
}
