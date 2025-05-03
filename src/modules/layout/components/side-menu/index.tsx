"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState, useRef } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  return (
    <div className="h-full" onMouseLeave={handleMouseLeave}>
      {/* Area hover tepi kiri layar */}
      <div
        className="fixed top-0 left-0 h-full w-5 z-40"
        onMouseEnter={handleMouseEnter}
        style={{ pointerEvents: "auto" }}
      />
      <div className="flex items-center h-full">
        <div
          className="relative h-full flex"
          onMouseEnter={handleMouseEnter}
        >
          <Popover className="h-full flex">
            <PopoverButton
              data-testid="nav-menu-button"
              className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
            >
              Menu
            </PopoverButton>
            <Transition
              show={isOpen}
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 transform -translate-x-full"
              enterTo="opacity-100 transform translate-x-0 backdrop-blur-2xl"
              leave="transition ease-in-out duration-300"
              leaveFrom="opacity-100 transform translate-x-0 backdrop-blur-2xl"
              leaveTo="opacity-0 transform -translate-x-full"
            >
              <PopoverPanel
                static
                className="flex flex-col fixed top-0 left-0 h-[calc(100vh-1rem)] w-4/5 max-w-xs sm:w-1/3 2xl:w-1/4 sm:min-w-min z-50 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl transition-all duration-300 ease-in-out"
              >
                <div
                  data-testid="nav-menu-popup"
                  className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6 transform transition-transform duration-300 ease-in-out"
                >
                  <div className="flex justify-end" id="xmark">
                    <button 
                      data-testid="close-menu-button" 
                      onClick={() => setIsOpen(false)}
                      className="transition-transform hover:rotate-90 duration-300"
                    >
                      <XMark />
                    </button>
                  </div>
                  <ul className="flex flex-col gap-6 items-start justify-start">
                    {Object.entries(SideMenuItems).map(([name, href], index) => (
                      <li 
                        key={name} 
                        style={{ 
                          animation: isOpen ? `fadeSlideIn 0.5s ease forwards ${index * 0.1}s` : 'none',
                          opacity: 0,
                          transform: 'translateX(-20px)'
                        }}
                      >
                        <LocalizedClientLink
                          href={href}
                          className="text-3xl leading-10 hover:text-ui-fg-disabled transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                          data-testid={`${name.toLowerCase()}-link`}
                        >
                          {name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                  <div 
                    className="flex flex-col gap-y-6"
                    style={{ 
                      animation: isOpen ? 'fadeSlideIn 0.5s ease forwards 0.4s' : 'none',
                      opacity: 0,
                      transform: 'translateY(10px)'
                    }}
                  >
                    <div
                      className="flex justify-between"
                      onMouseEnter={toggleState.open}
                      onMouseLeave={toggleState.close}
                    >
                      {regions && (
                        <CountrySelect
                          toggleState={toggleState}
                          regions={regions}
                        />
                      )}
                      <ArrowRightMini
                        className={clx(
                          "transition-transform duration-300",
                          toggleState.state ? "-rotate-90" : ""
                        )}
                      />
                    </div>
                    <Text className="flex justify-between txt-compact-small">
                      © {new Date().getFullYear()} Darryl Store. All rights
                      reserved.
                    </Text>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
          <style jsx global>{`
            @keyframes fadeSlideIn {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
