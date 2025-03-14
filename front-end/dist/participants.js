import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { TemplateItem, Participants } from "./types/types.js";

const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const showSuggestedButton = false;
const actionButtonType = "default";

// Mount the page wrapper 
mountPageWrapper({
  title: "Participants",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () =>
    list.addItem({
      item: TemplateItem,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
    }),
  showSuggested: showSuggestedButton,
});

// Initialize the list 
const list = InitializeList({
  onAddItem: (item) => {
    console.log("item added...", item);
  },
  ondeleteItem: (itemID) => {
    console.log("item deleted...", itemID);
  },
  onupdateItem: (item) => {
    console.log("item updated...", item);
  },
});

// Add the list of participants 
Participants.slice()
  .reverse()
  .forEach((participant) => {
    const template = { ...TemplateItem }; 
    template.label = participant;
    list.addItem({
      item: template,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
      showInputDefault: false,
    });
  });
