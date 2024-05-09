$(document).ready(function() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    $('#form').submit(function(event) {
    event.preventDefault();
    var taskName = $('#taskInput').val();
    if (taskName.trim() !== '') {
        tasks.push({name: taskName, completed: false});
        saveTasks();
        renderTasks();
        $('#taskInput').val('');
    }
    });

    $('#taskList').on('click', 'li .complete-button', function() {
    var index = $(this).closest('li').index();
    tasks[index].completed = true;
    saveTasks();
    renderTasks();
    });

    $('#taskList').on('click', 'li .delete-button', function() {
    var index = $(this).closest('li').index();
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    });

    function renderTasks() {
    $('#taskList').empty();
    tasks.forEach(function(task, index) {
        var listItem = $('<li>').text(task.name);
        if (task.completed) {
        listItem.addClass('completed');
        }
        var buttons = $('<div class="task-buttons">');
        var completeButton = $('<button class="complete-button">').text('Finalizar');
        var deleteButton = $('<button class="delete-button">').text('Excluir');
        buttons.append(completeButton, deleteButton);
        listItem.append(buttons);
        $('#taskList').append(listItem);
    });
    }

    function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
