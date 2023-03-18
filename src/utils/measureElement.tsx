import React, { useEffect } from 'react';
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

const useMeasureElements = (widthLimit = -1, elements: React.ReactNode[]) => {
  const [measurements, setMeasurements] = React.useState<{ [key: string]: { height: number; width: number } }>({});

  const measure = ({
    height, width,
  }: {
    height: number;
    width: number;
  }, key: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: {
        height,
        width,
      },
    }));
  };

  useEffect(() => {
    const tempRoot = document.createElement('div');
    document.body.appendChild(tempRoot);
    const root = createRoot(tempRoot);

    const elementsWithKeys = React.Children.map(elements, (element, index) => {
      const key = `measure-${index}`;
      return <MeasureComponent
        onMeasure={(measurements) => measure(measurements, key)}
        widthLimit={widthLimit}
        key={key}
      >
        {element}
      </MeasureComponent>;
    });

    root.render(
      <React.Fragment>
        {elementsWithKeys}
      </React.Fragment>
    );

    queueMicrotask(() => {
      root.unmount();
      document.body.removeChild(tempRoot);
    });

  }, [elements]);

  return { measurements };
};

export default useMeasureElements;