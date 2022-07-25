// "use strict";

// const duration = document.getElementById("duration");
// const add_btn = document.getElementById("add_btn");
// const duration_list = document.getElementById("duration_list");

// function init() {
//     chrome.storage.sync.get((data) => {
//         let durations = data.durations;
//         // console.log(data)
//         getDurationList(durations)

//         //添加按钮被点击
//         add_btn.addEventListener("click", async () => {
//             //获得同步存储中的时长设定
//             durations.push(parseInt(duration.value));

//             chrome.storage.sync.set({ durations: durations }, () => {
//                 duration_list.replaceChildren();
//                 chrome.storage.sync.get((data) => {
//                     let durations = data.durations;
//                     getDurationList(durations)
//                 });
//             });
//         });

        
//     }); //读取同步存储的回调结束
// }

// function getDurationList(durations) {
//     //根据初始化的时长信息显示按钮列表
//     durations.forEach((duration) => {
//         // <li>5分钟<button>删除</button></li>

//         let li = document.createElement("li");
//         li.innerText = duration + "分钟";

//         let btn = document.createElement("button");
//         btn.innerText = "刪除";
//         btn.dataset.duration = duration;
//         btn.addEventListener("click",deleteDutation)


//         li.appendChild(btn);

//         duration_list.appendChild(li);
//     }); //时长的forEach循环结束
// }

// function deleteDutation(event){
//     event.target.dataset.duration
// }

// init();

