import { GoodsItem } from '../GoodsItem/GoodsItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function GoodList() {
  const goods = useSelector((state: RootState) => state.products.goods);

  if (!goods.length) {
    return <h3>Nothing here</h3>;
  }

  return (
    <div className="goods">
      {goods.map((item) => (
        <GoodsItem key={item.mainId} {...item} />
      ))}
    </div>
  );
}

export { GoodList };
