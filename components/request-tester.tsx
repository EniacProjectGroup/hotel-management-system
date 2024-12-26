/* eslint-disable @typescript-eslint/no-unused-vars */
export async function RequestTester() {

    async function getRoom(roomId: number) {
        const response = await fetch(`http://localhost:3001/room/${roomId}`, {
          method: "GET",
        });
      
        if (response.ok) {
          return await response.json();
        } else {
          console.error("Failed to fetch room:", response.statusText);
        }
    }    

    async function getAllRooms() {
        const response = await fetch(`http://localhost:3001/room`, {
          method: "GET",
        });
      
        if (response.ok) {
          return await response.json();

        } else {
          console.error(response.status ," Failed to fetch room:", response.statusText);
        }
    }    

    const response = await getRoom(101);
    console.log(response)

    return <div></div>
}