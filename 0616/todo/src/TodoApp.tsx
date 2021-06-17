import React from "react";
import TodoItem from "./components/TodoItem";
import Today from "./components/Today";
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

    if(this.state.newTodo === ''){
      alert('할 일을 추가해주세요')
    }

    else{
      const items = this.state.todoItems.concat(this.state.newTodo)
      this.setState({
        todoItems: items,
        newTodo: "",
      });
    }
  }



  render() {
    return (
      <div id="body">
        <div id="main">
          <div id="menu">
            <h2>TODO-LIST</h2>
            <form onSubmit={this.handleSubmit}>
              {Today}<br />
              <label htmlFor="new-todo">무엇을 해야 하나요?</label><br/>
              <input type="text" placeholder="할 일 추가하기" value={this.state.newTodo} onChange={this.handleNewTodo} />
              <button >Add #{this.state.todoItems.length + 1}</button><br /> <br/>
            </form>
          </div>
          <div id="list">
            {
              this.state.todoItems.map((item, idx) => (
                <TodoItem inx={idx+1} name={item} key={idx}/>
              ))
            }
            </div>
        </div>
      </div>
    )
  }
}

export default TodoApp;