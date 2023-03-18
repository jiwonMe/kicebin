import React, { useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

const MeasureComponent = ({ children, widthLimit, onMeasure }: { children: React.ReactNode; widthLimit: number, onMeasure: ({
  height, width,
}: {
  height: number;
  width: number;
}) => void }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    console.log('boom');
    if (ref.current) {
      onMeasure({
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth,
      });
    }
  }, [ref]);

  return <div
    ref={ref}
    style={{
      width: widthLimit > 0 ? `${widthLimit}px` : 'auto',
    }}
  >{children}</div>;
};

const useMeasureElement = (widthLimit = -1, element: React.ReactNode) => {
  const [height, setHeight] = React.useState(-1);
  const [width, setWidth] = React.useState(-1);

  const measure = ({
    height, width,
  }: {
    height: number;
    width: number;
  }) => {
    setHeight(height);
    setWidth(width);

    console.log(height, width);
  };

  useEffect(() => {
    const tempRoot = document.createElement('div');
    document.body.appendChild(tempRoot);
    const root = createRoot(tempRoot);
    root.render(
      <MeasureComponent
        onMeasure={measure}
        widthLimit={widthLimit}
      >
        {element}
      </MeasureComponent>
    );
    // root.unmount();
    setTimeout(() => {
      root.unmount();
      document.body.removeChild(tempRoot);
    }, 1000);
    // tempRoot.style.display = 'none';
  }, [element]);

  return { height, width };
};

export default useMeasureElement;