import { useParams } from "react-router-dom";
import Assessment from "../components/Assessment";

const AssessmentScreen = () => {
  const { id } = useParams();

  return (
    <>
      <Assessment id={id} />
    </>
  );
};

export default AssessmentScreen;
