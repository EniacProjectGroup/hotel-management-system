/* eslint-disable @typescript-eslint/no-require-imports */

const express = require("express");
const cors = require("cors");
const pg = require("pg");
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

var swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "HMS API",
    },
  },
  apis: ["server/index.js"],
};

var swaggerDocs = swaggerJsDoc(swaggerOptions);

//Create Swagger Docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
/**
 * @swagger
 * /room:
 *   get:
 *     description: Get all rooms
 *     responses:
 *       200:
 *         description: Successfully retrieved all rooms
 *       500:
 *         description: Failed to fetch rooms
 *   post:
 *     description: Add a new room
 *     parameters:
 *       - name: room
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             room_id: { type: integer }
 *             roomType_name: { type: string }
 *             roomType_description: { type: string }
 *             services: { type: string }
 *             room_available: { type: boolean }
 *             room_image: { type: string }
 *     responses:
 *       200:
 *         description: Room added successfully
 *       500:
 *         description: Error adding room
 *
 *
 * /room/{id}:
 *   get:
 *     description: Get room by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved room
 *       404:
 *         description: Room not found
 *       500:
 *         description: Failed to fetch room
 *   put:
 *     description: Make room available
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully made room available
 *       404:
 *         description: Room not found
 *       500:
 *         description: Failed to change room availability
 *
 *
 * /customer:
 *   get:
 *      description: Get all customers
 *      responses:
 *        200:
 *          description: Successfully retrieved all customers
 *        500:
 *          description: Failed to fetch rooms
 *   post:
 *     description: Add a new customer
 *     parameters:
 *       - name: customer
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             customer_id: { type: string }
 *             customer_name: { type: string }
 *             customer_surname: { type: string }
 *             customer_phonenumber: { type: string }
 *             customer_citizenship: { type: string }
 *             customer_citizenship_id: { type: string }
 *             customer_passport_id: { type: string }
 *             customer_address: { type: string }
 *             customer_gender: { type: string }
 *             customer_age: { type: integer }
 *             customerType_name: { type: string }
 *             customerType_description: { type: string }
 *     responses:
 *       200:
 *         description: Customer added successfully
 *       500:
 *         description: Error adding customer
 *
 *
 * /customer/{id}:
 *   get:
 *     description: Get customer by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved customer
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Failed to fetch customer
 *
 *
 * /assign-room:
 *   post:
 *     description: Add a new customer and assign him/her to room
 *     parameters:
 *       - name: customer
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             customer_id: { type: string }
 *             customer_name: { type: string }
 *             customer_surname: { type: string }
 *             customer_phonenumber: { type: string }
 *             customer_citizenship: { type: string }
 *             customer_citizenship_id: { type: string }
 *             customer_passport_id: { type: string }
 *             customer_address: { type: string }
 *             customer_gender: { type: string }
 *             customer_age: { type: integer }
 *             room_id: { type: integer }
 *             customerType_name: { type: string }
 *             customerType_description: { type: string }
 *     responses:
 *       200:
 *         description: Customer assigned successfully
 *       500:
 *         description: Error assigning customer
 *
 *
 * /staff:
 *   get:
 *      description: Get all staffs
 *      responses:
 *        200:
 *          description: Successfully retrieved all staffs
 *        500:
 *          description: Failed to fetch staffs
 *   post:
 *     description: Add a new staff
 *     parameters:
 *       - name: staff
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             staff_id: { type: string }
 *             staff_name: { type: string }
 *             staff_surname: { type: string }
 *             staff_phonenumber: { type: string }
 *             staff_citizenship: { type: string }
 *             staff_citizenship_id: { type: string }
 *             staff_passport_id: { type: string }
 *             staff_birthdate: { type: string, format: date }
 *             staff_address: { type: string }
 *             staff_salary: { type: number, format: double }
 *             staff_entry_date: { type: string, format: date }
 *             staffType_name: { type: string }
 *             staffType_description: { type: string }
 *             staff_image: { type: string }
 *     responses:
 *       200:
 *         description: Staff added successfully
 *       500:
 *         description: Error adding Staff
 *
 *
 * /staff/{id}:
 *   get:
 *     description: Get staff by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved staffs
 *       404:
 *         description: Staffs not found
 *       500:
 *         description: Failed to fetch staffs
 *
 *
 * /checkin:
 *   get:
 *     description: Get all checkins
 *     responses:
 *       200:
 *         description: Successfully retrieved all Checkins
 *       500:
 *         description: Failed to fetch checkins
 *   post:
 *     description: Add a new checkin
 *     parameters:
 *       - name: checkin
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             checkin_id: { type: integer }
 *             checkin_date: { type: string, format: date }
 *             checkin_due_date: { type: string, format: date }
 *             room_id: { type: integer }
 *             customer_id: { type: string }
 *             reservation_type: { type: string }
 *             reservation_in_date: { type: string, format: date }
 *             reservation_out_date: { type: string, format: date }
 *             reservationType_name: { type: string }
 *             reservationType_description: { type: string }
 *     responses:
 *       200:
 *         description: Checkin added successfully
 *       500:
 *         description: Error adding Checkin
 *
 *
 * /checkin/{id}:
 *   get:
 *     description: Get checkin by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved checkin
 *       404:
 *         description: checkin not found
 *       500:
 *         description: Failed to fetch checkin
 *
 *
 * /cleaning:
 *   get:
 *     description: Get all cleanings
 *     responses:
 *       200:
 *         description: Successfully retrieved all cleanings
 *       500:
 *         description: Failed to fetch cleanings
 *   post:
 *     description: Add a new cleaning
 *     parameters:
 *       - name: cleaning
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cleaning_id: { type: integer }
 *             room_id: { type: integer }
 *             staff_id: { type: string }
 *             cleaning_date: { type: string }
 *             cleaning_status: { type: string }
 *             cleaning_notes: { type: string }
 *     responses:
 *       200:
 *         description: Cleaning added successfully
 *       500:
 *         description: Error adding cleaning
 *   put:
 *     description: Change cleaning status
 *     parameters:
 *       - name: cleaning
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cleaning_id: { type: integer }
 *             cleaning_status: { type: string }
 *     responses:
 *       200:
 *         description: Cleaning changed successfully
 *       500:
 *         description: Error changing cleaning
 *
 *
 * /cleaning/{id}:
 *   get:
 *     description: Get cleaning by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved cleaning
 *       404:
 *         description: cleaning not found
 *       500:
 *         description: Failed to fetch cleaning
 *
 *
 * /feedback:
 *   get:
 *     description: Get all feedbacks
 *     responses:
 *       200:
 *         description: Successfully retrieved all feedbacks
 *       500:
 *         description: Failed to fetch feedbacks
 *   post:
 *     description: Add a new feedback
 *     parameters:
 *       - name: feedback
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             feedback_id: { type: integer }
 *             customer_id: { type: string }
 *             room_id: { type: integer }
 *             feedback_text: { type: string }
 *             feedback_rating: { type: integer, minimum: 1, maximum: 5 }
 *             feedback_date: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Feedback added successfully
 *       500:
 *         description: Error adding Feedback
 *   put:
 *     description: Send an admin response
 *     parameters:
 *       - name: adminResponse
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             feedback_id: { type: integer }
 *             admin_response: { type: string }
 *             response_date: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Admin respnses sent successfully
 *       500:
 *         description: Error sending admin response
 *
 *
 * /feedback/{id}:
 *   get:
 *     description: Get feedback by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved feedback
 *       404:
 *         description: feedback not found
 *       500:
 *         description: Failed to fetch feedback
 *
 *
 * /inventory:
 *   get:
 *     description: Get all inventory
 *     responses:
 *       200:
 *         description: Successfully retrieved all inventory
 *       500:
 *         description: Failed to fetch inventory
 *   post:
 *     description: Add a new inventory item
 *     parameters:
 *       - name: item
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_id: { type: integer }
 *             item_name: { type: string }
 *             item_amount: { type: integer }
 *             itemType_name: { type: string }
 *             itemType_description: { type: string }
 *     responses:
 *       200:
 *         description: Item added successfully
 *       500:
 *         description: Error adding Item
 *
 *
 * /inventory/{id}:
 *   get:
 *     description: Get item by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved item
 *       404:
 *         description: item not found
 *       500:
 *         description: Failed to fetch item
 * 
 *
 * /invoice:
 *   get:
 *     description: Get all invoices
 *     responses:
 *       200:
 *         description: Successfully retrieved all invoices
 *       500:
 *         description: Failed to fetch invoices
 *   post:
 *     description: Add a new invoice
 *     parameters:
 *       - name: invoice
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             invoice_id: { type: integer }
 *             invoice_type: { type: string }
 *             invoice_description: { type: string }
 *             invoice_date: { type: string, format: date }
 *             invoice_due_date: { type: string, format: date }
 *             invoice_price: { type: number, format: double }
 *             invoice_is_paid: { type: boolean }
 *             invoice_payment_method: { type: string }
 *             customer_id: { type: string }
 *     responses:
 *       200:
 *         description: Invoice added successfully
 *       500:
 *         description: Error adding Invoice
 * 
 *
 * /invoice/{id}:
 *   get:
 *     description: Get invoice by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved invoice
 *       404:
 *         description: invoice not found
 *       500:
 *         description: Failed to fetch invoice
 *   put:
 *     description: Make invoice paid
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully changed invoice
 *       404:
 *         description: invoice not found
 *       500:
 *         description: Failed to change invoice
 * 
 *
 * /service:
 *   get:
 *     description: Get all services
 *     responses:
 *       200:
 *         description: Successfully retrieved all services
 *       500:
 *         description: Failed to fetch services
 *   post:
 *     description: Add a new service
 *     parameters:
 *       - name: service
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             service_id: { type: integer }
 *             staffs: { type: string }
 *             serviceType_name: { type: string }
 *             serviceType_description: { type: string }
 *     responses:
 *       200:
 *         description: Service added successfully
 *       500:
 *         description: Error adding service

 *
 * /service/{id}:
 *   get:
 *     description: Get service by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved service
 *       404:
 *         description: service not found
 *       500:
 *         description: Failed to fetch service
 *
 *
 */

