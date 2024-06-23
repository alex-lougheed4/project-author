// app/providers.tsx
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MyFirebaseProvider } from "./firebase/firebase-providers";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    //override defaults for components e.g button
    colors: {
      darkGrey: "#0D1B2A",
      lightGrey: "#1B263B",
      darkBlue: "#415A77",
      lightBlue: "#778DA9",
      offWhite: "#E0E1DD",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <MyFirebaseProvider>{children}</MyFirebaseProvider>
    </ChakraProvider>
  );
}
