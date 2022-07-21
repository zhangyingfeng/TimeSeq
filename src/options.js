const colorOptions = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];


//根据颜色库，生成四个不同颜色的按钮，供用户选择
function createOptionBtn(options) {
    chrome.storage.sync.get("color", ({color}) => {
        let currentColor=color

        let colorDiv = document.querySelector("#color")
        options.forEach(colorOption => {
            let btn = document.createElement("button")
            btn.style.backgroundColor = colorOption
            btn.dataset.color=colorOption
            btn.addEventListener("click", handleColorBtnClick)
            // if(colorOption===currentColor){
            //     console.log(colorOption)
            //     btn.classList.add("current")
            // }
            colorOption===currentColor?btn.classList.add("current"):btn.classList.remove("current")
            colorDiv.appendChild(btn)
        });
    })


}

//点击颜色按钮，修改颜色配置，先移出旧的配置，再加入新的配置
function handleColorBtnClick(event) {
    let btn=event.target
    let newColor=btn.dataset.color
    console.log(newColor)
    chrome.storage.sync.set({color:newColor})
    let prevSelectBtn=document.querySelector(".current")
    if(prevSelectBtn&&prevSelectBtn!=btn){
        prevSelectBtn.classList.remove("current")
        btn.classList.add("current")  
    }
    
    
}

createOptionBtn(colorOptions);

