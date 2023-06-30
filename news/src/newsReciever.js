import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  entities: [],
  loading: false,
}



export const fetchData = createAsyncThunk('data/fetch', async (customParam, { rejectWithValue }) => {
  const params = {
    "api-key": "9rzex4BHDoJS0LHjAaReItAKfGf126nd",
    "q": customParam,
    "sort": "newest"
  };

  const url = new URL("https://api.nytimes.com/svc/search/v2/articlesearch.json");
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error("Ошибка при выполнении запроса: " + response.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
});



export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});



export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer