import Pattern from "../Pattern";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import FeedbackForm from "../feedback/FeedbackForm";


export default function Header() {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
}
