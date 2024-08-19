// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const card = document.createElement("div");
        card.className = `card ${getTaskStatusClass(task)}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed || false;
        checkbox.addEventListener("change", () => toggleTaskStatus(index));

        const taskText = document.createElement("span");
        taskText.textContent = task.name;
        taskText.addEventListener("click", () => showTaskDetails(index));

        const dueDate = document.createElement("span");
        dueDate.textContent = task.dueDate;
        dueDate.className = "due-date";

        const priority = document.createElement("span");
        priority.textContent = `Priority: ${task.priority || "Not Set"}`;
        priority.className = "priority";

        const label = document.createElement("span");
        label.textContent = `Label: ${task.label || "Not Set"}`;
        label.className = "label";

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = '<i class="delete-button-icon">&#10006;</i>';
        deleteButton.addEventListener("click", () => deleteTask(index));

        card.appendChild(checkbox);
        card.appendChild(taskText);
        card.appendChild(dueDate);
        card.appendChild(priority);
        card.appendChild(label);
        card.appendChild(deleteButton);
        taskList.appendChild(card);
    });
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const priorityInput = document.getElementById("priorityInput");
    const labelInput = document.getElementById("labelInput");

    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value.trim();
    const label = labelInput.value.trim();

    if (taskName !== "") {
        const newTask = {
            name: taskName,
            dueDate: dueDate,
            priority: priority,
            label: label,
            completed: false,
        };

        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "";
        labelInput.value = "";
        displayTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Toggle task status
function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Show task details
function showTaskDetails(index) {
    const task = tasks[index];
    alert(
        `Task Details:\nName: ${task.name}\nDue Date: ${task.dueDate}\nPriority: ${
      task.priority || "Not Set"
    }\nLabel: ${task.label || "Not Set"}`
    );
}

// Get task status class
function getTaskStatusClass(task) {
    const isOverdue = isTaskOverdue(task.dueDate);
    return isOverdue && !task.completed ?
        "overdue" :
        task.completed ?
        "completed" :
        "not-completed";
}

// Check if task is overdue
function isTaskOverdue(dueDate) {
    const now = new Date().setHours(0, 0, 0, 0);
    const taskDueDate = new Date(dueDate).setHours(0, 0, 0, 0);
    return now > taskDueDate;
}

displayTasks();