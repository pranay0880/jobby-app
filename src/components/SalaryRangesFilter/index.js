import './index.css'

const SalaryRangesFilter = props => {
  const {eachListItem, onchangeRadio} = props
  const {salaryRangeId, label} = eachListItem
  const onChangeRadio = () => {
    onchangeRadio(salaryRangeId)
  }
  return (
    <div>
      <label className="label1">
        <input
          type="radio"
          value={salaryRangeId}
          name="salary"
          onChange={onChangeRadio}
        />
        {label}
      </label>
    </div>
  )
}
export default SalaryRangesFilter
