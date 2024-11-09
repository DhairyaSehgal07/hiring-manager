/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { v4 as uuid } from "uuid";
import {
  addQuestionToAssessment,
  editQuestionInAssessment,
  deleteQuestionFromAssessment,
} from "../slices/assessmentSlice";

const Assessment = ({ id }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const assessmentsData = useSelector((state) => state.assessments.assessments);
  const currentJob = jobs.find((job) => job.id === id);
  const curr = assessmentsData.find((assessment) => assessment.jobId === id);

  const [currentAssessment, setCurrentAssessment] = useState(curr);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [deleteQuestionIndex, setDeleteQuestionIndex] = useState(null);

  const toggleDialog = () => setOpenDialog(!openDialog);

  const handleEditQuestion = (question, index) => {
    setQuestionText(question.text);
    setOptions(question.options);
    setEditQuestionIndex(index);
    setIsEditing(true);
    toggleDialog();
  };

  const handleSaveQuestion = () => {
    if (isEditing) {
      const updatedQuestion = {
        ...currentAssessment.questions[editQuestionIndex],
        text: questionText,
        options,
      };

      dispatch(
        editQuestionInAssessment({
          jobId: id,
          questionIndex: editQuestionIndex,
          updatedQuestion,
        })
      );

      const updatedQuestions = [...currentAssessment.questions];
      updatedQuestions[editQuestionIndex] = updatedQuestion;
      setCurrentAssessment({
        ...currentAssessment,
        questions: updatedQuestions,
      });
    } else {
      const newQuestion = {
        questionId: uuid(),
        text: questionText,
        options,
      };
      dispatch(addQuestionToAssessment({ jobId: id, question: newQuestion }));
      setCurrentAssessment({
        ...currentAssessment,
        questions: [...currentAssessment.questions, newQuestion],
      });
    }

    toggleDialog();
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setIsEditing(false);
  };

  const handleDeleteIconClick = (index) => {
    setDeleteQuestionIndex(index);
    setIsDeleting(true);
  };

  // Confirm deletion of a question
  const handleDeleteConfirm = () => {
    dispatch(
      deleteQuestionFromAssessment({
        jobId: id,
        questionIndex: deleteQuestionIndex,
      })
    );

    const updatedQuestions = [...currentAssessment.questions];
    updatedQuestions.splice(deleteQuestionIndex, 1);
    setCurrentAssessment({
      ...currentAssessment,
      questions: updatedQuestions,
    });

    setIsDeleting(false);
    setDeleteQuestionIndex(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleting(false);
    setDeleteQuestionIndex(null);
  };

  return (
    <>
      <Card className="h-full w-full mt-16">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8">
            <div>
              <h1 className="text-2xl font-bold text-black my-4">
                Assessment For:-
              </h1>
              <Typography variant="h5" color="blue-gray">
                Job id: {currentJob?.id}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                {currentJob?.title}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                {currentJob?.description}
              </Typography>
              <div className="mt-6"></div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="mt-8">
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Assessment Details:
          </Typography>

          {currentAssessment?.questions?.map((question, index) => (
            <div key={question.questionId} className="mb-4">
              <Typography
                variant="h6"
                color="blue-gray"
                className="font-medium"
              >
                {index + 1}. {question.text}
              </Typography>
              <div className="mt-2">
                <Typography color="gray" className="font-normal">
                  Options:
                </Typography>
                <ul className="list-disc pl-5">
                  {question.options.map((option, idx) => (
                    <li key={idx} className="text-gray-700">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 mt-4">
                <Tooltip content="Edit Job">
                  <IconButton
                    variant="text"
                    onClick={() => handleEditQuestion(question, index)}
                  >
                    <PencilIcon className="h-6 w-6" />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Delete Job">
                  <IconButton
                    variant="text"
                    onClick={() => handleDeleteIconClick(index)}
                  >
                    <TrashIcon className="h-6 w-6 text-red-600" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => {
                toggleDialog();
                setIsEditing(false);
              }}
              color="green"
              size="lg"
            >
              Add Question
            </Button>
          </div>
        </CardBody>
      </Card>

      <Dialog open={openDialog} handler={toggleDialog}>
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            {isEditing ? "Edit Question" : "Add New Question"}
          </Typography>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter question text"
            className="mb-4 border border-gray-300 p-2 w-full"
          />

          {options.map((option, idx) => (
            <input
              key={idx}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[idx] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${idx + 1}`}
              className="mb-2 border border-gray-300 p-2 w-full"
            />
          ))}

          <div className="flex justify-end gap-4 mt-4">
            <Button color="red" onClick={toggleDialog}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSaveQuestion}>
              {isEditing ? "Save Changes" : "Save Question"}
            </Button>
          </div>
        </CardBody>
      </Dialog>

      <Dialog open={isDeleting} handler={handleDeleteCancel}>
        <DialogHeader>Confirm Delete</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this question?
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
    </>
  );
};

export default Assessment;
