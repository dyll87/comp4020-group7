import { InitializeList } from "./components/list.js";
import { mountPageWrapper } from "./components/pageWrapper.js";
import { getUser } from "./utils/getUser.js";
import { createItemTemplate } from "./utils/createItemTemplate.js";
import { RecurringListItems } from "./types/recurringItems.js";
import { generateID } from "./utils/generateID.js";
const IS_INDEX_PAGE = false;
const IS_EXPANDABLE = true;
const showSuggestedButton = false;
const actionButtonType = "default";
const user = getUser();
// mount page wrapper
mountPageWrapper({
    title: "Recurring Items",
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
    },
    ondeleteItem: (itemID) => {
        console.log("item deleted...", itemID);
    },
    onupdateItem: (item) => {
        console.log("item updated...", item);
    },
});
// add the list of recurring items to the page
RecurringListItems.map((item) => item)
    .reverse()
    .forEach((item) => {
    item.itemID = generateID();
    item.posterID = getUser().userID;
    list.addItem({
        item: item,
        expandable: IS_EXPANDABLE,
        list,
        actionButtonType,
        showInputDefault: false,
    });
});
