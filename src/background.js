'use strict';

//监听Alarm事件
chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/cubes128.png',
    title: '序块结束！',
    message: '设定的时间序块已经结束，查看结果',
    buttons: [
      { title: '继续' }
    ],
    priority: 0
  });
  chrome.storage.sync.set({
    "alarm_status": "finished"
  });

});