const toDoForm = document.getElementById("todo-form");
const toDoInput = document.getElementById("todo-input");
const toDoList = document.getElementById("todo-list");

toDoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const newTask = toDoInput.value;
    if (newTask === "") {
        alert("Please Enter a task");
        return;
    }

    toDoInput.value = ""; 
    addTask(newTask);
});

function addTask(task) {
    const listItem = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const editButton = document.createElement('button');
    editButton.textContent = 'Düzenle';
    listItem.appendChild(editButton);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    listItem.appendChild(checkbox);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    listItem.appendChild(deleteButton);
    toDoList.appendChild(listItem);

    deleteButton.addEventListener('click', function() {
        toDoList.removeChild(listItem);
    });

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            taskText.style.textDecoration = 'line-through';
        } else {
            taskText.style.textDecoration = 'none';
        }
    });

    editButton.addEventListener('click', function() {
        const isEditing = listItem.classList.contains('editing');
      
        if (isEditing) {
            // Switch back to view mode
            taskText.textContent = this.previousSibling.value; // Assuming the input field is right before the edit button
            listItem.classList.remove('editing');
            editButton.textContent = 'Edit';
        } else {
            // Switch to edit mode
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskText.textContent;
            listItem.insertBefore(input, taskText);
            listItem.removeChild(taskText);
            listItem.classList.add('editing');
            editButton.textContent = 'Save';
        }
      });
      saveTasksToLocalStorage();
}
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
    });
  });