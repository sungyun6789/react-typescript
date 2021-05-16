import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action Type
// 뒤에 as count를 붙어줌으로써 나중에 액션 객체를 만들때 action.type의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE'와 같이 실제 문자열 값으로 추론 되도록 해줌
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

// 액션 생성함수를 선언함
export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>(); // payload 타입을 Generics으로 설정

// 모든 액션 객체들에 대한 타입을 준비
// ReturnType<typeof ____>는 특정 함수의 반환값을 추론
// 상단부에서 액션타입을 선언 할 때 as const를 하지 않으면 이 부분이 제대로 동작하지 않음
const actions = { increase, decrease, increaseBy }; // 모든 액션 생성함수들을 actions 객체에 넣음
type CounterAction = ActionType<typeof actions>; // ActionType를 사용하여 모든 액션 객체들의 타입을 준비

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언
type CounterState = {
  count: number;
};

// 초기상태
const initialState: CounterState = {
  count: 0,
};

// 리듀서를 작성
// createReducer는 리듀서를 쉽게 작성할 수 있게 하는 함수
// createReducer는 switch문이 아닌 객체 형태로 작성 할 수 있게 해줌(훨씬 간결)
// Generics로 리듀서에서 관리할 상태, 그리고 리듀서에서 처리 할 모든 액션 객체들의 타입을 넣음
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }), // 액션을 참조 할 필요 없으면 파라미터로 state만 받아와도 됨
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }), // 액션의 타입을 유추할 수 있음
});

export default counter;
