import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Brands from './Brands/Brands'
import Brand from './Brand/Brand'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Brands} />
        <Route exact path="/brands/:slug" component={Brand} />
      </Switch>
    </BrowserRouter>
  )
}

export default App