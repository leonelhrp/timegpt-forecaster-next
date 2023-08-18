import { ForecastResult } from "@/types/forecast"
import { create } from "zustand"


interface State {
  result: ForecastResult | null
  isLoading: boolean
  error: any
}

interface Actions {
  fetchData: () => Promise<void>
  setResults: (result: State["result"]) => void
}

const INITIAL_STATE: State = {
  result: null,
  isLoading: false,
  error: null,
}

export const useForecastStore = create<State & Actions>(set => ({
  result: INITIAL_STATE.result,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  fetchData: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch("/api/generate")
      const data = await response.json()
      // set({ result: data, isLoading: false })
    } catch (error) {
      set({ error, isLoading: false })
    }
  },
  setResults: (result: State["result"]) => set({ result }),
}))