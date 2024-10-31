import useCompanyList from "../../hooks/useCompanyList";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import HashtagListItem from "./HashtagListItem";

export default function HashtagList() {
  const companyList = useCompanyList();

  const handleSelectCompany = useFeedbackItemsStore(
    (state) => state.selectCompany
  );

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagListItem
          key={company}
          company={company}
          onSelectCompany={handleSelectCompany}
        />
      ))}
    </ul>
  );
}
