import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { GoodsItemProps } from '../../components/GoodsItem/GoodsItem.props';
import { API_KEY, API_URL } from '../../config';
import { RootState } from '../store';

// Тип для ответа API
export type GoodsResponse = {
  shop: GoodsItemProps[]; // Создаем тип для массива продуктов
};

const initialState = {
  goods: [] as GoodsItemProps[],
  loading: true,
  visibleCountProduct: 12,
};

export const fetchGoods = createAsyncThunk<
  GoodsResponse,
  void,
  { rejectValue: string }
>('products/fetchGoods', async (_, thunkAPI) => {
  try {
    const response = await axios.get<GoodsResponse>(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Ошибка загрузки товаров'
      );
    }
    return thunkAPI.rejectWithValue('Неизвестная ошибка');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    showMore: (state) => {
      state.visibleCountProduct += 12; // Увеличиваем количество отображаемых товаров
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.goods = action.payload.shop;
      state.loading = false;
    });
    builder.addCase(fetchGoods.rejected, (state, action) => {
      state.loading = false;
      console.error('Ошибка:', action.payload); // // Здесь `action.payload` будет `string | undefined
    });
    builder.addCase(fetchGoods.pending, (state) => {
      state.loading = true;
    });
  },
});
export const { showMore } = productsSlice.actions;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectVisibleCount = (state: RootState) =>
  state.products.visibleCountProduct;
export default productsSlice.reducer;

/*
  GoodsResponse,          // Тип успешного ответа
  void,                   // Тип аргументов (ничего не передается)
  { rejectValue: string } // Тип ошибки
*/

/*
  Поле rejectValue является частью третьего аргумента объекта конфигурации, который можно передать в createAsyncThunk из Redux Toolkit. 
  Оно позволяет указать тип значения, возвращаемого через thunkAPI.rejectWithValue. 
  Это сделано для того, чтобы TypeScript мог корректно типизировать action.payload в случае rejected.
*/

/*
  createAsyncThunk<ReturnedType, ArgumentType, ThunkAPIConfig>
*/

/*
  ReturnedType: тип данных, возвращаемых при успешном выполнении thunk.
  ArgumentType: тип данных, которые принимаются thunk.
  ThunkAPIConfig: объект конфигурации, включающий настройки для state, dispatch и rejectValue.
*/

/*
  Мы указали void в качестве второго параметра в createAsyncThunk для аргументов,
  потому что в данном случае мы не передаете никаких данных в fetchGoods при вызове.
*/
