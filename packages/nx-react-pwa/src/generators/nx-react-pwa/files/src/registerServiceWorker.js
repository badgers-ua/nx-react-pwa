const registerServiceWorker = () => {
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  const isServiceWorkerSupported = 'serviceWorker' in navigator && !isLocalhost;

  if (!isServiceWorkerSupported) {
    console.log('Service workers are not supported.');
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      function (registration) {
        console.log('Service worker registration succeeded:', registration);
      },
      (error) => {
        console.log('Service worker registration failed:', error);
      }
    );
  });
};

const disableUserSelect = () => {
  const isPWA = () => {
    return window.matchMedia('(display-mode: standalone)').matches;
  };
  if (!isPWA()) {
    return;
  }
  document.querySelectorAll('html,body,#root').forEach((e) => {
    e.style['user-select'] = 'none';
  });
};

registerServiceWorker();
disableUserSelect();
