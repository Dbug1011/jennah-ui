import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { DeploymentService } from "../gen/proto/jennah_pb"; 

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || "/api";

const transport = createConnectTransport({
  baseUrl: API_URL,
  
  // 1. Keeps the cookies attached for the browser
  fetch: (input, init) => {
    return globalThis.fetch(input, {
      ...init,
      credentials: "include", 
    });
  },
  
  interceptors: [
    (next) => async (req) => {
      req.header.set("X-OAuth-Email", "karis@bisu.edu.ph"); 
      return await next(req);
    }
  ]
});

export const client = createClient(DeploymentService, transport);