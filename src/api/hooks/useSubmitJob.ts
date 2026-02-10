import { useState } from 'react';
import { client } from '../client';

export function useSubmitJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitJob = async (jobData: any) => {
    setLoading(true);
    setError(null);

    try {
      // calls the client's submitJob method with the provided jobData
      const response = await client.submitJob(jobData);
      return response;
    } catch (err: any) {
      // error handling for nwtwork or backend issues
      const errorMessage = err.message || "Failed to connect to Gateway. Is the backend offline?";
      setError(errorMessage);
      console.error("SubmitJob Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitJob, loading, error };
}