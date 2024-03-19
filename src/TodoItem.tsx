import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./TodoItem.css";
import { useRef } from "react";

interface myProps {
  todoContent: string,
  theKey: number,
}

export default function TodoItem(props: myProps) {
  let task = useRef<HTMLLIElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  function MarkTask() {
    if (task.current!.style.textDecoration != "line-through") task.current!.style.textDecoration = "line-through"
    else task.current!.style.textDecoration = "initial";
  }

  function handleDelete() {
    containerRef.current!.remove();
  }
  return (
    <>
      <div className={"todo-item-container"} ref={containerRef}>
        <li key={props.theKey} ref={task} onClick={MarkTask}>{props.todoContent}</li>
        <button className={"todo-button-remove"} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
        <button className={"todo-button-check"} onClick={MarkTask}><FontAwesomeIcon icon={faCheck} /></button>
      </div>
    </>
  );
}
