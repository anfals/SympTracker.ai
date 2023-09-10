import axios from 'axios';
import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Stack,
    Text,
    VStack,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    HStack,
    useToast,
    useDisclosure,
} from '@chakra-ui/react';
import { get_follow_up_questions } from '@/utils/symptom_analyzer';
import QuestionnaireModal from './QuestionnaireModal';
import SummaryModal from './SummaryModal';

export interface Symptom {
    id: number;
    description: string;
    timestamp: string; // Add timestamp property
    type: string;
}

const SymptomTracker = () => {
    const toast = useToast();
    const { isOpen: isQuestionModalOpen, onOpen: onQuestionModalOpen, onClose: onQuestionModalClose } = useDisclosure();
    const { isOpen: isSummaryModalOpen, onOpen: onSummaryModalOpen, onClose: onSummaryModalClose } = useDisclosure();

    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [newSymptom, setNewSymptom] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // For the post analyze button workflow
    const [questions, setQuestions] = useState<string[]>([]);
    const [summary, setSummary] = useState<string>('');

    const handleSymptomSubmit = async () => {
        if (newSymptom.trim() !== '') {
            const newId = symptoms.length + 1;
            const timestamp = new Date().toLocaleString(); // Get current timestamp

            const {data} = await axios.post('/api/classify_symptom_llm', {
                symptom: newSymptom
            });

            const newSymptomEntry: Symptom = {
                id: newId,
                description: newSymptom,
                timestamp: timestamp,
                type: data.classification
            };
            setSymptoms([...symptoms, newSymptomEntry]);
            setNewSymptom('');
        }
    };

    const handleSymptomDelete = (id: number) => {
        const updatedSymptoms = symptoms.filter((symptom) => symptom.id !== id);
        setSymptoms(updatedSymptoms);
    };

    return (
        <Box p={4}>
            <VStack spacing={4}>
                <QuestionnaireModal
                    isOpen={isQuestionModalOpen}
                    onClose={onQuestionModalClose}
                    symptoms={symptoms.map((symptom) => symptom.description)}
                    questions={questions}
                    setSummary={setSummary}
                    openSummaryModal={onSummaryModalOpen}
                />
                <SummaryModal
                    isOpen={isSummaryModalOpen}
                    onClose={onSummaryModalClose}
                    summary={summary}
                />
                <HStack spacing={4} alignItems={"center"} justifyContent={"space-between"} width={"full"}>
                    <Heading as="h3" size={"md"} alignSelf={"start"}>My Symptoms</Heading>
                    <Button colorScheme="blue" onClick={async () => {
                        console.log("Analyze my symptoms!");
                        // Check if there are any symptoms
                        if (symptoms.length === 0) {
                            // Chakra toast
                            toast({
                                title: "No symptoms to analyze.",
                                description: "Please add some symptoms to analyze.",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            });
                            return;
                        } else {
                            console.log("Kicking off anthropic call");
                            setLoading(true);
                            const { data } = await axios.post('/api/call_fancy_llm', {
                                symptom_list: symptoms
                            });
                            setQuestions(data.filtered_questions);
                            setLoading(false);
                            onQuestionModalOpen();
                        }
                    }}
                        isLoading={loading}
                    >
                        Analyze my Symptoms
                    </Button>
                </HStack>
                <Stack spacing={4} align="stretch" width={"full"} justifyContent={"center"} alignItems={"center"}>
                    {symptoms.map((symptom) => (
                        <Card key={symptom.id} borderWidth="1px" borderRadius="lg" width={["full", "full", "xl", "2xl"]}>
                            <CardBody>
                                <Text fontSize="lg">{symptom.description}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {symptom.timestamp}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    {symptom.type}
                                </Text>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <Button
                                    size="sm"
                                    colorScheme="red"
                                    onClick={() => handleSymptomDelete(symptom.id)}
                                >
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </Stack>
                <Divider />
                <Heading as="h3" size={"md"} alignSelf={"start"}>Add a Symptom</Heading>
                <Input
                    placeholder="Enter your symptoms and describe any details that may be helpful."
                    value={newSymptom}
                    onChange={(e) => setNewSymptom(e.target.value)}
                    width={["full", "full", "xl", "2xl"]}
                    height={"200px"}
                />
                <Button colorScheme="blue" onClick={handleSymptomSubmit}>
                    Submit
                </Button>
            </VStack>
        </Box>
    );
}

export default SymptomTracker