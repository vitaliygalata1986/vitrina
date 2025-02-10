import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Интерфейс входящих данных (без quantity)
export interface IProduct {
  id: string;
  displayName: string;
  priceProduct: number;
}

// Интерфейс элемента корзины (с quantity)
export interface ICartItem extends IProduct {
  quantity: number;
}

export interface ICartState {
  order: ICartItem[];
  isBasketShow: boolean;
  displayName: string;
}

const initialState: ICartState = {
  isBasketShow: false,
  order: [],
  displayName: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    handleBasketShow(state) {
      state.isBasketShow = !state.isBasketShow;
    },
    handleAddToCart(state, action: PayloadAction<IProduct>) {
      const itemIndex = state.order.findIndex(
        (orderItem) => orderItem.id === action.payload.id
      );
      const newOrder =
        itemIndex < 0
          ? [...state.order, { ...action.payload, quantity: 1 }]
          : state.order.map((orderItem, index) =>
              index === itemIndex
                ? { ...orderItem, quantity: orderItem.quantity + 1 }
                : orderItem
            );

      state.order = newOrder;
      state.displayName = action.payload.displayName;
    },
    handleCloseAlert(state) {
      state.displayName = '';
    },
    handleDeleteItemFromCart(state, action: PayloadAction<string>) {
      state.order = state.order.filter(
        (orderItem) => orderItem.id !== action.payload
      );
    },
    handleDecQuantity(state, action: PayloadAction<string>) {
      state.order = state.order.map((orderItem) =>
        orderItem.id === action.payload
          ? { ...orderItem, quantity: Math.max(orderItem.quantity - 1, 0) } // Math.max для гарантированного ограничения количества товара на 0.
          : orderItem
      );
    },
    handleIncQuantity(state, action: PayloadAction<string>) {
      state.order = state.order.map((orderItem) =>
        orderItem.id === action.payload
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    },
  },
});

export const {
  handleBasketShow,
  handleAddToCart,
  handleCloseAlert,
  handleDeleteItemFromCart,
  handleDecQuantity,
  handleIncQuantity,
} = cartSlice.actions;

export const selectIsBasketShow = (state: RootState) => state.cart.isBasketShow;
export const selectDisplayName = (state: RootState) => state.cart.displayName;
export const selectOrder = (state: RootState) => state.cart.order;

export default cartSlice.reducer;

/*
  Math.max(orderItem.quantity - 1, 0):
    Функция Math.max принимает два значения и возвращает наибольшее из них.
    В данном случае, она сравнивает результат выражения orderItem.quantity - 1 (уменьшенное количество) и число 0.
    Если уменьшенное количество товара будет больше или равно 0, то Math.max вернет это уменьшенное количество.
    Если уменьшенное количество окажется меньше 0 (например, если текущее количество товара равно 0, 
    и вы пытаетесь уменьшить его на 1), 
    то Math.max вернет 0, чтобы избежать отрицательных значений для количества товара.
*/

/*
  Предположим, что товар с quantity = 3:
  Math.max(3 - 1, 0):
  Это вычисляется как Math.max(2, 0), и результатом будет 2.
  Теперь, если количество товара равно 0 и мы пытаемся уменьшить его:
  Math.max(0 - 1, 0):
  Это вычисляется как Math.max(-1, 0), и результатом будет 0, что предотвращает отрицательное количество.
*/
