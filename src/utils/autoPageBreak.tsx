import React, { ReactNode } from 'react';

const calculateHeight = (node: HTMLElement) => {
  const { height, marginBottom, marginTop } = window.getComputedStyle(node);
  const nodeHeight = parseFloat(height);
  const nodeMarginBottom = parseFloat(marginBottom);
  const nodeMarginTop = parseFloat(marginTop);
  return nodeHeight + nodeMarginBottom + nodeMarginTop;
};

const autoPageBreak = ({ children, height }: { children: ReactNode; height: number }) => {
  const resultNodes: ReactNode[] = [];

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.getBoundingClientRect().height);
    }
  }, [children]);

  React.useEffect(() => {
    if (containerHeight > height) {
      let currentPage: ReactNode[] = [];
      let currentPageHeight = 0;

      React.Children.forEach(children, (child) => {
        if (!child) return;
        const childNode = document.createElement('div');
        childNode.appendChild(document.createTextNode(child.toString()));
        document.body.appendChild(childNode);

        const childHeight = calculateHeight(childNode);
        document.body.removeChild(childNode);

        if (currentPageHeight + childHeight > height) {
          resultNodes.push(currentPage);
          currentPage = [child];
          currentPageHeight = childHeight;
        } else {
          currentPage.push(child);
          currentPageHeight += childHeight;
        }
      });

      resultNodes.push(currentPage);
    } else {
      resultNodes.push(children);
    }
  }, [children, containerHeight, height]);

  return (
    <div ref={containerRef}>
      {resultNodes.map((page, index) => (
        <div key={index} style={{ pageBreakAfter: 'always' }}>
          {page}
        </div>
      ))}
    </div>
  );
};

export default autoPageBreak;
