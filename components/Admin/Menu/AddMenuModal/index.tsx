import React, {
  useCallback,
  useState,
  useEffect,
  useImperativeHandle,
} from "react"

import Button from "@atlaskit/button/standard-button"
import { Field } from "@atlaskit/form"
import Textfield from "@atlaskit/textfield"

import Modal, {
  ContainerComponentProps,
  ModalTransition,
} from "@atlaskit/modal-dialog"

const AddMenuModal = React.forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {}, [name])

  useImperativeHandle(ref, () => ({
    open: () => open(),
    setName: (item) => {
      setName(item.data.title)
    },
  }))

  const closeAfterAdd = (nameData) => {
    setIsOpen(false)
    props.callback(nameData)
  }

  const close = () => {
    setIsOpen(false)
  }

  const open = () => setIsOpen(true)

  const CustomContainer = useCallback((props: ContainerComponentProps) => {
    return (
      <form
        {...props}
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.target as HTMLFormEleme98nt)
          const obj: any = {}
          data.forEach((val, key) => {
            obj[key] = val
          })

          setName(obj.name)
          closeAfterAdd(obj.name)
        }}
      >
        {props.children}
      </form>
    )
  }, [])

  return (
    <>
      <Button appearance="primary" onClick={open}>
        Add Menu
      </Button>

      <ModalTransition>
        {isOpen && (
          <Modal
            actions={[
              { text: "Create", type: "submit" },
              { text: "Cancel", onClick: close },
            ]}
            components={{
              Container: CustomContainer,
            }}
            onClose={close}
            heading="Create a user"
          >
            <Field id="name" name="name" label="Type your name to continue">
              {({ fieldProps }) => (
                <Textfield
                  {...fieldProps}
                  defaultValue={name ? name : "Atlassy"}
                  value={undefined}
                />
              )}
            </Field>
          </Modal>
        )}
      </ModalTransition>
    </>
  )
})

export default AddMenuModal
