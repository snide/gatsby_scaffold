/** @jsx jsx */
import React, { FunctionComponent } from 'react';
import { ThemeProvider } from '@emotion/react';
import { jsx } from '@emotion/react';
import { StylesGlobal } from '../services/global_styling/reset/reset';
import { ThemeTokens } from './theme';
import { themeSelector } from './theme_selector';
import { Helmet } from 'react-helmet';

type themeProps = {
  children: React.ReactNode;
  tokens: ThemeTokens;
};

export const Theme: FunctionComponent<themeProps> = (props) => {
  const { children } = props;

  const [themeControls, themeTokens] = themeSelector();

  return (
    <ThemeProvider theme={themeTokens}>
      <StylesGlobal theme={themeTokens} />
      <Helmet>
        <link
          href={`https://fonts.googleapis.com/css?family=${themeTokens.fontFamily.replace(
            /\s/g,
            '+'
          )}:400,900&display=swap`}
          rel="stylesheet"
        />
      </Helmet>
      <h3>Theme selector</h3>
      <p>
        Colors selected here update local store and pass down to every page
        through context
      </p>
      {themeControls}

      <h3>Inner content using that theme context</h3>
      {children}
    </ThemeProvider>
  );
};
