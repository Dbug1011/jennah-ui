import { createClient } from "@connectrpc/connect";
import { transport } from "./transport";

// Placeholder until backend is ready
const DpfeService = {
  typeName: "jennah.v1.DpfeService",
  methods: {
    submitJob: { name: "SubmitJob", I: Object, O: Object, kind: 0 },
    listJobs: { name: "ListJobs", I: Object, O: Object, kind: 0 }
  }
} as any;


export const client = createClient(DpfeService, transport);