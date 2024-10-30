const express = require("express");
const taskService = require("./task.service");
const {paginated} = require("./task.service");
const Task = require("../../models/task");
require('dotenv').config();

//abr k sale
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
//----------

const router = express.Router();

//abr k sale pt2
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});
//--------------

router.get('/api/task', checkJwt, async (req, res) => {
  const userId = req.user.sub; // Claim 'sub' del token de Auth0
  const { page = 0, perPage = 10, sort = {} } = req.query;

  try {
    const tasks = await paginated({
      filter: { user: userId, completed: false },
      page: Number(page),
      perPage: Number(perPage),
      sort: typeof sort === 'string' ? JSON.parse(sort) : sort,
    });
    res.status(200).send(tasks);

  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).send({ message: 'Error al obtener las tareas' });
  }
});

// POST /api/task
router.post('/api/task', checkJwt, async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.sub;
    const newTask = new Task({ name, description, user: userId });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send({ message: 'Error creating task' });
  }
});

// PUT /api/task/:id
router.put("/api/task/:id", checkJwt, async (req, res) => {
  // #swagger.tags = ['Task']
  // #swagger.description = 'Actualizar una tarea existente'
  // #swagger.parameters['id'] = { description: 'ID de la tarea a actualizar' }
  try {
    const taskId = req.params.id;
    const updatedTask = req.body;

    const task = await taskService.update(taskId, updatedTask);

    if (!task) {
      return res.status(404).send({ message: 'Tarea no encontrada' });
    }

    return res.status(200).send(task);

  } catch (error) {
    console.log("Error en PUT /api/task/:id:", error);
    return res.status(500).send({ message: "Error al actualizar la tarea", error });
  }
});

router.patch("/api/task/:id", checkJwt, async (req, res) => {
  // #swagger.tags = ['Task']
  // #swagger.description = 'Actualizar el estado de una tarea a completada'
  // #swagger.parameters['id'] = { description: 'ID de la tarea a actualizar' }
  try {
    const taskId = req.params.id;
    const result = await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true } // Para devolver el documento actualizado
    );
    if (!result) {
      return res.status(404).send({ message: "Tarea no encontrada" });
    }
    return res.status(200).send({ message: "Tarea actualizada correctamente", task: result });
  } catch (error) {
    console.error("Error en PATCH /api/task/:id:", error);
    return res.status(500).send({ message: "Error al actualizar la tarea", error });
  }
});


module.exports = router;