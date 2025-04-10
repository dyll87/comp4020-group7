/**
 * creates an icon button 40x40px
 * @param src href for image
 * @returns HTMLButton element
 */
export function createIconButton({
  src,
  onClick,
}: {
  src: string;
  onClick?: (ev: MouseEvent) => void;
}) {
  //create button and add styling
  const iconButton = document.createElement("button");
  iconButton.classList.add("icon-button", "border-radius", "center");
  iconButton.onclick = onClick ?? null;

  // create image component, add styling and add to button
  const icon = document.createElement("img");
  icon.src = src;
  icon.classList.add("icon-button__icon", "pointable");
  iconButton.appendChild(icon);

  return iconButton;
}
