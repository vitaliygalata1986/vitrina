import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ProductsUiState = {
  visibleCountProduct: number;
};

const initialState: ProductsUiState = {
  visibleCountProduct: 12,
};

const productsUiSlice = createSlice({
  name: 'productsUi',
  initialState,
  reducers: {
    showMore: (state) => {
      state.visibleCountProduct += 12;
    },
    resetVisible: (state) => {
      state.visibleCountProduct = 12;
    },
  },
});

export const { showMore, resetVisible } = productsUiSlice.actions;
export const selectVisibleCount = (state: RootState) =>
  state.productsUi.visibleCountProduct;

export default productsUiSlice.reducer;
