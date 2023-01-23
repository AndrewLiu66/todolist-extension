const form = document.querySelector("#add-form");
const taskInput = document.querySelector("#new-task");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");

// check if there are saved tasks in localStorage
if (localStorage.getItem("tasks"))
{
  tasks = JSON.parse(localStorage.getItem("tasks"));
} else
{
  tasks = [];
}

form.addEventListener("submit", addTask);

// Display the saved tasks
tasks.forEach((task) => {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.innerHTML = `<span class="task-text">${task}</span>
                        <button class="delete-btn">Delete</button>`;
  taskList.appendChild(taskElement);
  // delete task
  const deleteBtn = taskElement.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskElement);
    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
});


function addTask(event) {
  event.preventDefault();
  const task = taskInput.value;
  if (task === "") return;
  let taskExist = false;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] === task)  {
      taskExist = true;
      break;
    }
  }
  if (!taskExist) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `<span class="task-text">${task}</span>
                            <button class="delete-btn">Delete</button>`;
    taskList.appendChild(taskElement);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  taskInput.value = "";
  taskCount.textContent = `You have ${tasks.length} tasks.`;
  // delete task
  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const taskIndex = tasks.indexOf(e.target.parentNode.firstChild.textContent);
      tasks.splice(taskIndex, 1);
      taskList.removeChild(e.target.parentNode);
      taskCount.textContent = `You have ${tasks.length} tasks remaining.`;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      });
      });
      }
