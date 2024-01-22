const Order = require("../models/orderModel");
const CustomError = require("../errors")
const { StatusCodes } = require("http-status-codes")



// ** ===================  GET ALL ORDERS  ===================
const getAllOrders = async (req, res) => {
  try {
      const orders = await Order.findOne({ userId: req.params.userId }).populate('orderItems');
      if (!orders) {
          res.status(StatusCodes.NOT_FOUND).json({
              type: "error",
              message: "User doesn't exists"
          })
      } else {
          res.status(StatusCodes.OK).json({
              type: "success",
              orders
          })
      }
  } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          type: "error",
          message: "Something went wrong please try again",
          err
      })
  }
}

// ** ===================  CREATE ORDER  ===================
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
      newOrder.populate('orderItems');
      const savedOrder = await newOrder.save();
      res.status(StatusCodes.CREATED).json({
          type: "success",
          message: "Order created successfully",
          savedOrder
      })
  } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          type: "error",
          message: "Something went wrong please try again",
          err
      })
  }
}

// ** ===================  UPDATE ORDER  ===================
const updateOrder = async(req, res) => {
  try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
          $set: req.body
      },
          { new: true }
      );
      res.status(StatusCodes.CREATED).json({
          type: "success",
          message: "Cart updated successfully",
          updatedOrder
      })
  } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          type: "error",
          message: "Something went wrong please try again",
          err
      })
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
}
