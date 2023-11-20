import { create } from 'zustand'

interface State {
    isFile: boolean
}

type Action = {
    setisFile: () => void
    setFile: (item:boolean) => void
}

export const useStore = create<State & Action>()(
    (set) => ({
        isFile: true,
        setisFile: () => set((state) => ({ isFile: !state.isFile })),
        setFile: (item) => set(() => ({ isFile: item })),
    }))