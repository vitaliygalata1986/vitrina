import { GoodsItem } from '../GoodsItem/GoodsItem';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../services/products';
import { Preloader } from '../Preloader/Preloader';
import {
  selectVisibleCount,
  showMore,
  resetVisible,
} from '../../redux/slices/productsUiSlice';

function GoodList() {
  const visibleCountProduct = useSelector(selectVisibleCount);
  const dispatch = useDispatch();

  const { data: goods = [], isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <Preloader />;
  if (isError) return <div>Error loading products</div>;
  if (!goods.length) {
    return <h3>Nothing here</h3>;
  }

  return (
    <>
      <div className="card-total">
        Total products:{' '}
        <span className="card-total__weight">{goods.length}</span>
      </div>
      <div className="goods">
        {goods.slice(0, visibleCountProduct).map((item) => (
          <GoodsItem key={item.mainId} {...item} />
        ))}
      </div>
      {visibleCountProduct < goods.length ? (
        <button className="btn" onClick={() => dispatch(showMore())}>
          Load more
        </button>
      ) : (
        <div className="card-reset">
          <strong>All products loaded</strong>
          <button className="btn" onClick={() => dispatch(resetVisible())}>
            Reset
          </button>
        </div>
      )}
    </>
  );
}

export { GoodList };
