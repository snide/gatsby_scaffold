/** @jsx jsx */
import { FunctionComponent, ReactNode, MouseEvent } from 'react';
import { css, jsx, withTheme } from '@emotion/react';
import { ThemeTokens } from '../../theme/theme';
import { readableColor, shade, tint } from 'polished';

export type ButtonColors = 'primary' | 'secondary' | 'accent';

type ButtonProps = {
  color: ButtonColors;
  fill?: boolean;
  text: ReactNode;
  disabled?: boolean;
  onClick: (e: MouseEvent) => void;
  theme: ThemeTokens;
};

const _Button: FunctionComponent<ButtonProps> = ({
  color,
  fill = false,
  disabled,
  text,
  theme,
  onClick,
}) => {
  const colorToTheme: { [color in ButtonColors]: string } = {
    primary: theme.color.primary,
    secondary: theme.color.secondary,
    accent: theme.color.accent,
  };

  let buttonBackgroundColor = colorToTheme[color];
  if (!fill) {
    buttonBackgroundColor =
      theme.mode === 'dark'
        ? shade(0.8, buttonBackgroundColor)
        : tint(0.8, buttonBackgroundColor);
  }

  const buttonTextColor = readableColor(buttonBackgroundColor);

  const styleButton = css`
    font-family: ${theme.font.family.regular};
    font-size: ${theme.size.base}px;
    display: inline-block;
    border-radius: ${theme.border.radius}px;
    background-color: ${buttonBackgroundColor};
    cursor: ${disabled ? 'default' : 'pointer'};
    color: ${buttonTextColor};
    display: inline-block;
    appearance: none;
    height: ${theme.size.xl}px;
    line-height: ${theme.size.xl}px;
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    max-width: 100%;
    vertical-align: middle;
    padding: 0 ${theme.size.base}px;
  `;

  return (
    <button css={styleButton} onClick={onClick}>
      {text}
    </button>
  );
};

export const Button = withTheme(_Button);
