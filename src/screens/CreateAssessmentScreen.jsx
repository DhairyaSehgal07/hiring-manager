import { Option, Select } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Assessment from "../components/Assessment";

const CreateAssessmentScreen = () => {
  const jobsData = useSelector((state) => state.jobs.jobs);

  const [currentJob, setCurrentJob] = useState(null);

  const handleJobChange = (selectedJobId) => {
    const selectedJob = jobsData.find((job) => job.id === selectedJobId);
    setCurrentJob(selectedJob);
  };

  useEffect(() => {
    if (currentJob) {
      console.log("Current job has been updated:", currentJob);
    }
  }, [currentJob]);

  return (
    <>
      <h1 className="text-xl mt-4 ml-1 font-bold mb-4">Select a Job</h1>

      <Select
        label="Choose a Job"
        onChange={(value) => handleJobChange(value)}
        value={currentJob ? currentJob.id : ""}
      >
        {jobsData.map((job) => (
          <Option key={job.id} value={job.id}>
            {job.title}
          </Option>
        ))}
      </Select>

      {currentJob && <Assessment key={currentJob.id} id={currentJob.id} />}
    </>
  );
};

export default CreateAssessmentScreen;
