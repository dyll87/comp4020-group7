/**
 * creates the cancel and confirm button pair
 * @param onConfirmClick callback function for clicking cancel
 * @param onCancelClick callback function for clicking confirm
 * @returns cancel and confirm button elements
 */
export function mountConfirmationButton({ onCancelClick, onConfirmClick, }) {
    // cancel button
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("button", "button--confirmation", "button--cancel");
    cancelButton.onclick = onCancelClick !== null && onCancelClick !== void 0 ? onCancelClick : null;
    cancelButton.innerText = "Cancel";
    //   confirm button
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("button", "button--confirmation", "button--confirm");
    confirmButton.onclick = onConfirmClick !== null && onConfirmClick !== void 0 ? onConfirmClick : null;
    confirmButton.innerText = "Confirm";
    const buttonsContainer = document.createElement("div");
    buttonsContainer.append(cancelButton, confirmButton);
    return { cancelButton, confirmButton, buttonsContainer };
}
