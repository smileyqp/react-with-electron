
export default function  windowNotification (title,body,icon) {
    let option = {
        title,
        body,
        icon
    };
    new window.Notification(option.title, option);
}