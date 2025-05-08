import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { AnimatePresence } from "framer-motion"
import { Heading } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center dark:text-white">
        <Heading className="text-[2rem] leading-[2.75rem]">Cart</Heading>
      </div>
      <div className="flex flex-col gap-y-3 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <AnimatePresence>
          {items
            ? (items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              }))
            : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ItemsTemplate
