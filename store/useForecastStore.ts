import { TimeGPTStoreActions, TimeGPTStoreFormState, TimeGPTStoreInitialState } from "@/types/store"
import { create } from "zustand"

const INITIAL_STATE_FORM: TimeGPTStoreFormState = {
  apiKey: "",
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
  timeSeriesData: {
    columns: [],
    data: [],
  }
}

const INITIAL_STATE: TimeGPTStoreInitialState = {
  form: INITIAL_STATE_FORM,
  result: {
    bodyData: [],
    resultData: [],
  }
}

export const useForecastStore = create<TimeGPTStoreInitialState & TimeGPTStoreActions>((set, get) => ({
  form: INITIAL_STATE.form,
  result: INITIAL_STATE.result,
  sendTimeGPTMultiSeriesForm: async () => {
    try {
      set({ form: { ...get().form, isSubmitting: true, loading: true } })

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: get().form.apiKey,
        },
        body: JSON.stringify(get().form)
      }

      const response = await fetch("/api/timegpt-multi-series", options);
      const data = await response.json()

      set({ result: data })
    } catch (error) {
      console.error("sendTimeGPTMultiSeriesForm -> error: ", error);
    } finally {
      set({ form: { ...get().form, loading: false } })
    }
  },
  setPropertyForm: (
    { key, value }: { key: keyof TimeGPTStoreFormState, value: any }
  ) => set(state => ({
    form: {
      ...state.form,
      [key]: value,
    }
  })),
}))