let color='#3aa757';
chrome.runtime.onInstalled.addListener(()=>{
    console.log("onInstalled")
    chrome.storage.sync.set({color})
    chrome.storage.sync.get("color",({color})=>{
        console.log(color)
    })
    
})