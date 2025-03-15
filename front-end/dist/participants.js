import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { createItemTemplate } from "./utils/createItemTemplate.js";
import { getUser } from "./utils/getUser.js";

function addParticipant() {
  const newParticipant = createItemTemplate();
  newParticipant.label = ""; 
  newParticipant.description = "New participant";
  newParticipant.categoryID = "participant"; 
  newParticipant.role = "primary"; 

  list.addItem({
    item: newParticipant,
    expandable: false,
    list,
    actionButtonType: "delete",
    showInputDefault: true,
  });
  
}

const user = getUser();
const showSuggestedButton = false;

// Initialize the participants list 
const list = InitializeList({
  primaryID: user.userID,
  onAddItem: (item) => {
    console.log("Participant added...", item);
  },
  ondeleteItem: (itemID) => {
    console.log("Participant deleted...", itemID);
  },
  onupdateItem: (item) => {
    console.log("Participant updated...", item);
  },
});

// Mount the page wrapper 
mountPageWrapper({
  title: "Participants",
  isIndexPage: false,
  onAddClick: addParticipant,
  user,
  showSuggested: showSuggestedButton,
});

