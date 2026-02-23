import { useState } from 'react';
import { client } from '../client';
import type { DeleteJobRequest, DeleteJobResponse } from '../../gen/proto/jennah_pb';

export function useDeleteJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<DeleteJobResponse | null>(null);

  const deleteJob = async (jobId: string) => {
    setLoading(true);
    setError(null);

    try {
      const request = { jobId } as DeleteJobRequest;

      const res = await (client.deleteJob as (request: DeleteJobRequest) => Promise<DeleteJobResponse>)(request);

      setResponse(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Failed to delete job.");
      console.error("DeleteJob Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteJob, response, loading, error };
}
