import { action, createAction } from 'typesafe-actions';

// 리듀서에서 사용할 수 있게 타입을 내보내 줌
export const ADD_TODO = 'todos/ADD_TODO';
export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';

// 새로운 항목을 추가할 때 사용할 고유 ID
let nextId = 1;

// 액션 생성 함수

// 이 액션 생성 함수의 경우엔 파라미터를 기반하여 커스터마이징된 payload를 설정해주므로
// createAction 이라는 함수를 사용합니다
// 여기서 action은 액션 객체를 만드는 함수입니다
export const addTodo = (text: string) => action(ADD_TODO, { id: nextId++, text });
export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();
