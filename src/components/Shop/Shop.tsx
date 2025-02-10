import { useEffect } from 'react';
import { Preloader } from '../Preloader/Preloader';
import { GoodList } from '../GoodList/GoodList';
import { Cart } from '../Cart/Cart';
import { BasketList } from '../BasketList/BasketList';
import Alert from '../Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods, selectLoading } from '../../redux/slices/productsSlice';
import {
  selectIsBasketShow,
  selectDisplayName,
} from '../../redux/slices/cartSlice';
import { AppDispatch } from '../../redux/store';

function Shop() {
  const loading = useSelector(selectLoading); // типизированный засчет: export const selectLoading = (state: RootState) => state.products.loading;
  const isBasketShow = useSelector(selectIsBasketShow);
  const displayName = useSelector(selectDisplayName);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGoods());
  }, []);
  return (
    <main className="container content">
      <Cart />
      {loading ? <Preloader /> : <GoodList />}
      {isBasketShow && <BasketList />}
      {displayName && <Alert />}
    </main>
  );
}

export { Shop };
