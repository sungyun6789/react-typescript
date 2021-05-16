import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { Table } from 'antd';

// 전체적인 틀, 컴포넌트 이름
export default function VirtualTable(props: Parameters<typeof Table>[0]) {
  // columns, scroll을 props로 받고 객체 구조분해 할당 사용
  const { columns, scroll } = props;
  // table의 가로 길이 측정
  const [tableWidth, setTableWidth] = useState(0);

  // columns의 개수를 세는건데 계속 늘어나는 게 아니니까 그냥 없어도 무방
  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  // columns의 width를 따로 설정해줬다면 거기에 맞춰서 늘어나게 설정
  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  // ref를 설정해줬는데 왜인지는 잘 모르겠음
  const gridRef = useRef<any>();
  // 여기도 무슨 코드인지 잘 모르겠음 없어도 잘 돌아감
  // const [connectObject] = useState<any>(() => {
  //   const obj = {};
  //   Object.defineProperty(obj, 'scrollLeft', {
  //     get: () => null,
  //     set: (scrollLeft: number) => {
  //       if (gridRef.current) {
  //         gridRef.current.scrollTo({ scrollLeft });
  //       }
  //     },
  //   });
  //   return obj;
  // });

  // 마찬가지로 ref를 사용해서 무슨 코드인지 모르겠으나 이름으로 유추해보면 리스트를 초기화 해주는 함수
  const resetVirtualGrid = () => {};

  //   gridRef.current.resetAfterIndices({
  //   columnIndex: 0,
  //   shouldForceUpdate: false,
  // });

  // tableWidth가 바뀔 때 마다 리스트 초기화
  useEffect(() => resetVirtualGrid, [tableWidth]);

  // 새로운 리스트 불러오기
  const renderVirtualList = (
    rawData: object[],
    // { rowIndex, ref, columnIndex, style, isScrolling }: any,
  ) => {
    // ref.current = connectObject;
    // const totalHeight = rawData.length * 54;

    const Row = ({ columnIndex, rowIndex, isScrolling, style }: any) => (
      <div style={style}>
        {isScrolling
          ? 'Loading...'
          : (rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
      </div>
    );

    /* 
    Grid 형식으로 리스트를 뽑을건데 
    columnCount는 column의 길이
    columnWidth는 모르겠다..
    + columnWidth는 얼마나 넓어질지에 대한 설정
    + ref는 연속적인 값의 변경인데 이전 값을 유지하기 위해 사용
    */
    return (
      <Grid
        ref={gridRef}
        columnCount={mergedColumns.length}
        columnWidth={275}
        height={scroll!.y as number}
        width={tableWidth + 5}
        rowCount={rawData.length}
        rowHeight={35}
        // onScroll={({ scrollLeft }: { scrollLeft: number }) => {
        //   onScroll({ scrollLeft });
        // }}
        useIsScrolling
      >
        {Row}
      </Grid>
    );
  };

  /* 
  ResizeOberver는 setTableWidth를 새로 설정해 주는데
  TableWidth를 왜 새로 측정해주는거지
  + 측정해 주지 않으면 테이블 정렬이 앞에서 부터 빈틈없이 붙어있게 된다
    TableWidth를 통해서 테이블이 일정 간격으로 벌어질 수 있게 설정
  + ResizeObserver는 설정한 요소의 크기 변화를 관찰하며 제어한다
  */
  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{}}
      />
    </ResizeObserver>
  );
  /* 
  Table은 실제 테이블을 그려주는 컴포넌트
  columns로 위에 column을 지정하고
  pagination을 쓸건지 안 쓸건지 설정
  component로 bod위에서 만든 renderVirtualList를 실행
  */
}
