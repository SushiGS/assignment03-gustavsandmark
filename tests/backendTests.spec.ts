import { test, expect } from '@playwright/test';
import "dotenv/config";
import { PayloadGenerator } from './PayloadGenerator';
import { APIHelper } from './ApiHelper';

test.describe('Test suite backend', () => {
  let apiHelper: APIHelper;

  test.beforeAll(async ({request}) => {
    apiHelper = new APIHelper();
    const username = process.env.TEST_USERNAME ??"";
    const password = process.env.TEST_PASSWORD ??"";
    await apiHelper.login(request, username, password);
  })

  test('Get all Rooms', async ({ request }) => {
    const getRooms = await apiHelper.getAllRooms(request);
    expect(getRooms.ok()).toBeTruthy();
  });

  test('Create New Room', async ({ request }) => {
    const payload = PayloadGenerator.randomGeneratedNewRoomPayload();
    const createRoomResponse = await apiHelper.createNewRoom(request, payload);
    expect(createRoomResponse.ok()).toBeTruthy();

    expect(await createRoomResponse.json()).toMatchObject({
      category: payload.category,
      floor: payload.floor,
      number: payload.number,
      available: payload.available,
      price: payload.price,
      features: payload.features
    })

    const getRooms = await apiHelper.getAllRooms(request);
    expect(getRooms.ok()).toBeTruthy();
    expect(await getRooms.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: payload.category,
          floor: payload.floor,
          number: payload.number,
          available: payload.available,
          price: payload.price,
          features: payload.features
        })
      ])
    )
  });

})