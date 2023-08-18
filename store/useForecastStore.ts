import { ForecastResult, FormState } from "@/types/forecast"
import { create } from "zustand"

interface State {
  form: FormState
  result: ForecastResult | null
  isLoading: boolean
  error: any
}

interface Actions {
  fetchData: () => Promise<void>
  setResults: (result: State["result"]) => void
  setPropertyForm: (
    { key, value }: { key: keyof FormState, value: any }
  ) => void
}

const INITIAL_STATE_FORM: FormState = {
  haveExogenousData: null,
  frecuency: "B",
  horizon: 11,
  finetuneSteps: 0,
  predictionIntervals: 90,
  loading: false,
  isSubmitting: false,
  status: "",
  isSuccess: false,
  completed: false,
  defaultCalendarVar: false,
  countryHolidays: [],
  timeSeriesFile: null,
  exogenousFile: null
}

const INITIAL_STATE: State = {
  form: INITIAL_STATE_FORM,
  result: null,
  isLoading: false,
  error: null,
}

export const useForecastStore = create<State & Actions>(set => ({
  form: INITIAL_STATE.form,
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
  setPropertyForm: (
    { key, value }: { key: keyof FormState, value: any }
  ) => set(state => ({
    form: {
      ...state.form,
      [key]: value,
    }
  })),
}))