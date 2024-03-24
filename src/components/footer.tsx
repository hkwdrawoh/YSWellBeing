import useDeviceInfo from "@/hooks/useDeviceInfo"
import React, { useState } from "react"
import Info from "./info"
import * as Collapsible from "@radix-ui/react-collapsible"
import Image from "next/image"

export default function Footer(props: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const info = useDeviceInfo()

  return (
    <footer className="flex-shrink-0 w-full fixed bottom-0 border-primary border-opacity-50 border-t-2">
      <Collapsible.Root
        className="h-full"
        open={props.open}
        onOpenChange={props.setOpen}
      >
        <Collapsible.Trigger asChild>
          <div
            className="bg-primary h-10 flex justify-center px-2 cursor-pointer icon-hoverable"
            title="Toggle device details"
          >
            <div className="flex items-center justify-center gap-x-4 text-text1 font-light text-xs">
              <span>Toggle device information</span>
            </div>
          </div>
        </Collapsible.Trigger>
        <Collapsible.Content>
          {info && <Info info={info} />}
        </Collapsible.Content>
      </Collapsible.Root>
    </footer>
  )
}
