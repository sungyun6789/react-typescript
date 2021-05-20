import { ActionType } from 'typesafe-actions';
import { increase, decrease, increaseBy } from './actions';

const actions = { increase, decrease, increaseBy };

export type CounterState = {
  count: number;
};
export type CounterAction = ActionType<typeof actions>;
