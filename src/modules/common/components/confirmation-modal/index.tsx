import React from "react"
import Modal from "@modules/common/components/modal"
import { Heading, Text, Button } from "@medusajs/ui"

type ConfirmationModalProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    message?: string | React.ReactNode
    confirmText?: string
    cancelText?: string
    isLoading?: boolean
    size?: "xsmall" | "small" | "medium" | "large"
    'data-testid'?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Konfirmasi",
    message = "Apakah Anda yakin?",
    confirmText = "Konfirmasi",
    cancelText = "Batal",
    isLoading = false,
    size = "xsmall",
    'data-testid': dataTestId = "confirmation-modal"
}) => {
    return (
        <Modal isOpen={isOpen} close={onClose} data-testid={dataTestId} size={size} >
            <div className="px-6 py-4">
                <Modal.Title>
                    <Heading className="text-center mb-2" data-testid="confirmation-title">{title}</Heading>
                </Modal.Title>
                <Modal.Body>
                    <div className="text-center w-full text-base-regular my-4" data-testid="confirmation-message">
                        {typeof message === 'string' ? <Text>{message}</Text> : message}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-end gap-x-4 w-full mt-6">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            data-testid="confirmation-cancel-button"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={onConfirm}
                            isLoading={isLoading}
                            data-testid="confirmation-confirm-button"
                            className="flex-1"
                        >
                            {confirmText}
                        </Button>
                    </div>
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default ConfirmationModal
