'use client'

import SymptomTracker from './components/SymptomTracker'
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  // Add custom Chakra UI theme settings if needed
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChakraProvider theme={theme}>
        <CSSReset />
        <SymptomTracker />
      </ChakraProvider>
    </main>
  )
}
