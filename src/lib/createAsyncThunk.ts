import { Dispatch } from 'redux';
import { AsyncActionCreatorBuilder } from 'typesafe-actions';

type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;

/* F extends (...params: any[]) => Promise<any>는 F를 Generics로 받아오는데
   해당 타입은 프로미스를 리턴하는 함수형태만 받아올 수 있도록 설정
   type Params = Paramerts<F>; 는 함수의 파라미터의 타입을 추론해준다. 이를 통해 F 함수의 파라미터와
   thunk 함수의 파라미터가 동일하게끔 설정
*/
export default function createAsyncThunk<
  A extends AnyAsyncActionCreator,
  F extends (...params: any[]) => Promise<any>,
>(AsyncActionCreatorBuilder: any, promiseCreator: F) {
  type Params = Parameters<F>;
  return function thunk(...params: Params) {
    return async (dispatch: Dispatch) => {
      const { request, success, failure } = AsyncActionCreatorBuilder;
      dispatch(request(undefined));
      try {
        const result = await promiseCreator(...params);
        dispatch(success(result));
      } catch (e) {
        dispatch(failure(e));
      }
    };
  };
}
