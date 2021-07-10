import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Header from './Header'
import ReviewForm from './ReviewForm'
import Review from './Review'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow:scroll;

  &:last-child {
    background: #000;
  }
`
const Main = styled.div`
  padding-left: 50px;
`


const Brand = (props) => {
  const [brand, setBrand] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const slug = props.match.params.slug
    const url = `/api/v1/brands/${slug}`
    //api/v1/brands/united-airlines
    axios.get(url)
      .then(resp => {
        setBrand(resp.data)
        setLoaded(true)
      })
      .catch(resp => console.error(resp))
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    setReview({ ...review, [e.target.name]: e.target.value })
    console.log('Review: ', review);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    const brand_id = brand.data.id
    axios.post('/api/v1/reviews', { review, brand_id })
      .then(resp => {
        const included = [...brand.included, resp.data.data]
        setBrand({ ...brand, included })
        setReview({ title: '', description: '', score: 0 })
      })
      .catch(resp => console.error(resp))
  }

  const setRating = (score, e) => {
    e.preventDefault();
    setReview({ ...review, score })
  }

  let reviews
  if (brand.included && loaded) {
    reviews = brand.included.map((item, index) => {
      return (
        <Review
          key={index}
          attributes={item.attributes}
        />
      )
    })
  }

  return (
    <Wrapper>
      {
        loaded &&
        <>
          <Column>
            <Main>
              <Header
                attributes={brand.data.attributes}
                reviews={brand.included}
              />

            </Main>
            {reviews}
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={brand.data.attributes}
              review={review}
            />
          </Column>
        </>
      }
    </Wrapper>
  )
}

export default Brand