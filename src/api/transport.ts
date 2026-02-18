import { createConnectTransport } from "@connectrpc/connect-web";

const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || "/api";

export const transport = createConnectTransport({
  baseUrl: API_BASE_URL,
});