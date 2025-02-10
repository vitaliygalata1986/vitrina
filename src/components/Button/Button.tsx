import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
