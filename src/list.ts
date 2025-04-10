import { InitializeList } from "./components/list.js";
import { mountListItem } from "./components/listItem.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { ActionButtonType, ListItem } from "./types/types";
import { mountCategoryFilter } from "./components/categoryFilter.js";
import { getUser } from "./utils/getUser.js";
import { createItemTemplate } from "./utils/createItemTemplate.js";
import { itemIteratorNext } from "./utils/listItemIterator.js";
import { generateID } from "./utils/generateID.js";
import { getURLParam } from "./utils/getURLParam.js";
import {
  addListItem,
  deleteListItem,
  getListItems,
  getListLabel,
  updateListItem,
} from "./utils/localStoragAPI.js";

const MAX_SUGGESTED_ITEMS = 4;
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const actionButtonType: ActionButtonType = "checkbox";
const user = getUser();
const listID = getURLParam("id");

// mount page wrapper
mountPageWrapper({
  title: getListLabel(listID) || "List 1",
  isIndexPage: IS_INDEX_PAGE,
  onAddClick: () => {
    // add a new item
    const template = createItemTemplate();
    template.itemID = generateID();
    template.posterID = user.userID;
    template.listID = listID || "";
    list.addItem({
      item: template,
      expandable: IS_EXPANDABLE,
      list: list,
      actionButtonType,
    });
  },
  onsuggestClick: () => {
    // toggle is suggested items
    const suggestedItems = document.querySelectorAll(".item--sec");
    suggestedItems.forEach((item) => item.classList.toggle("hidden"));
  },
  user,
});

// exportable to make it global
const list = InitializeList({
  primaryID: user.userID,
  listID,
  onAddItem: (item) => {
    console.log("item added...", item);
    listID && addListItem(listID, item);
  },
  ondeleteItem: (itemID) => {
    console.log("item deleted...", itemID);
    listID && deleteListItem(listID, itemID);
  },
  onupdateItem: (item) => {
    console.log("item updated...", item);
    listID && updateListItem(listID, item.itemID, item);
  },
});

// generate the suggested items
const NUM_SEGGESTED_ITEMS = new Array(MAX_SUGGESTED_ITEMS).fill(0);
const suggestedItems = NUM_SEGGESTED_ITEMS.map((_) => {
  const template = createItemTemplate();
  template.label = itemIteratorNext();
  template.itemID = generateID();
  template.posterID = generateID();
  template.listID = listID || "";
  return template;
});

// add suggested  items
suggestedItems.forEach((itm) => {
  list.addItem({
    item: itm,
    expandable: IS_EXPANDABLE,
    list: list,
    actionButtonType: "accept",
    showInputDefault: false,
  });
});

mountCategoryFilter();

// get list items that may be stored in local storage and add them to the list
const localList = getListItems<ListItem>(listID);
localList?.forEach((item) => {
  list.addItem({
    item,
    expandable: IS_EXPANDABLE,
    list: list,
    actionButtonType,
    showInputDefault: false,
    // isFromBackEnd: true,
  });
});

/** ------FOR TESTING  ---------------- */
// const { container } = mountListItem({
//   itemID: TemplateItem.itemID,
//   label: TemplateItem.label,
//   isRecurring: TemplateItem.isRecurring,
//   amount: TemplateItem.amount,
//   checked: TemplateItem.checked,
//   description: TemplateItem.description,
//   category: "Category",
//   //   onActionButtonClick?: () => void,
//   //   onClick?: () => void,
//   actionButtonType: "checkbox",
//   expandable: true,
//   list: List,
// });

// const listElement = document.querySelector(".page-wrapper__list");
// listElement && listElement.append(container);
