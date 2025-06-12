import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TFeedbackItem } from "../../lib/types";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import useFilteredFeedbackItems from "../../hooks/useFilteredFeedbackItems.ts";

export default function FeedbackList() {
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const feedbackItems = useFilteredFeedbackItems(); 

  return (
  <ol className="feedback-list">
    {isLoading ? (
      <Spinner />
    ) : errorMessage ? (
      <ErrorMessage message={errorMessage} />
    ) : (
      feedbackItems.map((feedbackItem: TFeedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))
    )}
  </ol>
);

}
