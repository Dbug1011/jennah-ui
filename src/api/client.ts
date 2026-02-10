import { createClient} from "@connectrpc/connect";
import { transport } from "./transport";
import { DeploymentService } from "../gen/proto/jennah_pb"; 

export const client = createClient(DeploymentService, transport);