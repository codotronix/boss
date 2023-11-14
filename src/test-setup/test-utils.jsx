import React from 'react'
import {render} from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
// import {ThemeProvider} from 'my-ui-lib'
// import {TranslationProvider} from 'my-i18n-lib'
// import defaultStrings from 'i18n/en-x-default'

export const AllTheProviders = ({children}) => {
  return (
    // <ThemeProvider theme="light">
    //   <TranslationProvider messages={defaultStrings}>
    //     {children}
    //   </TranslationProvider>
    // </ThemeProvider>
    <Provider store={store}>
        {children}
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}