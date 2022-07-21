let  btn=document.getElementById("btn")

chrome.storage.sync.get("color",({color})=>{
    btn.style.backgroundColor=color;
})

function setBgColor(){
    chrome.storage.sync.get("color",({color})=>{
        document.body.style.backgroundColor=color;
    })
}

btn.addEventListener("click",async()=>{
    let [tab]=await chrome.tabs.query({
        active:true,
        currentWindow:true
    });


    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        function:setBgColor,
    });
})