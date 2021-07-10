import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Rating from '../Rating/Rating'

import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff; 
  text-align: center; 
`
const BrandLogo = styled.div`
  width: 50px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 15px;
  img {
    height: 50px;
    width: 50px;
    border-radius: 10px 5px 10px 5px;
    border: 1px solid #efefef;
  }
`
const BrandName = styled.div`
  padding: 20px 0 10px 0;
`
const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height: 50px;

  a{
    color: #fff;
    background: #000;
    border-radius: 4px;
    padding: 10px 50px;
    border: 1px solid #000;
    width: 100%;
    text-decoration: none;
  }
`

const Brand = (props) => {
  return (
    <Card>
      <BrandLogo>
        <img src={props.attributes.image_url} alt={props.attributes.name} />
      </BrandLogo>
      <BrandName>{props.attributes.name}</BrandName>
      <Rating score={props.attributes.avg_score} />
      {/* <div className='brand-score'>{props.attributes.avg_score}</div> */}
      <LinkWrapper>
        <Link to={`/brands/${props.attributes.slug}`}>View Brand</Link>
      </LinkWrapper>
    </Card>
  )
}

export default Brand