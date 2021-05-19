import React, { useCallback, useState, useEffect } from "react"

import Button from "@atlaskit/button/standard-button"
import { Field } from "@atlaskit/form"
import Textfield from "@atlaskit/textfield"

import Modal, {
  ContainerComponentProps,
  ModalTransition,
} from "@atlaskit/modal-dialog"

export default function EditAndRemoveMenuModal(props) {
  const { data } = props
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    console.log(data)
    setIsOpen(data.isShow)
  }, [data])

  const closeAfterEdit = (nameData) => {
    setIsOpen(false)

    const callbackObj = {
      action: "edit",
      data: nameData,
      item: data.item.id,
    }
    props.callback(callbackObj)
  }

  const close = () => {
    setIsOpen(false)
  }

  const deleteItem = () => {
    setIsOpen(false)

    const callbackObj = {
      action: "remove",
      item: data.item.id,
    }
    props.callback(callbackObj)
  }

  const open = () => setIsOpen(true)

  const CustomContainer = useCallback(
    (props: ContainerComponentProps) => {
      return (
        <form
          {...props}
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.target as HTMLFormElement)
            const obj: any = {}
            data.forEach((val, key) => {
              obj[key] = val
            })
            setName(obj.name)
            closeAfterEdit(obj.name)
          }}
        >
          {props.children}
        </form>
      )
    },
    [data]
  )

  return (
    <>
      <ModalTransition>
        {isOpen && (
          <Modal
            actions={[
              { text: "Edit", type: "submit" },
              { text: "Delete", onClick: deleteItem },
              { text: "Cancel", onClick: close },
            ]}
            components={{
              Container: (props) => CustomContainer(props),
            }}
            onClose={close}
            heading="Create a user"
          >
            <Field id="name" name="name" label="Type your name to continue">
              {({ fieldProps }) => (
                <Textfield
                  {...fieldProps}
                  defaultValue={data.item.data.title}
                  value={undefined}
                />
              )}
            </Field>
          </Modal>
        )}
      </ModalTransition>
    </>
  )
}
