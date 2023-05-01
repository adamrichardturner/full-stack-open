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
  }

  render(<Blog blog={testBlog} />)

  const title = screen.getByText('Chips are for frying')
  const author = screen.getByText('James Bond')

  expect(title).toBeDefined()
  expect(author).toBeDefined()

  const url = screen.queryByText('www.doglistener.co.uk')
  expect(url).not.toBeInTheDocument()

  const likes = screen.queryByText('15')
  expect(likes).not.toBeInTheDocument()
})
