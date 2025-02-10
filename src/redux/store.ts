import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

/*
  1) store.getState — это метод, предоставляемый Redux-хранилищем. Он возвращает текущее состояние всего Redux-стора.
  2) ReturnType<T> — это утилита из TypeScript, которая выводит тип возвращаемого значения функции T. 
  В данном случае: ReturnType<typeof store.getState> - автоматически извлекает тип возвращаемого значения метода store.getState, 
  то есть тип всего состояния Redux-стора.
  3) Почему это полезно?
  Вместо ручного определения структуры состояния Redux, TypeScript сам "подсматривает", какой именно тип возвращает store.getState, и создает из него тип RootState. 
  Это гарантирует, что типы всегда остаются синхронизированными с реальной структурой состояния.
*/

/*
  RootState обычно используется в таких местах:

   1) В селекторах: Типизация состояния Redux помогает при использовании useSelector:
   const goods = useSelector((state: RootState) => state.products.goods);
   2) При создании селекторов:
   export const selectAllGoods = (state: RootState) => state.products.goods;

*/
