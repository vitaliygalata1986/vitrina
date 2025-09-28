import { GoodList } from '../GoodList/GoodList';
import { Cart } from '../Cart/Cart';
import { BasketList } from '../BasketList/BasketList';
import Alert from '../Alert/Alert';
import { useSelector } from 'react-redux';
import {
  selectIsBasketShow,
  selectDisplayName,
} from '../../redux/slices/cartSlice';

function Shop() {
  const isBasketShow = useSelector(selectIsBasketShow);
  const displayName = useSelector(selectDisplayName);

  return (
    <main className="container content">
      <Cart />
      <GoodList />
      {isBasketShow && <BasketList />}
      {displayName && <Alert />}
    </main>
  );
}

export { Shop };
