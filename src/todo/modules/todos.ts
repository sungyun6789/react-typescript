import { createAction, ActionType, createReducer, action } from 'typesafe-actions';

// 액션 타입 정의
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';

let nextId = 1; // 새로운 항목을 추가할 때 사용 할 고유 ID

// 액션 생성
export const addTodo = (text: string) => action(ADD_TODO, { id: nextId++, text });
export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();
// addTodo와 다르게 짧은 이유는 payload가 그대로 들어가기 때문이다.

const actions = {
  addTodo,
  toggleTodo,
  removeTodo,
};

// 모든 액션 객체들에 대한 타입 준비
type TodoAction = ActionType<typeof actions>;

// 상태에서 사용 할 일 항목 데이터 타입 정의
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodosState = Todo[];

// 초기 상태 선언
const initialState: TodosState = [];

// 리듀서 작성
const todos = createReducer<TodosState, TodoAction>(initialState, {
  [ADD_TODO]: (state, action) => state.concat({ ...action.payload, done: false }),
  // 비구조화 할당을 이용해서 payload 값의 이름을 바꿀 수 있음
  [TOGGLE_TODO]: (state, { payload: id }) =>
    state.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  [REMOVE_TODO]: (state, { payload: id }) => state.filter((todo) => todo.id !== id),
});

export default todos;
