'use strict';

const start_btn = document.querySelector("#start_btn")
const cancle_btn = document.querySelector("#cancle_btn")
const progress_bar = document.querySelector("#progress_bar")
const duration_div = document.getElementById("duration_div")

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
    })
}

//初始化
function init() {
    chrome.storage.sync.get(data => {
        const minutes = data.minutes
        const start_time = data.start_time
        const durations = data.durations

        //根据初始化的时长信息显示按钮列表

        durations.forEach(duration => {

            let btn = document.createElement("button")
            btn.innerText = duration
            btn.dataset.duration = duration
            btn.classList.add("duration_btn")

            //按钮的时长是否和设定分钟相同，如果相同则将对应按钮设定为选中状态
            duration == minutes ? btn.classList.add("selected_btn") : null

            btn.addEventListener("click", () => {
                //每次点击先重置所有按钮颜色，将被选中的按钮高亮
                const duration_btn_list = document.querySelectorAll(".duration_btn")
                resetBtnColor(duration_btn_list)
                btn.classList.add("selected_btn")

                //保存时长
                chrome.storage.sync.set({
                    "minutes": duration
                });
                start_btn.style.display = "block";
            })

            duration_div.appendChild(btn)

        })//时长的forEach循环结束

        //读取上次开始的时间，如果还没有结束，则显示当前进度
        const end_time = start_time + minutes * 60 * 1000
        if (Date.now() < end_time) {
            const duration_btn_list = document.querySelectorAll(".duration_btn")
            disableBtn(duration_btn_list)
            progressBar(progress_bar, start_time, minutes)
            start_btn.style.display = "none"
            cancle_btn.style.display = "inline"
            progress_bar.style.display = "inline"
        }

    })//读取同步存储的回调结束

    //开始按钮被点击
    start_btn.addEventListener("click", async () => {
        //获得同步存储中的时长设定
        let item = await chrome.storage.sync.get(['minutes'])
        //根据设定的时长，创建提醒事件
        chrome.alarms.create({
            "delayInMinutes": item.minutes
        });
        chrome.action.setBadgeText({
            "text": item.minutes.toString()
        });

        //保存开始时间 
        let start_time = Date.now();
        // console.log(start_time)
        chrome.storage.sync.set({
            "start_time": start_time,
        });

        chrome.runtime.sendMessage({
            "minutes":item.minutes,
            "start_time":start_time
        })

        //控制按钮的显示
        const duration_btn_list = document.querySelectorAll(".duration_btn")
        disableBtn(duration_btn_list)
        start_btn.style.display = "none";
        cancle_btn.style.display = "inline";
        progress_bar.style.display = "inline";
        progressBar(progress_bar, start_time, item.minutes)
    })//开始按钮被点击的回调结束


    //取消按钮被点击
    cancle_btn.addEventListener("click", () => {
        chrome.action.setBadgeText({ "text": "" })
        chrome.alarms.clearAll()
        cancle_btn.style.display = "none";
        //设定初始时间为0，并关闭popup页面
        chrome.storage.sync.set({ "start_time": 0 }, () => {
            window.close();
        })
    })//取消按钮被点击的回调结束
}

//执行popup的初始化
init();

// chrome.management.getAll((result) => {
//     console.log(result)
//     result.forEach(item => {
//         console.log(item.name)
//     })

// })



