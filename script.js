document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
  
    // Fetch and display all todos
    async function fetchTodos() {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      taskList.innerHTML = '';
      todos.forEach(todo => {
        addTodoToList(todo);
      });
    }
  
    // Add a new todo
    addTaskButton.addEventListener('click', async () => {
      const task = taskInput.value;
      if (task) {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task }),
        });
        const newTodo = await response.json();
        addTodoToList(newTodo);
        taskInput.value = '';
      }
    });
  
    // Mark a todo as completed
    async function toggleTodoComplete(id, completed) {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTodos();
    }
  
    // Delete a todo
    async function deleteTodo(id) {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      fetchTodos();
    }
  
    // Add todo to the list
    function addTodoToList(todo) {
      const li = document.createElement('li');
      li.textContent = todo.task;
      if (todo.completed) {
        li.classList.add('completed');
      }
  
      li.addEventListener('click', () => toggleTodoComplete(todo._id, todo.completed));
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodo(todo._id);
      });
  
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    }
  
    fetchTodos();
  });
  