'use strict';
//安装时初始化默认设定
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    "start_time": 0,
    "minutes": 25,
    "durations": [1, 5, 10, 15, 20, 25, 30]
  })
})
//监听Alarm事件
chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/cubes128.png',
    title: '序块结束！',
    message: '设定的时序块已经结束，查看结果',
    buttons: [
      { title: '继续' }
    ],
    priority: 0
  });

});

// chrome.management.getSelf(self => {
//   console.log(self)
// })

chrome.runtime.onMessage.addListener((message) => {
  let minutes=message.minutes
  let start_time=message.start_time
  let interval = setInterval(() => {
    let time_left=minutes-(Date.now()-start_time)/(60*1000)
    chrome.action.setBadgeText({
      text: time_left.toFixed(1).toString()
    })
    if (time_left <0) {
      clearInterval(interval)
      chrome.action.setBadgeText({
      text: ""
    })
  }
  },30000)
  
})