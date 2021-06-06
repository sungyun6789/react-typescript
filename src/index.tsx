import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './middleware/modules';
import createSagaMiddleware from 'redux-saga';
import EditableTable from './antd/Editable';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <EditableTable />
  </Provider>,
  document.getElementById('root'),
);
