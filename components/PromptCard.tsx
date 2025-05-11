import { Prompt } from "@/utils/types";

export const PromptCard = ({
  id,
  createdAt,
  promptTitle,
  promptSummary,
  authorId,
  writerCreds,
}: Prompt) => {
  return (
    <div className="bg-gray-900 shadow-md rounded-lg p-4 mb-4 text-white items-center text-center">
      <h2 className="">{promptTitle}</h2>
      <p className="">{promptSummary}</p>
      <div className="">
        <p className="">Author ID: {authorId}</p>
        <p className="">Writer Credits: {writerCreds.toString()}</p>
        <p className="">
          Created At: {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
