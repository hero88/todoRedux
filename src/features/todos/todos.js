import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

export default function Todos() {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState('');
    const {todos} = useSelector((reduxData)=> reduxData.todos);
    
    const updateTodoStatus = todo => {
        dispatch({
            type: 'todos/todoToggled',
            payload: todo.id
        })
    }

    const deleteTodo = todo => {
        dispatch({
            type: 'todo/todoDelete',
            payload: todo.id
        })
    }

    const handleNewTask = e => setNewTask(e.target.value);

    const addTodo = () => {
        if (newTask.length>0) {
            dispatch({
                type: 'todos/todoAdded',
                payload: newTask
            })
        }         
    }

    useEffect(()=>{

    }, [todos]);

    return (
    <div style={{textAlign: 'left', marginLeft: 15, marginBottom: 15}}>
        <input type='text' placeholder='Enter your new task...' onChange={handleNewTask}/>
        &nbsp;
        <button onClick={addTodo}>Add New Task</button>
        <br/>
        <h1>TODO LIST</h1>
        {
            todos 
            ? 
            todos.map((todo, index)=>
                <li key={todo.id}>
                    <i>Task:</i> {todo.text},  <i>completed:</i> {todo.completed ? 'Yes' : 'No'} 
                    &nbsp;&nbsp;
                    <button onClick={()=> {updateTodoStatus(todo)}}>Update</button>
                    &nbsp;
                    <button onClick={()=> {deleteTodo(todo)}}>Delete</button>
                </li>
            )
            : <h3>Nothing left</h3> 
        }
    </div>
    )
}