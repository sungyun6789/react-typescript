// Action Type
// 뒤에 as count를 붙어줌으로써 나중에 액션 객체를 만들때 action.type의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE'와 같이 실제 문자열 값으로 추론 되도록 해줌
const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

// 액션 생성함수를 선언함
export const increase = () => ({
  type: INCREASE,
});

export const decrease = () => ({
  type: DECREASE,
});

export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  // 액션에 부가적으로 필요한 값을 payload라는 이름으로 통일
  // 이는 FSA라는 규칙으로 이 규칙을 이용하면 액션들이 모두 비슷한 구조로 이루어져있게 되어 추후에 다룰 때도 편하고
  // 읽기 쉽고, 액션 구조를 일반화함으로써 액션에 관련된 라이브러리를 사용할 수 있게 해줌
  payload: diff,
});

// 모든 액션 객체들에 대한 타입을 준비
// ReturnType<typeof ____>는 특정 함수의 반환값을 추론
// 상단부에서 액션타입을 선언 할 때 as const를 하지 않으면 이 부분이 제대로 동작하지 않음
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언
type CounterState = {
  count: number;
};

// 초기상태
const initialState: CounterState = {
  count: 0,
};

// 리듀서를 작성
// 리듀서에서는 state와 함수의 반환값이 일치하도록 작성
// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정
function counter(state: CounterState = initialState, action: CounterAction): CounterState {
  switch (action.type) {
    case INCREASE:
      return {
        count: state.count + 1,
      };
    case DECREASE:
      return {
        count: state.count - 1,
      };
    case INCREASE_BY:
      return {
        count: state.count + action.payload,
      };
    default:
      return state;
  }
}

export default counter;
