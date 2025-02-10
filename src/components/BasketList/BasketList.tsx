import { BasketItem } from '../BasketItem/BasketItem';
import { useDispatch, useSelector } from 'react-redux';
import { handleBasketShow, selectOrder } from '../../redux/slices/cartSlice';
import { AppDispatch } from '../../redux/store';

function BasketList() {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector(selectOrder);

  const totalPrice:number = order.reduce((sum, item) => {
    return (sum += item.priceProduct * item.quantity);
  }, 0);

  return (
    <ul className="collection basket-list">
      <li className="collection-item active">Корзина</li>
      {order.length ? (
        order.map((item) => <BasketItem key={item.id} {...item} />)
      ) : (
        <li className="collection-item">Корзина пуста</li>
      )}

      <li className="collection-item active">
        Общая стоимость: {totalPrice} грн.
      </li>
      <li className="collection-item">
        <button className="btn btn-small">Оформить</button>
      </li>
      <i
        className="material-icons basket-close"
        onClick={() => dispatch(handleBasketShow())}
      >
        close
      </i>
    </ul>
  );
}

export { BasketList };
