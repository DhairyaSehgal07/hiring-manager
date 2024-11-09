import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

const TABLE_HEAD = [
  "S/N",
  "Applicant Name",
  "Resume Link",
  "Application Date",
  "Status",
  "",
];

const JobDetailsScreen = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const { id } = useParams();
  const currentJob = jobs.find((job) => job.id === id);
  const usersData = useSelector((state) => state.users.users);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const users = currentJob
    ? usersData.filter((user) => currentJob.candidates.includes(user.id))
    : [];

  console.log(users);

  return (
    <>
      <Card className="h-full w-full mt-16">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className=" flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Job id:- {currentJob.id}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                {currentJob.title}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                {currentJob.description}
              </Typography>
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={() => navigate(`${currentPath}/assessment`)}
                  className="flex items-center gap-3"
                  size="sm"
                >
                  View Assesment
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {users.length === 0 ? (
            <Typography color="blue-gray" className="p-4 text-center">
              No candidate has applied for this job
            </Typography>
          ) : (
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
                {users.map((user, index) => {
                  const isLast = index === jobs.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-200 cursor-pointer"
                    >
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
                          {user.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.resumeLink}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.status}
                        </Typography>
                      </td>
                      <td>
                        <Button
                          onClick={() => navigate(`/users/${user.id}`)}
                          className="flex items-center gap-3"
                          size="sm"
                        >
                          View profile
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default JobDetailsScreen;
