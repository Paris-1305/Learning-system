// self.addEventListener("install", (event) => {
//   console.log("Service Worker installed");
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service Worker activated");
//   return self.clients.claim();
// });

// self.addEventListener("fetch", (event) => {
//   // Simple passthrough for now
//   event.respondWith(fetch(event.request));
// });

navigator.serviceWorker.getRegistrations().then((regs) => {
  regs.forEach(reg => reg.unregister());
});
