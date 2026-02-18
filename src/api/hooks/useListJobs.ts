import { useState } from 'react';
import { client } from '../client';
import type { Job, ListJobsRequest, ListJobsResponse } from '../../gen/proto/jennah_pb';

export function useListJobs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create a proper request object
      const request = {
        tenantId: "default" // Replace with actual tenant ID from auth context
      } as ListJobsRequest;
      
      // Cast to select the unary overload
      const response = await (client.listJobs as (request: ListJobsRequest) => Promise<ListJobsResponse>)(request);
      
      setJobs(response.jobs || []); 
      return response;
    } catch (err: any) {
      setError("Unable to fetch job list. Please check your connection.");
      console.error("ListJobs Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchJobs, jobs, loading, error };
}