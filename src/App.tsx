import { useRef, useState, FormEvent, useEffect } from "react";
import "./App.css"
import TodoItem from "./TodoItem";

function App() {
  let [todos, setTodos] = useState<string[]>([]);
  let todoText = useRef<HTMLInputElement>(null);
  let changeStack = useRef<HTMLDivElement>(null);
  let [changes, setChanges] = useState<string[]>([])


  useEffect(() => {
    const existingTodos = localStorage.getItem("todos");
    setTodos(existingTodos ? JSON.parse(existingTodos) : [])
  }, []);

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let next = [...todos, todoText.current!.value];
    localStorage.setItem("todos", JSON.stringify(next))
    setTodos(next);
    next = [...changes, todoText.current!.value];
    setChanges(next);
    setTimeout(() => {
      setChanges(changes.slice(0, -1));
      console.log(changes.slice(0, -1))
    }, 2000);
    todoText.current!.value = "";
  }

  return (
    <>
      <form className="form" action="" onSubmit={addTodo}>
        <input type="text" placeholder="Input your todo" ref={todoText} required />
        <input type="submit" />
      </form>

      <section>
        <ul className="todo-list">
          {
            todos.map((todoItem, index) =>
              <TodoItem theKey={index} todoContent={todoItem} />
            )
          }
        </ul>
      </section>
      <div className="change-stack" ref={changeStack} >
        {
          changes.map(change => <div>Added "{change}" to your todos</div>)
        }
      </div>
    </>
  )
}

export default App
