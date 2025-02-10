import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDisplayName, handleCloseAlert } from '../../redux/slices/cartSlice';
import { AppDispatch } from '../../redux/store';

function Alert() {
  const dispatch = useDispatch<AppDispatch>();
  const displayName = useSelector(selectDisplayName);

  useEffect(() => {
    const timerId: ReturnType<typeof setTimeout> = setTimeout(
      () => dispatch(handleCloseAlert()),
      3000
    );
    return () => {
      clearTimeout(timerId);
    };
  }, [displayName]);

  return (
    <div id="toast-container">
      <div className="toast">{displayName} добавлен в корзину</div>
    </div>
  );
}

export default Alert;

/*
  timerId: Тип timerId, возвращаемого из setTimeout, может быть разным в зависимости от среды выполнения:
  В браузерах это number.
  В Node.js это объект типа NodeJS.Timeout.
  Чтобы поддерживать совместимость, можно использовать ReturnType<typeof setTimeout>: 
*/
