import { APIRequestContext } from "@playwright/test";

export class APIHelper{
    private auth: string;

    async login(request: APIRequestContext, username: string, password: string) {
        const response = await request.post(`http://localhost:3000/api/login`, {
          data: { username, password },
        });
        const body = await response.json();
        const token = body.token;
        this.auth = JSON.stringify({ username, token });
      }

    async getAllRooms(request: APIRequestContext) {
        const response = await request.get(`http://localhost:3000/api/rooms`,{headers: {"X-User-Auth": this.auth}});
        return response;
        
    }

    async getRoomById(request: APIRequestContext, roomId: number) {
        const response = await request.get(`http://localhost:3000/api/room/${roomId}`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async createNewRoom(request: APIRequestContext, payload: object){
        const response = await request.post(`http://localhost:3000/api/room/new`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    async editRoomById(request: APIRequestContext, roomId: number, payload: object) {
        const response = await request.put(`http://localhost:3000/api/room/${roomId}`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(payload),
        });
        return response;
    }

    async deleteRoomById(request: APIRequestContext, roomId: number){
        const response = await request.delete(`http://localhost:3000/api/room/${roomId}`,{
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            }
        });
        return response;
    }

}