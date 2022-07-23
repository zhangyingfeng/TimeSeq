'use strict';

//获得当前时间
// let start_time = document.querySelector("#start_time")
// start_time.value = new Date().toLocaleTimeString().substring(0, 5)


const duration_btn_list = document.querySelectorAll(".duration_btn")
const start_btn = document.querySelector("#start_btn")
const cancle_btn = document.querySelector("#cancle_btn")
const progress_bar = document.querySelector("#progress_bar")

//进度条显示
function progressBar(progressBar, start_time, duration) {
    progressBar.max = duration * 60 * 1000
    let interval = setInterval(() => {
        let progress = Date.now() - start_time
        progressBar.value = progress;

        if (progress > progressBar.max) {
            clearInterval(interval)
            window.close()
        }
    }, 100);
}

//重置所有按钮的颜色
function resetBtnColor(duration_btn_list) {
    duration_btn_list.forEach(btn => {
        btn.classList.remove("selected_btn")
    })
}

//禁用所有时长按钮
function disableBtn(duration_btn_list) {
    duration_btn_list.forEach(btn => {
        btn.disabled = "true" 
        // !btn.classList.contains("selected_btn") ? btn.disabled = "true" : ""
    })
}

//初始化
function init() {
    chrome.storage.sync.get(data => {
        console.log(data)
        const minutes = data.minutes
        const start_time = data.start_time

        //读取上次设置的时长，并将对应按钮设定为选中状态
        duration_btn_list.forEach(btn => {
            let duration = parseInt(btn.dataset.duration);
            duration == minutes ? btn.classList.add("selected_btn") : null
        });

        //读取上次开始的时间，如果还没有结束，则显示当前进度
        const end_time = data.start_time + data.minutes * 60 * 1000

        if (Date.now() < end_time) {
            disableBtn(duration_btn_list)
            progressBar(progress_bar, start_time, minutes)
            start_btn.style.display = "none"
            cancle_btn.style.display = "inline"
            progress_bar.style.display = "inline"
        }

    })
}

init();

//时长选择按钮被点击
duration_btn_list.forEach(btn => {

    btn.addEventListener("click", () => {
        //每次点击先重置所有按钮颜色，将被选中的按钮高亮
        resetBtnColor(duration_btn_list)
        btn.classList.add("selected_btn")

        const duration = btn.dataset.duration
        chrome.action.setBadgeText({ "text": duration });

        //保存时长
        let minutes = parseFloat(duration);
        chrome.storage.sync.set({
            "minutes": minutes
        });
        start_btn.style.display = "block";
    })

})


//开始按钮被点击
start_btn.addEventListener("click", async () => {
    //获得同步存储中的时长设定
    let item = await chrome.storage.sync.get(['minutes'])
    console.log(item)
    //根据设定的时长，创建提醒事件
    chrome.alarms.create({
        "delayInMinutes": item.minutes
    });

    //保存开始时间 
    let start_time = Date.now();
    console.log(start_time)
    chrome.storage.sync.set({
        "start_time": start_time,
    });

    //控制按钮的显示
    disableBtn(duration_btn_list)
    start_btn.style.display = "none";
    cancle_btn.style.display = "inline";
    progress_bar.style.display = "inline";
    progressBar(progress_bar, start_time, item.minutes)

    // window.close();
})


//取消按钮被点击
cancle_btn.addEventListener("click", () => {
    chrome.action.setBadgeText({ "text": "" })
    chrome.alarms.clearAll()
    cancle_btn.style.display = "none";
    //设定初始时间为0，并关闭popup页面
    chrome.storage.sync.set({ "start_time": 0 }, () => {
        window.close();
    })
})

