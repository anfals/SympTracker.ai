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
} from '@chakra-ui/react';

interface Symptom {
    id: number;
    description: string;
    timestamp: string; // Add timestamp property
}

const SymptomTracker = () => {
    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [newSymptom, setNewSymptom] = useState<string>('');

    const handleSymptomSubmit = () => {
        if (newSymptom.trim() !== '') {
            const newId = symptoms.length + 1;
            const timestamp = new Date().toLocaleString(); // Get current timestamp
            const newSymptomEntry: Symptom = {
                id: newId,
                description: newSymptom,
                timestamp: timestamp,
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
                <HStack spacing={4} alignItems={"center"} justifyContent={"space-between"} width={"full"}>
                    <Heading as="h3" size={"md"} alignSelf={"start"}>My Symptoms</Heading>
                    <Button colorScheme="blue" onClick={() => setSymptoms([])}>
                        Clear Symptoms
                    </Button>
                </HStack>
                <Stack spacing={4} align="stretch" width={"full"} justifyContent={"center"} alignItems={"center"}>
                    {symptoms.map((symptom) => (
                        <Card key={symptom.id} borderWidth="1px" borderRadius="lg" width={["90%", "90%", "xl", "2xl"]}>
                            <CardBody>
                                <Text fontSize="lg">{symptom.description}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {symptom.timestamp}
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
                    placeholder="Enter your symptom..."
                    value={newSymptom}
                    onChange={(e) => setNewSymptom(e.target.value)}
                    width={["90%", "90%", "xl", "2xl"]}
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