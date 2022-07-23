let start_time = document.querySelector("#start_time")
console.log(new Date().toLocaleTimeString().substring(0, 5))
start_time.value = new Date().toLocaleTimeString().substring(0, 5)

let duration_btns = document.querySelectorAll(".duration_btn")
console.log(duration_btns)
duration_btns.forEach(btn=>{
    btn.addEventListener("click", async () => {
        let duration=btn.dataset.duration
        console.log(duration)
        let minutes = parseFloat(duration);
        chrome.action.setBadgeText({text: duration});
        chrome.alarms.create({delayInMinutes: minutes});
        chrome.storage.sync.set({minutes: minutes});
        window.close();
    })
})


// chrome.storage.sync.get("color",({color})=>{
//     btn.style.backgroundColor=color;
// })

// function setBgColor(){
//     chrome.storage.sync.get("color",({color})=>{
//         document.body.style.backgroundColor=color;
//     })
// }

// btn.addEventListener("click",async()=>{
//     let [tab]=await chrome.tabs.query({
//         active:true,
//         currentWindow:true
//     });


//     chrome.scripting.executeScript({
//         target:{tabId:tab.id},
//         function:setBgColor,
//     });
// })