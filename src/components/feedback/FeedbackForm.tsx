import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants.ts";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore.ts";

export default function FeedbackForm() {
  const onAddToList = useFeedbackItemsStore((state) => state.addItemToList);

  const [text, setText] = useState("");
  const remainingCharCount = MAX_CHARACTERS - text.length;
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setText(event.target.value);
  };

  const textIsValid = (text: string) => {
    const ind = text.indexOf("#");
    if (ind == -1 || ind + 1 == text.length || text[ind + 1] === " ")
      return false;
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (textIsValid(text)) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
      onAddToList(text);
      setText("");
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
    >
      <textarea
        onChange={handleChange}
        value={text}
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck={false}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{remainingCharCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
