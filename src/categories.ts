import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { Categories, ListItem } from "./types/types.js";
import { ActionButtonType } from "./types/types";
import { getUser } from "./utils/getUser.js";
import { createItemTemplate } from "./utils/createItemTemplate.js";
import { generateID } from "./utils/generateID.js";

const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = false;
const showSuggestedButton = false;
const actionButtonType: ActionButtonType = "delete";

const user = getUser();

// mount page wrapper
mountPageWrapper({
  title: "Categories",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => {
    const template = createItemTemplate();
    template.itemID = generateID();
    template.posterID = getUser().userID;
    list.addItem({
      item: template,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
    });
  },
  showSuggested: showSuggestedButton,
  user,
});

// exportable to make it global
const list = InitializeList({
  primaryID: user.userID,
  onAddItem: (item) => {
    console.log("item added...", item);
    const rr = localStorage.getItem("category");
    let cc;
    if (rr) {
      cc = JSON.parse(rr) as ListItem[];
      cc.push(item);
    } else cc = item;

    localStorage.setItem("category", JSON.stringify(cc));
  },
  ondeleteItem: (itemID) => {
    console.log("item deleted...", itemID);
    const rr = localStorage.getItem("category");
    let cc;
    if (rr) {
      cc = JSON.parse(rr) as ListItem[];
      cc = cc.filter((item) => item.itemID !== itemID);
    }

    localStorage.setItem("category", JSON.stringify(cc));
  },
  onupdateItem: (item) => {
    console.log("item updated...", item);
    const rr = localStorage.getItem("category");
    let cc;
    if (rr) {
      cc = JSON.parse(rr) as ListItem[];
      const ind = cc.findIndex((item_) => item_.itemID === item.itemID);
      cc[ind] = item;
    }

    localStorage.setItem("category", JSON.stringify(cc));
  },
});

// add the list of categories to the page
Categories.map((category) => category)
  .reverse()
  .forEach((category) => {
    const template = createItemTemplate();
    template.label = category;
    template.itemID = generateID();
    template.posterID = getUser().userID;
    list.addItem({
      item: template,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
      showInputDefault: false,
    });
  });

const rr = localStorage.getItem("category");
let cc;
if (rr) {
  cc = JSON.parse(rr) as ListItem[];
  cc.forEach((item) =>
    list.addItem({
      item,
      expandable: IS_EXPANDABLE,
      list,
      actionButtonType,
    })
  );
}
