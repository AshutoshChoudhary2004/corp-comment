type HashtagListItemProps = {
  company: string;
  onSelectCompany : (company : string) => void
};
export default function HashtagListItem({ company, onSelectCompany }: HashtagListItemProps) {
  return (
    <li>
      <button onClick = {() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
