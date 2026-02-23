import { useState } from 'react';
import { client } from '../client';
import type { CancelJobRequest, CancelJobResponse } from '../../gen/proto/jennah_pb';

export function useCancelJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<CancelJobResponse | null>(null);

  const cancelJob = async (jobId: string) => {
    setLoading(true);
    setError(null);

    try {
      const request = { jobId } as CancelJobRequest;

      const res = await (client.cancelJob as (request: CancelJobRequest) => Promise<CancelJobResponse>)(request);

      setResponse(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Failed to cancel job. Job may not be in a cancellable state.");
      console.error("CancelJob Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { cancelJob, response, loading, error };
}
