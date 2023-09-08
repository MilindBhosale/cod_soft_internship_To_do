const input = document.querySelector(".ip");
const btn = document.querySelector(".button");
const Task = document.querySelector(".Task");

function saveTaskToLocalStorage(task) {
    let tasks = [];
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeFromLocalStorage(task) {
    let tasks = localStorage.getItem("tasks");
    if (tasks !== null) {
        tasks = JSON.parse(tasks);
        tasks = tasks.filter(item => item !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
window.addEventListener("load", () => {
    if (localStorage.getItem("tasks")) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(task => {
            let newitem = document.createElement("div");
            newitem.classList.add("item");
            newitem.innerHTML = `
                <p>${task}</p>
                <div class="item-btn">
                    <i class="fa-solid fa-pen"></i>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            `;
            Task.appendChild(newitem);
        });
    }
});


btn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        let newitem = document.createElement("div");
        newitem.classList.add("item");
        newitem.innerHTML = `
            <p>${input.value}</p>
            <div class="item-btn">
                <i class="fa-solid fa-pen"></i>
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        Task.appendChild(newitem);
        saveTaskToLocalStorage(input.value); // Save the task to local storage
        input.value = "";
    }
})


input.addEventListener("keyup", () => {
    if (input.value.trim() !== "") {
        btn.classList.add("active");
    } else {
        btn.classList.remove("active");
    }
})

Task.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-xmark")) {
        let taskText = e.target.parentElement.previousElementSibling.innerHTML;
        removeFromLocalStorage(taskText);
        e.target.parentElement.parentElement.remove();
        }
    if (e.target.classList.contains("fa-pen")) {
        let taskText = e.target.parentElement.previousElementSibling.innerHTML;
        input.value=taskText;
        removeFromLocalStorage(taskText);
        e.target.parentElement.parentElement.remove();
    }
})

