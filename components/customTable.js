const customTable = ({children, tableHeaders, headerStyle}) => {
  return (
        <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th
                    key={index}
                    scope="col"
                    className={`py-3.5 pl-4 pr-3 ${headerStyle} text-sm font-semibold text-white sm:pl-6 md:pl-0`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default customTable