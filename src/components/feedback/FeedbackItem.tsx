import {useState} from "react";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type TFeedbackItem } from "../../lib/types";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};


export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open , setOpen] = useState(false); 
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);
  const handleUpvote = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCount(upvoteCount + 1);
    e.stopPropagation(); 
    e.currentTarget.disabled = true;
  }
  return (
    <li onClick = {() => setOpen(!open)} className={`feedback ${open ? "feedback--expand" : ""}`}>
      <button onClick = {handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>A</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
