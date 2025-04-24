import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { TContextMenuItem } from "$lib/types";

export const contextMenuState: Writable<boolean> = writable(false);  // Invert when state changes

class ContextMenu {
    public isOpen = false;
    public x = 0;
    public y = 0;
    private items: TContextMenuItem[] = [];

    public updateState() {
        contextMenuState.update(state => !state);
    }

    public getItems() {
        return this.items;
    }
    
    public open(event: MouseEvent, items: TContextMenuItem[]) {
        if (this.isOpen) {
            this.isOpen = false;
            return;
        }
        
        this.x = event.clientX;
        this.y = event.clientY;

        this.items = items;

        this.isOpen = true;
        this.updateState();
    }

    public close() {
        this.isOpen = false;
        this.updateState();
    }
}

export const contextMenu = new ContextMenu();