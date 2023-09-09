import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const SummaryModal = ({
    isOpen,
    onClose,
    summary,
}: {
    isOpen: boolean,
    onClose: () => void,
    summary: string,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Your Symptom Summary</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text mb={4} fontSize={"sm"} textColor={"red.700"}>Please keep in mind that this is not an official diagnosis. This is simply a report for you and your medical professional to review together.</Text>
                    {summary}
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SummaryModal