import React, { ComponentType } from 'react';
import useMeasureElements from '../utils/measureElement';

const splitToColumns = ({
  children,
  heightLimit,
  widthLimit,
  Wrapper = React.Fragment,
}: {
  children: React.ReactNode;
  heightLimit: number;
  widthLimit: number;
  Wrapper?: ComponentType<{ children: React.ReactNode }>;
}): React.ReactNode[] => {
  const columns: React.ReactNode[] = [];
  const maxHeight = heightLimit;
  let currentHeight = 0;
  let currentColumn: React.ReactNode[] = [];

  const { measurements } = useMeasureElements(widthLimit, React.Children.map(children, (child) => child) as React.ReactNode[]);

  React.Children.forEach(children, (child, index) => {
    const { height } = measurements[`measure-${index}`] || { height: 0 };

    if (currentHeight + height <= maxHeight) {
      currentHeight += height;
      currentColumn.push(child);
    } else {
      columns.push(<Wrapper>{currentColumn}</Wrapper>);
      currentColumn = [child];
      currentHeight = height;
    }
  });

  columns.push(<Wrapper>{currentColumn}</Wrapper>);
  return columns;
};

export default splitToColumns;