'use client'

import SymptomTracker from './components/SymptomTracker'
import { ChakraProvider, CSSReset, extendTheme, Heading, Text } from '@chakra-ui/react';

const theme = extendTheme({
  // Add custom Chakra UI theme settings if needed
});

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-16 bg-gray-50">
      <title>Your Symptom Tracker</title>
      <meta
        name="description"
        content="An intelligent symptom tracker."
      />

      <ChakraProvider theme={theme}>
        <CSSReset />
        <Heading as="h1" size="xl" mb={8}>
          {`Your Intelligent Symptom Tracker`}
        </Heading>
        <Text mb={4} maxWidth={"2xl"} fontSize={"sm"}>
          {`We know how frustrating it can be to try to explain everything you've been feeling to your doctor. Sometimes you may not even know where to start. 
            If you've been experiencing chronic symptoms, this tool can help you keep track of them, and when the time is right, analyze your symptoms, ask you follow ups
            to get more information, and provide you with a summary that you can share with your doctor.

            You can clear your symptoms at any time by deleting them. Once you're ready to analyze your symptoms, click "Analyze my Symptoms" to get started!
          `}
        </Text>
        <SymptomTracker />
      </ChakraProvider>
    </main>
  )
}
