import { GoodsItem } from '../GoodsItem/GoodsItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { showMore, selectVisibleCount } from '../../redux/slices/productsSlice';

// showMore - action

function GoodList() {
  const dispatch = useDispatch();
  const goods = useSelector((state: RootState) => state.products.goods);
  const visibleCountProduct = useSelector(selectVisibleCount); // 12
  console.log(goods.length);

  if (!goods.length) {
    return <h3>Nothing here</h3>;
  }

  return (
    <>
      <div className='card-total'>
        Total products:{' '}
        <span className='card-total__weight'>{goods.length}</span>
      </div>
      <div className='goods'>
        {goods.slice(0, visibleCountProduct).map((item) => (
          <GoodsItem key={item.mainId} {...item} />
        ))}
      </div>
      {visibleCountProduct < goods.length && (
        <button className='btn' onClick={() => dispatch(showMore())}>
          Load more
        </button>
      )}
    </>
  );
}

export { GoodList };

/*
Почему React не перерисовывает первые элементы?
  1) React использует "ключи" (key)
    - Каждый товар в goods имеет уникальный mainId, который передается как key.
    - При изменении visibleCountProduct React сравнивает старый и новый список. Если первые элементы не изменились, он их не перерисовывает, а просто добавляет новые.
  2) Как React обновляет DOM?
    - Было visibleCountProduct = 2:
      <GoodsItem key="1" name="Товар 1" />
      <GoodsItem key="2" name="Товар 2" />
    - Стало visibleCountProduct = 3:
      <GoodsItem key="1" name="Товар 1" />
      <GoodsItem key="2" name="Товар 2" />
      <GoodsItem key="3" name="Товар 3" />
    - React видит, что первые два элемента остались такими же → не трогает их.
    - Добавляет только третий товар.
  3) Когда товары будут перерисовываться?
    - Если изменится содержимое товара (goods обновится).
    - Если изменится сам порядок товаров (например, sort() или filter()).
    - Если key у элементов изменится (например, key={index} вместо mainId, что не рекомендуется).
*/
