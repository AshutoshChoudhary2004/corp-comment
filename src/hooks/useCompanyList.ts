import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

export default function useCompanyList() {
  const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
  return feedbackItems
    .map((feedbackItem) => feedbackItem.company)
    .filter((company, index, array) => array.indexOf(company) === index);
}
