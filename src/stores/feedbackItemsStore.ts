import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (text: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>(set => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",

  addItemToList: async (text: string) => {
    const companyName: string = text
      .split(" ")
      .find((word) => word[0] === "#")!
      .substring(1);

    const newItem: TFeedbackItem = {
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      id: new Date().getTime(),
    };

    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }));

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  },

  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },

  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set(() => ({ feedbackItems: data.feedbacks }));
    } catch (error) {
      set(() => ({ errorMessage: "Something went wrong. Please try again" }));
    }
    set(() => ({ isLoading: false }));
  },
}));