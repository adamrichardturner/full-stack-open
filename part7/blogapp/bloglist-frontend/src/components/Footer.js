const Footer = () => {
  return (
    <footer
      style={{
        minHeight: 72,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <p>
        Blogz | Made by{' '}
        <a
          href="https://adamrichardturner.dev"
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#e79d19',
            cursor: 'pointer',
          }}
        >
          Adam Turner
        </a>
      </p>
    </footer>
  )
}

export default Footer