async function setupApp() {
  // Connect to Postgres
  const pgClient = new pg.Client({
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  });
  await pgClient.connect();

  // Get All Rooms
  app.get("/room", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM Room;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching all rooms:", err);
      res.status(500).send({ error: "Failed to fetch all rooms" });
    }
  });

  // add a new room
  app.post("/room", async (req, res) => {
    const {
      room_id,
      roomType_name,
      roomType_description,
      services,
      room_available,
      room_image,
    } = req.body;

    try {
      await pgClient.query(
        `
          SELECT add_room('${room_id}', '${roomType_name}', '${roomType_description}', '${services}', ${room_available}, '${room_image}');`
      );
      res.status(200).send("Room added successfully");
    } catch (err) {
      res.status(500).send("Error adding room: " + err.message);
    }
  });

  // Get Room by ID
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

  app.put("/room/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await pgClient.query(`select make_room_available(${id});`);

      res.status(200).send("Made room available successfully");
    } catch (err) {
      res.status(500).send("Error changing room availability: " + err.message);
    }
  });

  app.get("/customer", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM Customer;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching Customers", err);
      res.status(500).send({ error: "Failed to fetch Customers" });
    }
  });

  app.post("/customer", async (req, res) => {
    const {
      customer_id,
      customer_name,
      customer_surname,
      customer_phonenumber,
      customer_citizenship,
      customer_citizenship_id,
      customer_passport_id,
      customer_address,
      customer_gender,
      customer_age,
      customerType_name,
      customerType_description,
    } = req.body;

    try {
      await pgClient.query(`
        SELECT add_customer('${customer_id}', '${customer_name}', '${customer_surname}', '${customer_phonenumber}', '${customer_citizenship}', '${customer_citizenship_id}', '${customer_passport_id}', '${customer_address}', '${customer_gender}', ${customer_age}, NULL, '${customerType_name}', '${customerType_description}');
        `);

      res.status(200).send("Customer added successfully");
    } catch (err) {
      res.status(500).send("Error assigning room: " + err.message);
    }
  });

  app.get("/customer/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM customer WHERE customer_id = '${id}';`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "Customer not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching customer:", err);
      res.status(500).send({ error: "Failed to fetch Customer" });
    }
  });

  app.post("/assign-room", async (req, res) => {
    const {
      customer_id,
      customer_name,
      customer_surname,
      customer_phonenumber,
      customer_citizenship,
      customer_citizenship_id,
      customer_passport_id,
      customer_address,
      customer_gender,
      customer_age,
      room_id,
      customerType_name,
      customerType_description,
    } = req.body;

    try {
      await pgClient.query(`
        SELECT assign_room_to_customer('${customer_id}', '${customer_name}', '${customer_surname}', '${customer_phonenumber}', '${customer_citizenship}', '${customer_citizenship_id}', '${customer_passport_id}', '${customer_address}', '${customer_gender}', ${customer_age}, ${room_id}, '${customerType_name}', '${customerType_description}');
        `);

      res.status(200).send("Assigned room successfully");
    } catch (err) {
      console.error("Error assigning room to customer:", err);
      res.status(500).send({ error: "Failed to assign room" });
    }
  });

  app.get("/staff", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM Staff;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching Staffs", err);
      res.status(500).send({ error: "Failed to fetch Staffs" });
    }
  });

  app.post("/staff", async (req, res) => {
    const {
      staff_id,
      staff_name,
      staff_surname,
      staff_phonenumber,
      staff_citizenship,
      staff_citizenship_id,
      staff_passport_id,
      staff_birthdate,
      staff_address,
      staff_salary,
      staff_entry_date,
      staffType_name,
      staffType_description,
      staff_image,
    } = req.body;

    try {
      await pgClient.query(
        `
            SELECT add_staff(
                '${staff_id}', '${staff_name}', '${staff_surname}', '${staff_phonenumber}', '${staff_citizenship}', '${staff_citizenship_id}', '${staff_passport_id}', '${staff_birthdate}', '${staff_address}', ${staff_salary}, '${staff_entry_date}', '${staffType_name}', '${staffType_description}', decode('${staff_image}', 'base64')'
            )`
      );
      res.status(200).send("Staff added successfully");
    } catch (err) {
      res.status(500).send("Error adding staff: " + err.message);
    }
  });

  app.get("/staff/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM staff WHERE staff_id = '${id}';`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "Staff not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching staff:", err);
      res.status(500).send({ error: "Failed to fetch Staff" });
    }
  });

  app.get("/checkin", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM Checkin;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching Checkins", err);
      res.status(500).send({ error: "Failed to fetch Checkins" });
    }
  });

  app.post("/checkin", async (req, res) => {
    const {
      checkin_id,
      checkin_date,
      checkin_due_date,
      room_id,
      customer_id,
      reservation_type,
      reservation_in_date,
      reservation_out_date,
      reservationType_name,
      reservationType_description,
    } = req.body;

    try {
      await pgClient.query(
        `
            select checkin_customer(
                '${checkin_id}', '${checkin_date}', '${checkin_due_date}', ${room_id}, '${customer_id}', '${reservation_type}', '${reservation_in_date}', '${reservation_out_date}', '${reservationType_name}', '${reservationType_description}'
            )`
      );
      res.status(200).send("checkin created successfully");
    } catch (err) {
      res.status(500).send("Error creating checkin: " + err.message);
    }
  });

  app.get("/checkin/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM checkin WHERE checkin_id = ${id};`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "Checkin not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching ckeckin:", err);
      res.status(500).send({ error: "Failed to fetch Checkin" });
    }
  });

  app.get("/cleaning", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM cleaning;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching cleaning", err);
      res.status(500).send({ error: "Failed to fetch cleaning" });
    }
  });

  app.post("/cleaning", async (req, res) => {
    const {
      cleaning_id,
      room_id,
      staff_id,
      cleaning_date,
      cleaning_status,
      cleaning_notes,
    } = req.body;

    try {
      await pgClient.query(
        `
          select add_cleaning(${cleaning_id}, ${room_id}, '${staff_id}', '${cleaning_date}', '${cleaning_status}', '${cleaning_notes}');`
      );
      res.status(200).send("Cleaning added successfully");
    } catch (err) {
      res.status(500).send("Error adding Cleaning: " + err.message);
    }
  });

  app.put("/cleaning", async (req, res) => {
    const { cleaning_id, cleaning_status } = req.body;

    try {
      await pgClient.query(
        `
          select update_cleaning_status(${cleaning_id}, '${cleaning_status}');`
      );
      res.status(200).send("cleaning status updated successfully");
    } catch (err) {
      res.status(500).send("Error updating cleaning status: " + err.message);
    }
  });

  app.get("/cleaning/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM cleaning WHERE cleaning_id = ${id};`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "cleaning not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching cleaning:", err);
      res.status(500).send({ error: "Failed to fetch cleaning" });
    }
  });

  app.get("/feedback", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM feedback;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching feedback", err);
      res.status(500).send({ error: "Failed to fetch feedback" });
    }
  });

  app.post("/feedback", async (req, res) => {
    const {
      feedback_id,
      customer_id,
      room_id,
      feedback_text,
      feedback_rating,
      feedback_date,
    } = req.body;

    try {
      await pgClient.query(
        `
          select add_feedback(${feedback_id}, '${customer_id}', ${room_id}, '${feedback_text}', ${feedback_rating}, '${feedback_date}');`
      );
      res.status(200).send("Feedback added successfully");
    } catch (err) {
      res.status(500).send("Error adding feedback: " + err.message);
    }
  });

  app.put("/feedback", async (req, res) => {
    const { feedback_id, admin_response, response_date } = req.body;

    try {
      await pgClient.query(
        `
          select add_admin_response(${feedback_id}, '${admin_response}', '${response_date}');`
      );
      res.status(200).send("Admin response sent successfully");
    } catch (err) {
      res.status(500).send("Error sending admin response: " + err.message);
    }
  });

  app.get("/feedback/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM feedback WHERE feedback_id = ${id};`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "cleaning not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching cleaning:", err);
      res.status(500).send({ error: "Failed to fetch cleaning" });
    }
  });

  app.get("/inventory", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM inventoryItem;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching inventory", err);
      res.status(500).send({ error: "Failed to fetch inventory" });
    }
  });

  app.post("/inventory", async (req, res) => {
    const {
      item_id,
      item_name,
      item_amount,
      itemType_name,
      itemType_description,
    } = req.body;

    try {
      await pgClient.query(
        `
          select add_inventory_item(${item_id}, '${item_name}', '${item_amount}', '${itemType_name}', '${itemType_description}')`
      );
      res.status(200).send("Item added successfully");
    } catch (err) {
      res.status(500).send("Error adding Item: " + err.message);
    }
  });

  app.get("/inventory/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM inventoryItem WHERE item_id = ${id};`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "item not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching item:", err);
      res.status(500).send({ error: "Failed to fetch item" });
    }
  });

  app.get("/invoice", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM invoice;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching invoices", err);
      res.status(500).send({ error: "Failed to fetch invoices" });
    }
  });

  app.post("/invoice", async (req, res) => {
    const {
      invoice_id,
      invoice_type,
      invoice_description,
      invoice_date,
      invoice_due_date,
      invoice_price,
      invoice_is_paid,
      invoice_payment_method,
      customer_id,
    } = req.body;

    try {
      await pgClient.query(
        `
          select add_invoice(${invoice_id}, '${invoice_type}', '${invoice_description}', '${invoice_date}', '${invoice_due_date}', ${invoice_price}, ${invoice_is_paid}, '${invoice_payment_method}', '${customer_id}')`
      );
      res.status(200).send("Invoice added successfully");
    } catch (err) {
      res.status(500).send("Error adding invoice: " + err.message);
    }
  });

  app.get("/invoice/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM invoice WHERE invoice_id = ${id};`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "invoice not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching invoice:", err);
      res.status(500).send({ error: "Failed to fetch invoice" });
    }
  });

  app.put("/invoice/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const invoice = await pgClient.query(
        `SELECT * FROM invoice WHERE invoice_id = ${id};`
      );

      if (invoice.rows.length === 0) {
        return res.status(404).send({ error: "invoice not found" });
      }

      await pgClient.query(
        `UPDATE invoice SET invoice_is_paid = TRUE WHERE invoice_id = ${id};`
      );

      res.status(200).send("Changed invoice successfully");
    } catch (err) {
      console.error("Error changing invoice:", err);
      res.status(500).send({ error: "Failed to change invoice" });
    }
  });

  app.get("/service", async (req, res) => {
    try {
      const result = await pgClient.query(`SELECT * FROM service;`);

      res.status(200).send(result.rows);
    } catch (err) {
      console.error("Error fetching service", err);
      res.status(500).send({ error: "Failed to fetch service" });
    }
  });

  app.post("/service", async (req, res) => {
    const { service_id, staffs, serviceType_name, serviceType_description } =
      req.body;

    try {
      await pgClient.query(
        `
          select add_service(${service_id}, '${staffs}', '${serviceType_name}', '${serviceType_description}')`
      );
      res.status(200).send("Service added successfully");
    } catch (err) {
      res.status(500).send("Error adding service: " + err.message);
    }
  });

  app.get("/service/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pgClient.query(
        `SELECT * FROM service WHERE service_id = ${id};`
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: "service not found" });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Error fetching service:", err);
      res.status(500).send({ error: "Failed to fetch service" });
    }
  });

  app.listen(3001, function () {
    console.log("Server is running at http://localhost:3001");
  });
}

setupApp();
