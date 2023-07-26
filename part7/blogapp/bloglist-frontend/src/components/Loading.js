import Loader from '../loading.svg'

const Loading = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={Loader} alt="Loading Data" />
    </div>
  )
}

export default Loading
