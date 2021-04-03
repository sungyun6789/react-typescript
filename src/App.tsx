// import VirtualTable from './virtual-list/List';
import './App.css';
import ReactWindow from './virtual-list/React.Window';

// const columns = [
//   { title: 'A', dataIndex: 'key' },
//   { title: 'B', dataIndex: 'key' },
//   { title: 'C', dataIndex: 'key' },
//   { title: 'D', dataIndex: 'key' },
//   { title: 'E', dataIndex: 'key' },
//   { title: 'F', dataIndex: 'key' },
// ];

// const data = Array.from({ length: 100000 }, (_, key) => ({ key }));

function App() {
  return (
    <div style={{ border: '1px solid black', width: '1000px' }}>
      <ReactWindow />
    </div>
  );
}
export default App;
