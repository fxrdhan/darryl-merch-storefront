"use client"

import { Text } from "@medusajs/ui"

import Medusa from "../../../common/icons/medusa"
import NextJs from "../../../common/icons/nextjs"
import Tailwind from "../../../common/icons/tailwind"
import ReactIcon from "../../../common/icons/react"
import TypeScript from "../../../common/icons/typescript"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus md:text-base items-center">
      Built with
      <a href="https://www.medusajs.com" target="_blank" rel="noreferrer">
        <Medusa fill="#9ca3af" className="fill-[#9ca3af]" />
      </a>
      <a href="https://nextjs.org" target="_blank" rel="noreferrer">
        <NextJs fill="#9ca3af" />
      </a>
      <a href="https://v3.tailwindcss.com" target="_blank" rel="noreferrer">
        <Tailwind fill="#9ca3af" />
      </a>
      <a href="https://reactjs.org" target="_blank" rel="noreferrer">
        <ReactIcon fill="#9ca3af" />
      </a>
      <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
        <TypeScript fill="#9ca3af" />
      </a>
    </Text>
  )
}

export default MedusaCTA
