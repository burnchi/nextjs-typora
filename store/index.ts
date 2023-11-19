import { create } from 'zustand'

interface State {
    isFile: boolean
}

type Action = {
    setisFile: () => void
}

export const useStore = create<State & Action>()(
    (set) => ({
        isFile: true,
        setisFile: () => set((state) => ({ isFile: !state.isFile }))
    }))