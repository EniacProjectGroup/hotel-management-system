const express = require("express");
const cors = require("cors");
const pg = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

async function setupApp() {
  const pgClient = new pg.Client({
    database: "hotel management system",
    password: "rojdasuslu1794", // Use environment variables for sensitive data
    user: "postgres",
  });
  await pgClient.connect();

  // Get All Rooms
  app.get("/room", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM Room;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching room:", err);
      res.status(500).send({ error: "Failed to fetch room" });
    }
  });

  // Get Room Endpoint
  app.get("/room/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM Room WHERE room_id = ${id};`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "Room not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching room:", err);
      res.status(500).send({ error: "Failed to fetch room" });
    }
  });

  app.listen(3001, function () {
    console.log("Server is running at http://localhost:3001");
  });
}

setupApp();
