// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
    console.log('000000')
   
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    } 
    
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
})
window.addEventListener('online', function() {
    let option = {
        title: "有网了!",
        body: "机子帮你开好了, 快来上网啊~",
        icon: "../static/online.ico",
    };
    // 创建上线通知
    new window.Notification(option.title, option);

    console.log('有网络了');
})
window.addEventListener('offline', function() {

    let option = {
        title: "断网了!",
        body: "尝尝10亿伏特!还敢上网不?",
        icon: "../static/offline.ico",
    };
    // 创建上线通知
    new window.Notification(option.title, option);
    console.log('断网了');
})
  