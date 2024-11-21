'use client'

import { useState, type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function ReactQueryProvider({children}: PropsWithChildren) {
    const [client] = useState(new QueryClient());

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryProvider