import React from 'react'
import { Select } from '@sanity/ui'
import { FormField } from '@sanity/base/components'
import { useFormValue, set, unset } from 'sanity'

const DynamicSelect = React.forwardRef((props, ref) => {
  const { onChange, type, value } = props
  const { title, description, options } = type
  const document = useFormValue([])

  let dynamicOptions = []

  // are we joining from a subfield?
  if (options.joinWith) {
    // bail if we can't find the from field
    if (!(options.from in document)) return null

    dynamicOptions = document[options.from]
      .map((opt) => {
        // bail if we can't find the subfield
        if (!(options.joinWith in opt)) return null

        // if a subfield is a complex array
        if (options.joinWithData) {
          return opt[options.joinWith].map((jOpt) => {
            return {
              title: `${opt[options.fromData.title]} - ${
                jOpt[options.joinWithData.title]
              }`,
              value: `${opt[options.fromData.title]}:${
                jOpt[options.joinWithData.value]
              }`,
            }
          })
        } else {
          return opt[options.joinWith].map((val) => {
            return {
              title: `${opt[options.fromData.title]} - ${val}`,
              value: `${opt[options.fromData.title]}:${val}`,
            }
          })
        }
      })
      .flat(1)
      .filter((x) => x !== null)

    // Map basic field array data
  } else {
    // bail if we can't find the from field
    if (!(options.from in document)) return null

    // map over the field to build our list of options
    dynamicOptions = document[options.from].map((opt) => ({
      title: opt[options.fromData.title].toString(),
      value: opt[options.fromData.value].toString(),
    }))
  }

  // Let's make sure we include existing "list" values
  const selectOptions = [
    ...(options.list ? options.list : [{}]),
    ...dynamicOptions,
  ]

  // find our currently active value
  const currentItem = selectOptions.find((opt) => opt.value === value)

  // Save the new value on change
  const handleCustomFieldChange = (option) => {
    onChange(option.value ? set(option.value.toString()) : unset())
  }

  return (
    <FormField
      title={title}
      description={description}
    >
      <Select
        ref={ref}
        options={selectOptions}
        onChange={handleCustomFieldChange}
        value={currentItem?.value}
      />
    </FormField>
  )
})

export default DynamicSelect