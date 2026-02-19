import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { DeploymentService } from "../gen/proto/jennah_pb"; 

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || "/api";

const transport = createConnectTransport({
  baseUrl: API_URL,
  interceptors: [
    (next) => async (req) => {

      const request = req as any;
      
      request.init = {
        ...request.init,
        credentials: "include",
      };

      return await next(req);
    },
  ],
});

export const client = createClient(DeploymentService, transport);