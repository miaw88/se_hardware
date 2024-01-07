import { create } from 'zustand'

export const useFilter = create((set) => ({
    startDate: new Date(),
    endDate: new Date(),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
}))