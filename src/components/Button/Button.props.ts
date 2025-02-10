import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  children: ReactNode;
}

/*
Этот код на TypeScript определяет интерфейс ButtonProps для кнопочного компонента в React. Давайте рассмотрим его структуру:
ButtonProps расширяет DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, что означает, что он включает все стандартные атрибуты HTML-кнопки (ButtonHTMLAttributes) и применяет их к элементу HTMLButtonElement. Это позволяет использовать все стандартные атрибуты кнопки (такие как onClick, disabled, и т.д.) в компонентах с этим интерфейсом.
Свойство className?: string позволяет указать дополнительный CSS-класс для кнопки.
Свойство children: ReactNode задает содержимое кнопки, которое может быть любым React-узлом (текст, другие элементы и т.д.).
Этот интерфейс помогает типизировать свойства кнопки, делая её использование в компонентах более безопасным и удобным в TypeScript.
*/
