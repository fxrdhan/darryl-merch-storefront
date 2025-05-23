"use client"

import { Container } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { motion, animate } from "framer-motion"
import { useEffect, useRef, useState, Fragment } from "react"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const profileCompletion = getProfileCompletion(customer)
  const nodeRef = useRef<HTMLSpanElement>(null)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const nodeRefMobile = useRef<HTMLSpanElement>(null)
  const [isAnimationCompleteMobile, setIsAnimationCompleteMobile] = useState(false)

  useEffect(() => {
    const node = nodeRef.current
    if (node) {
      const controls = animate(0, profileCompletion, {
        duration: 1,
        onUpdate(value) {
          node.textContent = Math.round(value).toString()
        },
        onComplete() {
          setIsAnimationComplete(true)
        },
      })
      return () => controls.stop()
    }
  }, [profileCompletion, nodeRef])

  useEffect(() => {
    const nodeMobile = nodeRefMobile.current
    if (nodeMobile) {
      const controlsMobile = animate(0, profileCompletion, {
        duration: 1,
        onUpdate(value) {
          nodeMobile.textContent = Math.round(value).toString()
        },
        onComplete() {
          setIsAnimationCompleteMobile(true)
        },
      })
      return () => controlsMobile.stop()
    }
  }, [profileCompletion, nodeRefMobile])

  return (
    <div data-testid="overview-page-wrapper">
      {/* Desktop View */}
      <div className="hidden small:block">
        <div className="text-xl-semi flex justify-between items-center mb-4">
          <span data-testid="welcome-message" data-value={customer?.first_name}>
            Hello {customer?.first_name}
          </span>
          <span className="text-small-regular text-ui-fg-base">
            Signed in as:{" "}
            <span
              className="font-semibold"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Profile</h3>
                <div className="flex items-end gap-x-2">
                  <motion.span
                    className="text-3xl-semi leading-none"
                    data-testid="customer-profile-completion"
                    data-value={profileCompletion}
                    ref={nodeRef}
                  >
                    {/* Initial value, will be updated by animation */}
                    0
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5, ease: "easeInOut" }}
                    className="text-3xl-semi leading-none"
                  >
                    %
                  </motion.span>
                  {isAnimationComplete && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="uppercase text-base-regular text-ui-fg-subtle"
                    >
                      Completed
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Addresses</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    Saved
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">Recent orders</h3>
              </div>
              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <Container className="bg-gray-50 flex justify-between items-center p-4 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1 dark:text-gray-200 dark:bg-gray-700">
                              <span className="font-semibold">Date placed</span>
                              <span className="font-semibold">
                                Order number
                              </span>
                              <span className="font-semibold">
                                Total amount
                              </span>
                              <span data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                Go to order #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </Container>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span data-testid="no-orders-message">No recent orders</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block small:hidden px-4 ml-4 md:px-8 py-4 ">
        {/* "Hello {customer?.first_name}" is rendered by AccountNav for mobile on root */}
        <div className="text-xs text-ui-fg-subtle dark:text-gray-400 mb-6">
          Signed in as:{" "}
          <span className="font-medium text-ui-fg-base dark:text-gray-300" data-testid="customer-email-mobile">
            {customer?.email}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 mb-6">
          <div className="flex flex-col">
            <h3 className="text-sm text-ui-fg-subtle dark:text-gray-400 mb-1">Profile</h3>
            <div className="flex items-baseline gap-x-1">
              <motion.span
                className="text-xl font-semibold leading-none text-ui-fg-base dark:text-white"
                data-testid="customer-profile-completion-mobile"
                ref={nodeRefMobile}
              >
                0
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.3, ease: "easeOut" }}
                className="text-xl font-semibold leading-none text-ui-fg-base dark:text-white"
              >
                %
              </motion.span>
              {isAnimationCompleteMobile && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="uppercase text-xs text-ui-fg-muted dark:text-gray-500"
                  >
                    Completed
                  </motion.span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm text-ui-fg-subtle dark:text-gray-400 mb-1">Addresses</h3>
            <div className="flex items-baseline gap-x-1">
              <span
                className="text-xl font-semibold leading-none text-ui-fg-base dark:text-white"
                data-testid="addresses-count-mobile"
              >
                {customer?.addresses?.length || 0}
              </span>
              <span className="uppercase text-xs text-ui-fg-muted dark:text-gray-500">Saved</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <h3 className="text-md font-medium text-ui-fg-base dark:text-white">Recent orders</h3>
          {orders && orders.length > 0 ? (
            <ul className="flex flex-col gap-y-3" data-testid="orders-wrapper-mobile">
              {orders.slice(0, 3).map((order) => (
                <li key={order.id} data-testid="order-wrapper-mobile" data-value={order.id}>
                  <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
                    <Container className="bg-gray-50 dark:bg-gray-700 flex justify-between items-center p-3 rounded-md border border-gray-200 dark:border-gray-600">
                      <div className="flex flex-col text-xs dark:text-gray-300">
                        <div className="flex justify-between w-full">
                            <span className="font-medium">#{order.display_id}</span>
                            <span className="text-ui-fg-subtle dark:text-gray-400">
                            {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <span className="text-sm">
                          {convertToLocale({
                            amount: order.total,
                            currency_code: order.currency_code,
                          })}
                        </span>
                      </div>
                      <ChevronDown className="-rotate-90 w-4 h-4 text-ui-fg-subtle dark:text-gray-400" />
                    </Container>
                  </LocalizedClientLink>
                </li>
              ))}
              {orders.length > 3 && (
                  <li>
                    <LocalizedClientLink href="/account/orders" className="text-xs text-ui-fg-interactive hover:text-ui-fg-interactive-hover dark:text-blue-400 dark:hover:text-blue-300">
                        View all orders...
                    </LocalizedClientLink>
                  </li>
              )}
            </ul>
          ) : (
            <span className="text-xs text-ui-fg-subtle dark:text-gray-400" data-testid="no-orders-message-mobile">
              No recent orders
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
