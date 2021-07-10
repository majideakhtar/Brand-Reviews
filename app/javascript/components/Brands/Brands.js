import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Brand from './Brand'

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`
const Header = styled.div`
  padding: 100px 100px 10px 100px;
  h1 {
    font-size: 42px;
  }
`
const Subheader = styled.div`
  font-weight: 300;
  font-size:  26px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
`



const Brands = () => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    //Get all the brands from the API
    axios.get('/api/v1/brands.json')
      .then(resp => setBrands(resp.data.data))
      .catch(resp => console.error(resp))
    //Update Brands in our state
  }, [brands.length])
  const grid = brands.map(item => {
    return (
      <Brand
        key={item.attributes.name}
        attributes={item.attributes}
      />
    )
  })
  return (
    // <Fragment>
    <Home>
      <Header>
        <h1>Brand Information</h1>
        <Subheader>
          Honest, Unbiased Brand Reviews
        </Subheader>
      </Header>
      <Grid>
        {grid}
      </Grid>
    </Home>
    /* </Fragment> */
  )
}

export default Brands