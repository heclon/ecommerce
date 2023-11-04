import React, { ReactElement } from 'react'
import { FormikFieldArray } from './FormikFieldArray'
import { Formik, Form } from 'formik'
import { TeamTab } from './TeamTab'
export default {
  title: 'Components/Formik/FormikFieldArray',
  component: FormikFieldArray,
}

interface Item {
  name: string
  position: string
  about: string
}
interface FormikFieldArrayProps {
  name: string
  item: Item
  index: number
}

const exampleProps = {
  name: 'team',
  addItemTitle: 'Add Team Member',
  addItemSubtitle: "Showcase your team members' experiences.",
  addItemButtonText: 'Add Team Member',
  removeItemButtonText: 'Remove',
  withRemoveItemButtonIcon: true,
  disabled: false,
  errors: {},
}
const PLACEHOLDER = 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
const initialValues = {
  team: [
    {
      image: PLACEHOLDER,
      name: 'Anéeka',
      position: 'Head of analytics',
      about: '',
    },
    {
      image: PLACEHOLDER,
      name: 'Athena Swaruu',
      position: '',
      about: '',
    },
    {
      image: PLACEHOLDER,
      name: 'Minerva',
      position: 'Staff',
      about: '',
    },
  ],
}

export const Secondary = (): ReactElement => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {({ values }) => (
        <Form>
          <FormikFieldArray values={values} {...exampleProps}>
            {({ item, index, name }: FormikFieldArrayProps): React.ReactNode => (
              <TeamTab item={item} index={index} name={name} />
            )}
          </FormikFieldArray>
          {<pre className="mt-12">{JSON.stringify(values, null, 2)}</pre>}
        </Form>
      )}
    </Formik>
  )
}
