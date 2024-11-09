import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Tooltip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob, editJob, deleteJob } from "../slices/jobsSlice";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "S/N",
  "Job Title",
  "Job Description",
  "Number of Candidates Applied",
  "Edit",
  "Delete",
  "",
];

export function JobListTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobsData = useSelector((state) => state.jobs.jobs);
  const [jobs, setJobs] = useState(jobsData);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [formData, setFormData] = useState({
    id: uuid(),
    title: "",
    description: "",
    candidates: [],
  });

  useEffect(() => {
    // trigger a re-render if jobsData state changes
    setJobs(jobsData);
  }, [jobsData]);

  const handleOpen = () => {
    setOpen(!open);
    if (!open) setIsEditing(false);
  };

  const handleChange = (e) => {
    // handle the change in input value for editing and add new job
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // if isEditing is true , dispatch editing option and update the state
    if (isEditing) {
      dispatch(editJob(formData));
    } else {
      // else dispatch the addJob action and update the jobs state
      const newJob = { ...formData, candidates: [] };
      dispatch(addJob(newJob));
    }

    setFormData({ title: "", description: "", candidates: [] });
    setOpen(false);
  };

  const handleEdit = (job) => {
    setFormData(job);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteIconClick = (job) => {
    setDeleteJobId(job.id);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteJobId) {
      dispatch(deleteJob(deleteJobId));
    }
    setIsDeleting(false);
    setDeleteJobId(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleting(false);
    setDeleteJobId(null);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Job Postings
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage your job postings here
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => {
                setFormData({
                  id: uuid(),
                  title: "",
                  description: "",
                  candidatesApplied: [],
                });
                setIsEditing(false);
                setOpen(true);
              }}
              className="flex items-center gap-3"
              size="sm"
            >
              Add Job
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => {
              const isLast = index === jobs.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={job.id} className="hover:bg-gray-200 cursor-pointer">
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job.description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job.candidates.length}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit Job">
                      <IconButton
                        onClick={() => handleEdit(job)}
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip content="Delete Job">
                      <IconButton
                        onClick={() => handleDeleteIconClick(job)}
                        variant="text"
                      >
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td>
                    <Button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="flex items-center gap-3"
                      size="sm"
                    >
                      View Job
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{isEditing ? "Edit Job" : "Add New Job"}</DialogHeader>
        <DialogBody divider>
          <div className="space-y-4">
            <Input
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              label="Job Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="black" onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Add Job"}
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={isDeleting} handler={handleDeleteCancel}>
        <DialogHeader>Confirm Delete</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this job?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="gradient" color="red" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
