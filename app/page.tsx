'use client'

import SymptomTracker from './components/SymptomTracker'
import { ChakraProvider, CSSReset, extendTheme, Heading } from '@chakra-ui/react';

const theme = extendTheme({
  // Add custom Chakra UI theme settings if needed
});

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-16 bg-gray-50">
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Heading as="h1" size="2xl" mb={8}>
          {`Ted Lasso's Symptom Tracker`}
        </Heading>
        <SymptomTracker />
      </ChakraProvider>
    </main>
  )
}
