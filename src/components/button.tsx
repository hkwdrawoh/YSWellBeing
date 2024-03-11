import { useState } from "react"

export default function Button(props: {
  text: string
  classname: string
  disabled: boolean
  onClick?: () => void
  loading?: true
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          props.onClick?.()
          setHovered(false)
        }}
        className={
          "w-full block mb-4 py-2 px-4 rounded text-text text-md h-10 font-semibold box-border hover-button " +
          props.classname
        }
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </>
  )
}
