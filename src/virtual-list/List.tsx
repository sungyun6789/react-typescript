import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
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
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  // 마찬가지로 ref를 사용해서 무슨 코드인지 모르겠으나 이름으로 유추해보면 리스트를 초기화 해주는 함수
  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false,
    });
  };

  // tableWidth가 바뀔 때 마다 리스트 초기화
  useEffect(() => resetVirtualGrid, [tableWidth]);

  // 새로운 리스트 불러오기
  const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    /* Grid 형식으로 리스트를 뽑을건데 
    columnCount는 column의 길이
    columnWidth는 모르겠다..
    */
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  // ResizeOberver는 setTableWidth를 새로 설정해 주는데
  // TableWidth를 왜 새로 측정해주는거지
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
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
}
