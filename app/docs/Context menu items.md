# Context menu
The context menu Svelte component should always be present at the top layer (+page.svelte) to be rendered. You cannot use more than one context menu component at a time.

Interacting with the context menu is done via the `contextMenu` interface imported from `$lib/contextMenuLogic.ts`. You may also subscribe to state changes of the context menu (e.g. when closing, opening) by using the `contextMenuState` writable imported from this file.

## Context menu methods
* `open(e: MouseEvent, items: TContextMenuItem[])`
    * Opens the context menu at the position set by `e` with the items and actions listed in `items`, and updates the context menu state.
* `close()`
    * Closes the context menu, and updates the context menu state.
* `getItems()`
    * Returns the currently used array of `TContextMenuItem` objects most recently updated by `open()`
* `updateState()`
    * Call a state update of the context menu, informing all subscribers of `contextMenuState` that the state has changed.

## Context menu items
When calling `contextMenu.open(e, items)`, the second argument is an array of `TContextMenuItem` objects. These determine what elements will be rendered in the context menu. Only one child is required here: the string `text`.

### Usable TContextMenuItem children

* `text` (string) (required)
    * Text to be displayed in the context menu
    * If the value is "`HROW`", this child does not require `action` and also renders an `<hr>` element instead of text in the context menu.
* `action` (void) (required if value of `text` is not `HROW`)
    * What function should be called upon clicking the context menu item