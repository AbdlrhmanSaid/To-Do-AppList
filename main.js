let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let delbuttom = document.querySelector(".delall");
//Empty array To Store The Tasks
let arrayOfTasks = [];

//cheeck if thereis tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//Tragger get data from local storage function
getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); //Add Task To Array of Tasks
    input.value = "";
  }
};

// click on task element
tasksDiv.addEventListener("click", (e) => {
  //delete button
  if (e.target.classList.contains("del")) {
    //remove task from local storeage
    deletTaskWith(e.target.parentElement.getAttribute("data-id"));
    //remove elemente form page
    e.target.parentElement.remove();
  }
  // task element
  if (e.target.classList.contains("task")) {
    //toggle completed for the task
    toggleStatusWith(e.target.getAttribute("data-id"));
    //toggel done
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // push task to array of tasks
  arrayOfTasks.push(task);
  // add tasks to page
  addElementsToPageFrom(arrayOfTasks);
  // add tasks to local storage
  addDataTolocalStorageFrom(arrayOfTasks);
  // //for testing
  // console.log(arrayOfTasks);
  // console.log(JSON.stringify(arrayOfTasks));
}

function addElementsToPageFrom(arrayOfTasks) {
  //Empty Tasks div
  tasksDiv.innerHTML = "";
  // looping on array of tasks
  arrayOfTasks.forEach((task) => {
    // create main div
    let div = document.createElement("div");
    div.className = "task";
    // check if task done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delet"));
    // append delete button in div
    div.appendChild(span);
    // add task div to tasks div
    tasksDiv.appendChild(div);
  });
}

function addDataTolocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deletTaskWith(taskid) {
  // for explain only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskid}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskid);
  addDataTolocalStorageFrom(arrayOfTasks);
}
function toggleStatusWith(taskid) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskid) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataTolocalStorageFrom(arrayOfTasks);
}

// delete all button
delbuttom.onclick = function () {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks");
};
