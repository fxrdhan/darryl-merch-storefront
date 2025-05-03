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
    'data-testid': dataTestId = "confirmation-modal"
}) => {
    return (
        <Modal isOpen={isOpen} close={onClose} data-testid={dataTestId}>
            <Modal.Title>
                <Heading data-testid="confirmation-title">{title}</Heading>
            </Modal.Title>
            <Modal.Body>
                <div className="text-center w-full text-base-regular" data-testid="confirmation-message">
                    {typeof message === 'string' ? <Text>{message}</Text> : message}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex items-center justify-end gap-x-4 w-full">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        data-testid="confirmation-cancel-button"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onConfirm}
                        isLoading={isLoading}
                        data-testid="confirmation-confirm-button"
                    >
                        {confirmText}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal
