import React from "react";

interface TodoItemProps {
  name: string;
  inx: any;
}

function TodoItem(props: TodoItemProps) {
  return(
    <div>{props.inx +" : " + props.name}</div>
  )
}

export default TodoItem;