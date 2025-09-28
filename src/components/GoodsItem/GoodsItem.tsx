import { GoodsItemProps } from './GoodsItem.props';
import { handleAddToCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { AppDispatch } from '../../redux/store';

function GoodsItem({
  mainId,
  displayName,
  displayDescription,
  price,
  displayAssets,
}: GoodsItemProps) {
  const priceProduct = price.regularPrice;
  let imageGoods: string = '';
  if (displayAssets && displayAssets.length > 0) {
    imageGoods = displayAssets[0].full_background;
  } else {
    imageGoods = `${import.meta.env.BASE_URL}default-image.jpg`;
  }

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="card">
      <div className="card-image">
        <img alt={displayName} src={imageGoods} />
      </div>
      <div className="card-content">
        <span className="card-title">{displayName}</span>
        {displayDescription && <p>{displayDescription}</p>}
      </div>
      <div className="card-action">
        <Button
          className="btn"
          onClick={() =>
            dispatch(
              handleAddToCart({
                id: mainId,
                displayName,
                priceProduct,
              })
            )
          }
        >
          Купить
        </Button>
        <span className="right card__price">{priceProduct} грн.</span>
      </div>
    </div>
  );
}

export { GoodsItem };
