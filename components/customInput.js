
const customInput = ({fieldName, fieldType, placeHolder, setVal, inputVal}) => (
    <div >
      <label htmlFor={fieldName} className="block text-sm font-medium text-white">
        {fieldName}
      </label>
      <div className="mt-1">
        <input
          type={fieldType}
          name={fieldName}
          id={fieldName}
          className="block w-full rounded-md border-gray-300 bg-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeHolder}
          onChange={(e) => setVal(e.target.value)}
          value={inputVal}
          step='any'
        />
      </div>
    </div>
)


export default customInput