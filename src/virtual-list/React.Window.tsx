import { FixedSizeGrid as Grid } from 'react-window';
import './styles.css';

const Row = ({ columnIndex, rowIndex, isScrolling, style }: any) => (
  <div style={style}>{isScrolling ? 'Scrolling' : `Item${rowIndex}, ${columnIndex}`}</div>
);

const ReactWindow = () => (
  <Grid
    height={800}
    width={1020}
    columnCount={10}
    columnWidth={100}
    rowCount={1000}
    rowHeight={35}
    useIsScrolling
  >
    {Row}
  </Grid>
);

export default ReactWindow;
