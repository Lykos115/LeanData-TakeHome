import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const customDropDown = ({data, type, inputVal, setVal}) => {
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }
    // const [inputVal, setSelected] = useState('')

    const placeHolder = type === "people" ? 'Select Name' : 'Select Category'
    const displayText = type === "people" ? inputVal.FirstName + ' ' + inputVal.LastName : inputVal.category


    return (
        <Listbox value={inputVal} onChange={setVal}>
            {({ open }) => (
            <div>
                <Listbox.Label className="block text-sm font-medium text-white">{type === 'people' ? 'Name' : 'Category'}</Listbox.Label>
                <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-white bg-black py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                    <span className="block truncate">{inputVal ? displayText : placeHolder}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>

                <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {data.map((item) => (
                        <Listbox.Option
                        key={item.id}
                        className={({ active }) =>
                            classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                        }
                        value={item}
                        >
                        {({ inputVal, active }) => (
                            <>
                            <span className={classNames(inputVal ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {type === "people" ? item.FirstName + ' ' + item.LastName : item.category}
                            </span>

                            {inputVal ? (
                                <span
                                className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                                >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            ) : null}
                            </>
                        )}
                        </Listbox.Option>
                    ))}
                    </Listbox.Options>
                </Transition>
                </div>
            </div>
            )}
        </Listbox>
    )
}

export default customDropDown