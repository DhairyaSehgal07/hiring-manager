import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { updateUserStatus } from "../slices/userSlice";

const UserDetailsScreen = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);
  const currentUser = users.find((user) => user.id === id);
  const dispatch = useDispatch();

  console.log(currentUser);

  const handleStatusChange = (newStatus) => {
    dispatch(updateUserStatus({ userId: currentUser.id, newStatus }));
  };

  if (!currentUser) {
    return <Typography variant="h6">User not found</Typography>;
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Under Review":
        return "border border-black shadow-lg bg-gray-200";
      case "Interview Scheduled":
        return "bg-blue-600 text-white";
      case "Selected":
        return "bg-green-600 text-white";
      case "Rejected":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-16 p-6 shadow-lg">
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-4">
          User Details
        </Typography>

        {/* Name */}
        <div className="mb-4">
          <Typography variant="small" color="gray" className="font-medium">
            Name
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
            {currentUser.name}
          </Typography>
        </div>

        {/* Email */}
        <div className="mb-4">
          <Typography variant="small" color="gray" className="font-medium">
            Email
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
            {currentUser.email}
          </Typography>
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <Typography variant="small" color="gray" className="font-medium">
            Mobile Number
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
            {currentUser.mobileNumber}
          </Typography>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <Typography variant="small" color="gray" className="font-medium">
            Experience
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
            {currentUser.experience}
          </Typography>
        </div>

        {/* Status */}
        <div className="mb-4">
          <Typography variant="small" color="gray" className="font-medium">
            Status
          </Typography>
          <div
            className={`p-2 rounded-md ${getStatusStyle(currentUser.status)}`}
          >
            <Typography className="font-semibold" variant="paragraph">
              {currentUser.status}
            </Typography>
          </div>
        </div>

        <div className="mt-2 mb-6">
          <Typography variant="small" color="gray" className="font-medium ">
            Change Status
          </Typography>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {[
              "Under Review",
              "Interview Scheduled",
              "Selected",
              "Rejected",
            ].map((status) => (
              <Button
                key={status}
                color="light-blue"
                onClick={() => handleStatusChange(status)}
              >
                Set {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Application Date */}
        <div className="mb-4">
          <Typography variant="small" color="gray" className="font-medium">
            Application Date
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
            {currentUser.date}
          </Typography>
        </div>

        {/* Resume Link */}
        <div className="mb-4">
          <Typography variant="small" color="gray" className="font-medium">
            Resume Link
          </Typography>
          <a
            href={currentUser.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Resume
          </a>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <Typography variant="small" color="gray" className="font-medium">
            Skills
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
            {currentUser.skills.join(", ")}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserDetailsScreen;
