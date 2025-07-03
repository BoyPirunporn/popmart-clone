import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

export const compatibility = () => unstableSetRender((node, container:(Element | DocumentFragment) & {_reactRoot?: ReturnType<typeof createRoot>}) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});