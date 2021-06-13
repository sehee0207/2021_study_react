interface Todo{
    id: number;
    content: string;
    completed: boolean;
}

let todo: Todo;
todo = {
    id: 1,
    content: "Study",
    completed: false,
}

function addTodo(todo: Todo){

}

addTodo({id:2, content: "eat", completed: true})

interface SquareFunc{
    (num: number): number;
}

const SquareFunc: SquareFunc = function(num: number){
    return num * num
}

class TodoClass implements Todo{
    id: number;
    content: string;
    completed: boolean;
}