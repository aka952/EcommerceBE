const express = require("express")
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const {
  getAllOrders,
  createOrder,
  updateOrder,
} = require("../controllers/orderController")

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders)


router
  .route("/:id")
  .get(authenticateUser, getAllOrders)
  .patch(authenticateUser, updateOrder)

module.exports = router
