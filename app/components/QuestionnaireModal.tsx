import axios from 'axios';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const QuestionnaireModal = ({
    isOpen,
    onClose,
    symptoms,
    questions,
    setSummary,
    openSummaryModal,
}: {
    isOpen: boolean,
    onClose: () => void,
    symptoms: string[],
    questions: string[],
    setSummary: (summary: string) => void,
    openSummaryModal: () => void,
}) => {
    const [indexed_responses, setIndexedResponses] = React.useState<{ [key: number]: string }>({});
    const [loading, setLoading] = React.useState<boolean>(false);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Answer the following questions...</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {questions.map((question, index) => (
                        <FormControl key={index}>
                            <FormLabel>{question}</FormLabel>
                            <Input
                                value={indexed_responses[index]}
                                onChange={(e) => {
                                    // If e is empty string, remove the key from the object
                                    if (e.target.value === '') {
                                        const new_indexed_responses = { ...indexed_responses };
                                        delete new_indexed_responses[index];
                                        setIndexedResponses(new_indexed_responses);
                                        return;
                                    }
                                    const new_indexed_responses = { ...indexed_responses };
                                    new_indexed_responses[index] = e.target.value;
                                    setIndexedResponses(new_indexed_responses);
                                }}
                            />
                        </FormControl>
                    ))}
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='blue'
                        mr={3}
                        isDisabled={
                            Object.keys(indexed_responses).length !== questions.length
                        }
                        onClick={async () => {
                            setLoading(true);
                            const new_answers = questions.map((question, index) => {
                                return `${indexed_responses[index]}`;
                            });
                            const { data } = await axios.post('/api/summarize_fancy_llm', {
                                symptoms: symptoms,
                                questions: questions,
                                answers: new_answers,
                            });
                            setSummary(data.summary);
                            setLoading(false);
                            onClose();
                            openSummaryModal();
                        }}
                        isLoading={loading}
                    >
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default QuestionnaireModal