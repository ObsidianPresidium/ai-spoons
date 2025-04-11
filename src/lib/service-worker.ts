self.addEventListener("activate", async (event) => {
    console.log("service worker activated");
    let notifTimeout: ;
    let queueNotif = (date: Date) => {
        if (notifTimeout !== undefined) {
            clearTimeout(notifTimeout);
        }
        let popupTime = date.getTime() - new Date().getTime();
        notifTimeout = setTimeout(() => {
            self.registration.showNotification("Notification", {
                body: "This is a test notification",
                icon: "/favicon.png",
                tag: "test-notification",
            }, popupTime);
        });
    }

});