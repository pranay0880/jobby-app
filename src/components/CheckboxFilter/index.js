import './index.css'

const CheckboxFilter = props => {
  const {eachListItem, onClickCheckbox} = props
  const {label, employmentTypeId} = eachListItem

  const checkboxClicked = () => {
    onClickCheckbox(employmentTypeId)
  }

  return (
    <ul className="checkboxContainer">
      <label htmlFor="checkbox" className="checkboxLabel">
        <input type="checkbox" id="checkbox" onClick={checkboxClicked} />
        {label}
      </label>
    </ul>
  )
}
export default CheckboxFilter
