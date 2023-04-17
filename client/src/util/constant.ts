import { QueryClientConfig } from "react-query";

const ONE_SEC = 1000;
const FIVE_MINUTE = ONE_SEC * 60 * 5;

export const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            enabled: true,
            staleTime: FIVE_MINUTE,
            cacheTime: FIVE_MINUTE,
            retry: 2,
            retryDelay: ONE_SEC,
            refetchInterval: FIVE_MINUTE,
            refetchOnWindowFocus: false,
        }
    }
}
