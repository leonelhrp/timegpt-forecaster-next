import { ForecastResult, FormState } from "@/types/forecast"
import { create } from "zustand"

interface State {
  form: FormState
  result: ForecastResult | null
}

interface Actions {
  sendFormData: () => Promise<void>
  setResults: (result: State["result"]) => void
  setPropertyForm: (
    { key, value }: { key: keyof FormState, value: any }
  ) => void
}

const INITIAL_STATE_FORM: FormState = {
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
  timeSeriesFile: null,
}

const INITIAL_STATE: State = {
  form: INITIAL_STATE_FORM,
  result: null,
}

export const useForecastStore = create<State & Actions>((set, get) => ({
  form: INITIAL_STATE.form,
  result: INITIAL_STATE.result,
  sendFormData: async () => {
    try {
      set({ form: { ...get().form, isSubmitting: true, loading: true } })

      const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: get().form.apiKey,
      };

      const response = await fetch("/api/generate", {
        method: 'POST',
        headers,
        body: JSON.stringify(get().form),
      });
      console.log("sendFormData -> response: ", response);

      const data = await response.json()

      console.log("sendFormData -> data: ", data);
      set({ result: data })
    } catch (error) {
      console.error("sendFormData -> error: ", error);
    } finally {
      set({ form: { ...get().form, loading: false } })
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