"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button, clx } from "@medusajs/ui"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart } from "@medusajs/icons"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const [animateCartIcon, setAnimateCartIcon] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // Trigger animation when totalItems increases, but only if the dropdown is closed
  useEffect(() => {
    if (totalItems > itemRef.current && !cartDropdownOpen) {
      setAnimateCartIcon(true)
      setTimeout(() => setAnimateCartIcon(false), 600)
    }
    itemRef.current = totalItems
  }, [totalItems, cartDropdownOpen])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base dark:text-gray-100 dark:hover:text-gray-400"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <motion.div
              className="flex items-center gap-x-1"
              animate={
                animateCartIcon
                  ? {
                      scale: [1, 1.3, 1.3, 1.3, 1.3, 1.3, 1],
                      rotate: [0, 0, -10, 10, -10, 10, 0],
                    }
                  : { scale: 1, rotate: 0 }
              }
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                times: animateCartIcon
                  ? [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
                  : undefined,
              }}
            >
              <ShoppingCart />
              <span className="ml-1 transition-all duration-300 ease-in-out group-[.navbar-shrunk]:opacity-0 group-[.navbar-shrunk]:max-w-0 group-[.navbar-shrunk]:ml-0 overflow-hidden whitespace-nowrap md:block hidden">
                Cart
              </span>
              <span>({totalItems})</span>
            </motion.div>
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="rounded-b-lg shadow-xl hidden small:block absolute top-[calc(100%+1px)] left-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-large-semi">Cart</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                  <AnimatePresence>
                    {cartState.items
                      .sort((a, b) => {
                        return (a.created_at ?? "") > (b.created_at ?? "")
                          ? -1
                          : 1
                      })
                      .map((item) => (
                        <motion.div
                          layout
                          key={item.id}
                          className="grid grid-cols-[100px_1fr] gap-x-4"
                          data-testid="cart-item"
                          initial={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                        >
                          <LocalizedClientLink
                            href={`/products/${item.product_handle}`}
                            className="w-24"
                          >
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </LocalizedClientLink>
                          <div className="flex flex-col justify-between flex-1">
                            <div className="flex flex-col flex-1">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap w-[180px]">
                                <h3 className="text-base-regular overflow-hidden text-ellipsis">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Quantity: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <DeleteButton
                                  id={item.id}
                                  className="text-left"
                                  data-testid="cart-item-remove-button"
                                >
                                  Remove
                                </DeleteButton>
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-fg-base dark:text-gray-300 font-semibold">
                      Subtotal{" "}
                      <span className="font-normal">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-large-semi"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full dark:bg-white dark:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Go to cart
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center text-gray-900 dark:text-gray-300">
                  <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close} className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">Explore products</Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
