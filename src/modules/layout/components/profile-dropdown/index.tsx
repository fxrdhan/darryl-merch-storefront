"use client"

import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react"
import { HttpTypes } from "@medusajs/types"
import { Button, Text } from "@medusajs/ui"
import { Fragment, useEffect, useState } from "react"
import { usePathname, useParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import User from "@modules/common/icons/user"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { signout } from "@lib/data/customer"
import ConfirmationModal from "@modules/common/components/confirmation-modal"
import useToggleState from "@lib/hooks/use-toggle-state"

const ProfileDropdown = ({
    customer,
}: {
    customer?: HttpTypes.StoreCustomer | null
}) => {
    const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | undefined>(
        undefined
    )
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const { state: isModalOpen, open: openModal, close: closeModal } = useToggleState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const { countryCode } = useParams() as { countryCode: string }
    const pathname = usePathname()
    const currentPath = usePathname()

    const open = () => setProfileDropdownOpen(true)
    const close = () => setProfileDropdownOpen(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await signout(countryCode)
        close()
        closeModal()
        setIsLoggingOut(false)
    }

    const timedOpen = () => {
        open()
        const timer = setTimeout(close, 3000)
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

    useEffect(() => {
        if (profileDropdownOpen) {
            close()
        }
    }, [currentPath])

    if (pathname.includes("/account") || pathname.includes("/checkout")) {
        return (
            <LocalizedClientLink
                className="hover:text-ui-fg-base flex items-center gap-x-2"
                href="/account"
                data-testid="nav-account-link"
            >
                <User size={16} /> Account
            </LocalizedClientLink>
        )
    }

    return (
        <div
            className="h-full z-50"
            onMouseEnter={openAndCancel}
            onMouseLeave={close}
        >
            <Popover className="relative h-full">
                <PopoverButton className="h-full flex items-center gap-x-2 hover:text-ui-fg-base">
                <LocalizedClientLink href="/account" className="hover:text-ui-fg-base flex items-center gap-x-2 dark:text-gray-100 dark:hover:text-gray-900">
                        <User size={16} /> Account
                    </LocalizedClientLink>
                </PopoverButton>
                <Transition
                    show={profileDropdownOpen}
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
                        className="rounded-b-lg shadow-xl hidden small:block absolute top-[calc(100%+1px)] left-1/2 transform -translate-x-1/2 bg-white border-x border-b border-gray-200 w-[280px] text-ui-fg-base"
                        data-testid="nav-profile-dropdown"
                    >
                        <div className="p-4 flex flex-col gap-y-2">
                            {customer ? (
                                <>
                                    <div className="flex flex-col">
                                        <Text className="text-sm font-semibold">
                                            {customer.first_name} {customer.last_name}
                                        </Text>
                                        <Text className="text-xs text-gray-500">
                                            {customer.email}
                                        </Text>
                                    </div>
                                    <hr className="my-2 border-gray-200" />
                                    <LocalizedClientLink
                                        href="/account/profile"
                                        passHref
                                        className="block w-full text-left text-ui-fg-base hover:text-ui-fg-interactive px-2 py-1 rounded transition-colors"
                                    >
                                        <span className="text-sm">Profile</span>
                                    </LocalizedClientLink>
                                    <LocalizedClientLink
                                        href="/account/orders"
                                        passHref
                                        className="block w-full text-left text-ui-fg-base hover:text-ui-fg-interactive px-2 py-1 rounded transition-colors"
                                    >
                                        <span className="text-sm">Orders</span>
                                    </LocalizedClientLink>
                                    <hr className="my-2 border-gray-200" />
                                    <button
                                        className="block w-full text-left text-rose-500 hover:text-rose-600 px-2 py-1 rounded transition-colors flex items-center"
                                        onClick={openModal}
                                        data-testid="logout-button"
                                        type="button"
                                    >
                                        <ArrowRightOnRectangle className="mr-2" /> <span className="text-sm">Sign Out</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Text className="text-sm text-gray-500">
                                        Sign in for a better experience.
                                    </Text>
                                    <LocalizedClientLink href="/account" passHref>
                                        <Button variant="primary" className="w-full">
                                            Sign In
                                        </Button>
                                    </LocalizedClientLink>
                                </>
                            )}
                        </div>
                    </PopoverPanel>
                </Transition>
            </Popover>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={() => {
                    closeModal()
                    handleLogout()
                }}
                title="Konfirmasi Logout"
                message="Apakah Anda yakin ingin logout?"
                confirmText="Logout"
                cancelText="Batal"
                isLoading={isLoggingOut}
            />
        </div>
    )
}

export default ProfileDropdown
