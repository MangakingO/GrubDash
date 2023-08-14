const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

//Validates properties based on a given intake.
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName] && data[propertyName] !== "") {
      return next();
    }
    next({ status: 400, message: `Order must include a ${propertyName}` });
  };
}

//Validates the dishes property
function validDishes(req, res, next) {
  const { data: { dishes } = {} } = req.body;
  if (dishes.length !== 0 && Array.isArray(dishes)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Order must include at least one dish`,
    });
  }
}

//Validates the quantity property
function validQuantity(req, res, next) {
  const { data: { dishes } = {} } = req.body;
  dishes.forEach((dish, index) => {
    const quantity = dish.quantity;
    if (!quantity || quantity < 1 || Number(quantity) !== quantity) {
      next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
    }
  });
  next();
}

//POST a new order.
function create(req, res) {
  const { data: { deliverTo, mobileNumber, dishes, status } = {} } = req.body;
  const newOrder = {
    id: nextId(),
    deliverTo,
    mobileNumber,
    dishes,
    status,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

//GET all orders.
function list(req, res) {
  res.json({ data: orders });
}

//Does the order exist? If it does, continue.
function orderExists(req, res, next) {
  const orderId = req.params.orderId;
  const foundOrder = orders.find((order) => order.id === orderId);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  } else {
    return next({
      status: 404,
      message: `Order does not exist: ${req.params.orderId}`,
    });
  }
}


//For a PUT request, does the body's id match the orderId? If it does, continue.
function orderMatches(req, res, next) {
  const orderId = req.params.orderId;
  const { data: { id } = {} } = req.body;
  if (id) {
    if (id === orderId) {
      return next();
    } else {
      return next({
        status: 400,
        message: `Order id does not match route id. Order: ${id}, Route: ${orderId}`,
      });
    }
  } else {
    next();
  }
}

//Handles GET for one order
function read(req, res) {
  res.json({ data: res.locals.order });
}

//Handles PUT request
function update(req, res) {
  const foundOrder = res.locals.order;

  const { data: { deliverTo, mobileNumber, dishes } = {} } = req.body;

  foundOrder.deliverTo = deliverTo;
  foundOrder.mobileNumber = mobileNumber;
  foundOrder.dishes = dishes;

  res.json({ data: foundOrder });
}

//Verification for status property for a DELETE request
function verifyDeleteStatus(req, res, next) {
  const order = res.locals.order;
  if (order.status === "pending") {
    return next();
  } else {
    return next({
      status: 400,
      message: `An order cannot be deleted unless it is pending`,
    });
  }
}

//Verification for status and a PUT request
function verifyUpdateStatus(req, res, next) {
  const { data: { status } = {} } = req.body;
  if (!status || ( status !== "pending" && status !== "preparing" && status !== "out-for-delivery") ) {
    return next({
      status: 400,
      message: `Order must have a status of pending, preparing, out-for-delivery, delivered`,
    });
  } else if (status === "delivered") {
    return next({
      status: 400,
      message: `A delivered order cannot be changed`,
    });
  }
  next();
}


//Delete
function destroy(req, res) {
  const order = res.locals.order;
  const index = orders.findIndex((orderNum) => orderNum.id === Number(order.id));
  orders.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  create: [
    bodyDataHas("deliverTo"),
    bodyDataHas("mobileNumber"),
    bodyDataHas("dishes"),
    validDishes,
    validQuantity,
    create,
  ],
  list,
  read: [orderExists, read],
  update: [
    orderExists,
    orderMatches,
    bodyDataHas("deliverTo"),
    bodyDataHas("mobileNumber"),
    bodyDataHas("dishes"),
    bodyDataHas("status"),
    verifyUpdateStatus,
    validDishes,
    validQuantity,
    update,
  ],
  delete: [orderExists, verifyDeleteStatus, destroy],
};