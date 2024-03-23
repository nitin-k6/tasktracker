import React, { useState } from 'react';
import './App.css';

function App() {

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
    assignee: '',
    priority: 'P1'
  });

  const [updateIndex, setUpdateIndex] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    assignee: '',
    priority: ''
  });

  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  

  const [sortByCompletion, setSortByCompletion] = useState(false);
  const toggleSortByCompletion = () => {
    setSortByCompletion(!sortByCompletion);
  };
  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault(); // Prevent form submission -- important
    setTasks([...tasks, newTask]);
    setNewTask({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Pending',
      assignee: '',
      priority: 'P1'
    });
  };


  // Function to handle input changes in the new task form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Function to toggle update form
  const toggleUpdateForm = (index) => {
    setUpdateIndex(index);
    const taskToUpdate = tasks[index];
    setUpdatedTask({
      title: taskToUpdate.title,
      description: taskToUpdate.description,
      startDate: taskToUpdate.startDate,
      endDate: taskToUpdate.endDate,
      status: taskToUpdate.status,
      assignee: taskToUpdate.assignee,
      priority: taskToUpdate.priority
    });
  };

  // Function to handle input changes in the update form --> Only allow priority and status to change
const handleUpdateInputChange = (e) => {
  const { name, value } = e.target;
  // Only update priority and status fields
  if (name === 'priority' || name === 'status') {
    setUpdatedTask({ ...updatedTask, [name]: value });
  }
};


  // Function to handle update task submission
  const handleUpdateTask = (e, index) => {
    e.preventDefault();
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    setUpdateIndex(null); 
  };

  

  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    // This checks fo completion
    if (taskToDelete.status !== 'Completed') {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    } else {
      // If task status is 'Completed', prevent deletion
      alert("Completed tasks cannot be deleted.");
    }
  };

  // Function to filter tasks 
  const filterTasks = () => {
    let filteredTasks = [...tasks];

    if (filterAssignee !== '') {
      filteredTasks = filteredTasks.filter(task => task.assignee.toLowerCase().includes(filterAssignee.toLowerCase()));
    }

    if (filterPriority !== '') {
      filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
    }

    if (filterStartDate !== '') {
      filteredTasks = filteredTasks.filter(task => new Date(task.startDate) >= new Date(filterStartDate));
    }

    if (filterEndDate !== '') {
      filteredTasks = filteredTasks.filter(task => new Date(task.endDate) <= new Date(filterEndDate));
    }

    return filteredTasks;
  };

  return (
    <div className="App">
      <h1 className='tasktracker'>Task Tracker</h1>

      {/*This is  Form for adding new tasks */}
      <div className="AddItem">

        <button onClick={() => setOpen(!open)}> <p>Add New Task</p></button>
        {open && (
          <form onSubmit={addTask}>
            <label>Title:</label>
            <input type="text" name="title" value={newTask.title} onChange={handleInputChange} required />
            <br />
            <label>Description:</label>
            <textarea name="description" value={newTask.description} onChange={handleInputChange} required />
            <br />
            <label>Start Date:</label>
            <input type="date" name="startDate" value={newTask.startDate} onChange={handleInputChange} required />
            <br />
            <label>End Date:</label>
            <input type="date" name="endDate" value={newTask.endDate} onChange={handleInputChange} />
            <br />
            <label>Status:</label>
            <select name="status" value={newTask.status} onChange={handleInputChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Deployed">Deployed</option>
              <option value="Deferred">Deferred</option>
            </select>
            <br />
            <label>Assignee:</label>
            <input type="text" name="assignee" value={newTask.assignee} onChange={handleInputChange} required />
            <br />
            <label>Priority:</label>
            <select name="priority" value={newTask.priority} onChange={handleInputChange}>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
            <br />
            <button type="submit">Add Task</button>
          </form>
        )}
      </div>


      {/* we will be Filtering inputs */}
      <div className="Filters">
        <input
          type="text"
          placeholder="Assignee"
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
        <input
          type="date"
          placeholder="Start Date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
        />
      </div>

      {/* Task List */}
      <div className="TaskList">
        <h2>Task List</h2>
        <ul>
          {filterTasks().map((task, index) => (
            <li key={index} className="TaskItem">
              <h3>{task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Start Date: {task.startDate}</p>
              <p>End Date: {task.endDate}</p>
              <p>Status: {task.status}</p>
              <p>Assignee: {task.assignee}</p>
              <p>Priority: {task.priority}</p>
              <button onClick={() => deleteTask(index)}>Delete</button>
              <button onClick={() => toggleUpdateForm(index)}>Update</button>

              {/* Update Form */}
              {index === updateIndex && (
                <form onSubmit={(e) => handleUpdateTask(e, index)}>
                  <label>Title:</label>
                  <input type="text" name="title" value={updatedTask.title} onChange={handleUpdateInputChange} required />
                  <br />
                  <label>Description:</label>
                  <textarea name="description" value={updatedTask.description} onChange={handleUpdateInputChange} required />
                  <br />
                  <label>Start Date:</label>
                  <input type="date" name="startDate" value={updatedTask.startDate} onChange={handleUpdateInputChange} required />
                  <br />
                  <label>End Date:</label>
                  <input type="date" name="endDate" value={updatedTask.endDate} onChange={handleUpdateInputChange} />
                  <br />
                  <label>Status:</label>
                  <select name="status" value={updatedTask.status} onChange={handleUpdateInputChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                  <br />
                  <label>Assignee:</label>
                  <input type="text" name="assignee" value={updatedTask.assignee} onChange={handleUpdateInputChange} required />
                  <br />
                  <label>Priority:</label>
                  <select name="priority" value={updatedTask.priority} onChange={handleUpdateInputChange}>
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                  </select>
                  <br />
                  <button type="submit">Update Task</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
