import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useEditorStore = create(
  devtools((set) => ({
    editor: null,
    setEditor: (editor) => set({ editor }),
  }))
);
