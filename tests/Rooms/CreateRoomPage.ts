import { expect, Locator, Page } from "@playwright/test";

export class CreateRoomsPage {
    page: Page;
    url = "http://localhost:3000/room/new";
    setCategoryLocator: Locator;
    setRoomNumberLocator: Locator;
    setFloorNumberLocator: Locator;
    setAvailabilityLocator: Locator;
    setPriceLocator: Locator;
    selectFeatureLocator: Locator;
    saveButtonLocator: Locator;
    logoutLocator: Locator;
    goBackLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.setCategoryLocator = this.page.locator("select").first();
        this.setRoomNumberLocator = this.page.locator("div").filter({ hasText: /^Number$/ }).getByRole("spinbutton")
        this.setFloorNumberLocator = this.page.locator("div").filter({ hasText: /^Floor$/ }).getByRole("spinbutton")
        this.setAvailabilityLocator = this.page.locator(".checkbox");
        this.setPriceLocator = this.page.locator("div").filter({ hasText: /^Price$/ }).getByRole("spinbutton")
        this.selectFeatureLocator = this.page.locator('label', { hasText: 'Features ' });
        this.saveButtonLocator = this.page.locator("#app > div > div.actions > a.btn.blue");
        
        this.logoutLocator = this.page.getByRole('button', {name: 'Logout'});
        this.goBackLocator = this.page.getByRole('button', {name: 'Back'});

    }

    async goTo() {
        await this.page.goto(this.url);
        await expect(this.page.getByText("New Room")).toBeVisible();
    }


    async goBackFromRoomsRoom() {
        await this.goBackLocator.click();
        await expect(this.page.getByText('Tester Hotel Overview')).toBeVisible();
    }

    async performLogout() {
        await this.logoutLocator.click();
        await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
    }


    async setCategory(category: "double" | "single" | "twin") {
        const dropdownSelector = this.setCategoryLocator;
        await dropdownSelector.selectOption({ value: category });
    }

    async setRoomNumber(number: string) {
        await this.setRoomNumberLocator.fill(number);
    }

    async setFloor(floor: string) {
        await this.setFloorNumberLocator.fill(floor);
    }

    async setAvailability(available: boolean) {
        if (!available) return;

        await this.setAvailabilityLocator.click();
        const checkboxLocator = this.page.locator(".checkbox");
        await checkboxLocator.waitFor({ state: "visible", timeout: 10000 });
        const checkmarkLocator = this.page.getByText("✓");
        await expect(checkmarkLocator).toBeVisible();
    }

    async setPrice(price: string) {
        await this.setPriceLocator.fill(price);
    }

    async selectFeatures(features: number[]) {
        for (const feature of features) {
            const url = `option:nth-child(${feature})`;
            const label = this.selectFeatureLocator;
            const parent = await label.locator('..');
            const select = await parent.locator('select');
            const isFirstIndex = features.indexOf(feature) === 0;
            await select.locator(url).click({ modifiers: isFirstIndex ? undefined : ["Control"] });
        }
    }

    async saveCreatedRoom(room: string, floor:string) {
        await this.saveButtonLocator.click();
        await expect(this.page.getByText(`Floor ${floor}, Room ${room}`)).toBeVisible();
    }

    async createRoomWithErrors() {
        await this.saveButtonLocator.click();
        await expect(this.page.getByText("Room number must be set")).toBeVisible();
        await expect(this.page.getByText("Floor must be set")).toBeVisible();
        await expect(this.page.getByText("Price must be a whole number")).toBeVisible();
    }

}