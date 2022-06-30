import spinner from "../../assets/spinner.gif"
function Spinner({ place }) {
  return (
    <div className={place || `flex justify-center` }>
      <img src={spinner} alt="spinner" />
    </div>
  )
}
export default Spinner
