import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not likes and url by default', () => {
  const testBlog = {
    title: 'Chips are for frying',
    author: 'James Bond',
    url: 'www.doglistener.co.uk',
    likes: 15,
    user: {
      id: '64397c0f28cff7eeed4a2758',
      name: 'Adam R Turner',
      username: 'aturner'
    }
  }

  const testUser = {
    id: '64397c0f28cff7eeed4a2758',
    name: 'Adam R Turner',
    username: 'aturner'
  }

  const { container } = render(<Blog blog={testBlog} user={testUser}/>)

  const blogComponent = container.querySelector('.blog')
  expect(blogComponent).toHaveTextContent(
    'Chips are for frying'
  )
  expect(blogComponent).toHaveTextContent(
    'James Bond'
  )
  const blogExtraDetails = container.querySelector('.blog-extra-details')

  expect(blogExtraDetails).toHaveStyle('display: none;')
})
