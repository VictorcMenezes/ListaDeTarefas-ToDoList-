document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Função para salvar tarefas no localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para carregar tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }

    // Função para adicionar nova tarefa
    function addTask(text, completed = false) {
        const taskText = text || taskInput.value.trim();
        if (taskText === "") return;

        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="complete-btn">Concluir</button>
            <button class="delete-btn">Excluir</button>
        `;

        // Botão para marcar tarefa como concluída
        taskItem.querySelector('.complete-btn').addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        // Botão para excluir a tarefa
        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskList.appendChild(taskItem);
        taskInput.value = "";
        saveTasks();
    }

    // Adiciona a tarefa ao clicar no botão
    addTaskBtn.addEventListener('click', () => addTask());

    // Adiciona a tarefa ao pressionar "Enter"
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Carrega as tarefas ao iniciar
    loadTasks();
});
