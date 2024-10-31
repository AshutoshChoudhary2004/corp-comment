import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

export default function useFilteredFeedbackItems(){
    const feedbackItems = useFeedbackItemsStore(state => state.feedbackItems);
    const selectedCompany = useFeedbackItemsStore(state => state.selectedCompany);
    return selectedCompany !== ""
      ? feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === selectedCompany
        )
      : feedbackItems;
}