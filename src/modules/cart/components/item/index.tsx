"use client"

import { Text, clx, Button, IconButton, Tooltip } from "@medusajs/ui"
import { motion } from "framer-motion"
import { deleteLineItem, updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import { MinusMini, PlusMini } from "@medusajs/icons"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

const MotionDiv = motion.div
type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <MotionDiv
      layout
      initial={{ opacity: 1, height: 'auto' }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
      className="flex gap-x-4 w-full border-b border-gray-200 dark:border-gray-700 last:border-b-0"
      data-testid="product-row"
    >
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="py-2"
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          size="square"
          className="w-16 small:w-24"
        />
      </LocalizedClientLink>

      <div className="flex flex-col justify-between flex-1 py-2">
        <div className="flex flex-col">
          <LocalizedClientLink href={`/products/${item.product_handle}`}>
            <Text
              className="text-small-regular small:txt-medium-plus text-ui-fg-base truncate"
              data-testid="product-title"
            >
              {item.product_title}
            </Text>
          </LocalizedClientLink>
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
          <LineItemUnitPrice item={item} currencyCode={currencyCode} style="tight" />
        </div>
        
        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>

      <div className="flex flex-col items-end justify-end py-2">
        <div className="flex items-center mb-2">
          <div className="flex items-center border dark:border-gray-600 rounded-full overflow-hidden max-w-[100px]">
            <IconButton
              variant="transparent"
              onClick={() => {
                if (item.quantity - 1 < 1) {
                  setError(null);
                  setUpdating(true);
                  deleteLineItem(item.id)
                    .catch((err) => {
                      setError(err.message);
                    })
                    .finally(() => {
                      setUpdating(false);
                    });
                } else {
                  changeQuantity(item.quantity - 1);
                }
              }}
              disabled={updating}
              className="p-1 small:p-1 text-xs small:text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white disabled:text-gray-400 dark:disabled:text-gray-500"
              data-testid="quantity-minus-button"
            >
              <MinusMini className="w-3 h-3 small:w-4 small:h-4" />
            </IconButton>
            <span className="px-1 small:px-2 text-center text-xs small:text-sm min-w-[20px] small:min-w-[30px]">
              {updating ? <Spinner size={14} className="small:size-[16px]" /> : item.quantity}
            </span>
            <IconButton
              variant="transparent"
              onClick={() => changeQuantity(item.quantity + 1)}
              disabled={updating || item.quantity >= maxQuantity}
              className="p-1 small:p-1 text-xs small:text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white disabled:text-gray-400 dark:disabled:text-gray-500"
              data-testid="quantity-plus-button"
            >
              <PlusMini className="w-3 h-3 small:w-4 small:h-4" />
            </IconButton>
          </div>
        </div>
        
        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
          className="text-md"
        />
      </div>
    </MotionDiv>
  )
}

export default Item
