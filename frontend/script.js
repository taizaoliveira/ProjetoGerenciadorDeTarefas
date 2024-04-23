const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const taskText = taskInput.value.trim(); 

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = ''; 
        saveTasks(); 
    }
});

function addTask(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="remove-btn">X</button>
        <button class="done-btn">✔</button>
    `;
    taskList.appendChild(li);
}

taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        event.target.parentElement.remove(); 
        saveTasks();
    } else if (event.target.classList.contains('done-btn')) {
        const taskItem = event.target.parentElement;
        taskItem.classList.toggle('done'); 
        saveTasks();
    }
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li span').forEach(task => {
        tasks.push({
            text: task.textContent,
            completed: task.parentElement.classList.contains('done') 
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.addEventListener('load', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            addTask(task.text);
            if (task.completed) {
                taskList.lastElementChild.classList.add('done');
            }
        });
    }
});
