function registerServiceWorker() {
  const isServiceWorkerSupported = 'serviceWorker' in navigator;

  if (!isServiceWorkerSupported) {
    console.log('Service workers are not supported.');
    return;
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(
      function (registration) {
        console.log('Service worker registration succeeded:', registration);
      },
      function (error) {
        console.log('Service worker registration failed:', error);
      }
    );
  });
}

registerServiceWorker();
