import { test, expect } from "@playwright/test";
import { LoginPage } from "./Login/LoginPage";
import { EditRoomsPage } from "./Rooms/EditRoomPage";
import "dotenv/config";
import { CreateClientPage } from "./Clients/CreateClientPage";

test.describe('Test suite frontend', () => {

 test.beforeEach(async ({ page }) => {
   const loginPage = new LoginPage(page);
   await loginPage.goToLoginpage();
   await loginPage.performLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);


 });

 test('Create new client', async ({ page }) => {
  const createClientPage = new CreateClientPage(page);
  await createClientPage.goTo();
  await createClientPage.setClientName("Gustav");
  await createClientPage.setClientEmail("Gustav@bajs.com");
  await createClientPage.setClientPhoneNumber("0909090909");
  await createClientPage.createClient();
});

 test("Edit a room and put price as 0, should recive error ", async ({ page }) => {
    const editRoomPage = new EditRoomsPage(page);
    await editRoomPage.goTo();
    await editRoomPage.setPrice('0');
    await editRoomPage.editRoomWithError();
 });

})