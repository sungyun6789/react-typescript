import { createAsyncAction } from 'typesafe-actions';
import { GithubProfile } from '../../api/github';
import { AxiosError } from 'axios';

export const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

// export const getUserProfile = createAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createAction(GET_USER_PROFILE_SUCCESS)<GithubProfile>();
// export const getUserProfileError = createAction(GET_USER_PROFILE_ERROR)<AxiosError>();

// GET_USER_PROFILE 의 용도는 요청이 시작됐을 때 디스패치되는 액션이고,
// 나머지 두 개의 액션들은 성공 / 실패 헀을 때 디스패치되는 액션이다.

// 위에 액션과 아래 액션은 동일한 기능을 수행한다.

export const getUserProfileAsync = createAsyncAction(
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
)<string, GithubProfile, AxiosError>();
