import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const JobList = ({ jobs = [] }) => {
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchJobResponse = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/relevant-jobs`);
      setJobsList(res.data?.data);
      console.log("Fetch response data: ", res.data);
    } catch (error) {
      setLoading(false);
      console.error("Error in fetching job response: ", error.message || error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchJobResponse();
  }, []);

  if (!jobsList.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-gray-300">
        <p className="text-sm text-gray-500">No relevant jobs found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 mx-3 grid grid-cols-3 overflow-y-auto gap-4 flex-1 h-full">
      {jobsList.map((job) => (
        <JobCard key={job._id || job.jobDetails?.jobId} job={job} />
      ))}
    </div>
  );
};

export default JobList;
