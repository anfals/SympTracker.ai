import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Stack,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

interface Symptom {
    id: number;
    description: string;
}

const SymptomTracker = () => {
    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [newSymptom, setNewSymptom] = useState<string>('');

    const handleSymptomSubmit = () => {
        if (newSymptom.trim() !== '') {
            const newId = symptoms.length + 1;
            const newSymptomEntry: Symptom = {
                id: newId,
                description: newSymptom,
            };
            setSymptoms([...symptoms, newSymptomEntry]);
            setNewSymptom('');
        }
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                <Input
                    placeholder="Enter your symptom..."
                    value={newSymptom}
                    onChange={(e) => setNewSymptom(e.target.value)}
                />
                <Button colorScheme="blue" onClick={handleSymptomSubmit}>
                    Submit
                </Button>
                <Text fontSize="lg">Symptom Feed</Text>
                <Stack spacing={2} align="stretch">
                    {symptoms.map((symptom) => (
                        <Wrap key={symptom.id}>
                            <WrapItem>
                                <Box p={2} borderWidth="1px" borderRadius="md">
                                    {symptom.description}
                                </Box>
                            </WrapItem>
                        </Wrap>
                    ))}
                </Stack>
            </VStack>
        </Box>
    )
}

export default SymptomTracker