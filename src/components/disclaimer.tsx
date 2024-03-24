import React from "react"
import Image from "next/image"

export const magicBellHandle = "magicbell_io"

export default function Disclaimer() {
  return (
    <section className="flex flex-col items-center justify-center gap-1 pb-6">
      <a
        className="flexgap-2 flex-col"
        href="https://youseidotcm.jimdofree.com"
        target="_blank"
      >
        <Image
          height={20}
          width={250}
          src="/plaque.jpg"
          alt="Youseido"
        ></Image>
      </a>
        <span className="text-muted text-xs">Youseido Chinese Medicine Co. Ltd.</span>
        <span className="text-muted text-xs">G/F, 2A Hoi Kwong Street, Quarry Bay, Hong Kong</span>
        <span className="text-muted text-xs">Tel︰852-23422362</span>
    </section>
  )
}
