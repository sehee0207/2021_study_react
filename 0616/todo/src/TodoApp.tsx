import React from "react";
import TodoItem from "./components/TodoItem";
import "./App.css"

interface TodoAppProps {}
interface TodoAppState {
  todoItems: string[];
  newTodo: string;
}

class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
  constructor(props: TodoAppProps) {
    super(props);
    
    this.state = {
      todoItems: [],
      newTodo: "",
    };
  }

  handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodo: e.target.value,
    });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = this.state.todoItems.concat(this.state.newTodo)

    this.setState({
      todoItems: items,
      newTodo: "",
    });
  }


  render() {
    return (
      <div id="body">
        <div id="main">
          <h2>TODO-LIST</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo" id="text">오늘은 무엇을 해야 하나요?</label><br/>
            <input type="text" placeholder="할 일 추가하기" id="new-todo" value={this.state.newTodo} onChange={this.handleNewTodo} />
            <button>Add #{this.state.todoItems.length + 1}</button><br /> <br/>
          </form>
          {
            this.state.todoItems.map((item, idx) => (
              <TodoItem name={item} key={idx}/>
            ))
          }
        </div>
      </div>
    )
  }
}

export default TodoApp;