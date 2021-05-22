import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GithubAction } from './types';
import { getUserProfile } from '../../api/github';
import { getUserProfileAsync } from './actions';

export function getUserProfileThunk(
  username: string,
): ThunkAction<void, RootState, null, GithubAction> {
  return async (dispatch) => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUserProfile(username);
      dispatch(success(userProfile));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

/* ThunkAction의 Generics로는 다음 값들을 순서대로 넣어줘야 한다
   TReturnType, TState, TExtraThunkArg, TBasicAction

   TReturnType: thunk 함수에서 반환하는 값의 타입 설정
   TState: 스토어의 상태에 대한 타입을 설정
   TExtraThunkArg: redux-thunk 미들웨어의 Extra Argument 타입을 설정
   TBasicAction: dispatch 할 수 있는 액션들의 타입을 설정

   TReturnType의 경우 아무것도 반환하지 않는다면 void라고 넣으면 된다.
*/
