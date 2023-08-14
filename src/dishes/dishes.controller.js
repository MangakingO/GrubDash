const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

//Validates the required body strings i.e. 'name', 'description', and 'image_url'
const bodyHasData = (property) => {
  return (req, res, next) => {
    const { data = {}} = req.body;
    if(data[property] && data[property] !== ''){
      next();
    }
    next({
      status: 400,
      message: `Dish must include a ${property}`
    })
  }
}

//Validates that the router param dishId, matches with the body requests `id`
const matchingDish = (req, res, next) => {
  const { dishId } = req.params;
  const { data: {id} = {}} = req.body;
  if(id){
    if(id !== dishId){
      next({
        status: 400,
        message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`,
      })
    }
    next();
  }else{
    next();
  }
}

//Validates that the body is a valid price and integer
const validPrice = (req, res, next) => {
  const { data: { price } = {}} = req.body;
  if(Number(price) > 0 && typeof price === "number"){
    next();
  }else{
    next({
      status: 400,
      message: `Dish must have a price that is an integer greater than 0`,
    })
  }
}


//Validates and checks that the dish exists
const dishExists = (req, res, next) => {
  const { dishId } = req.params;
  const foundDish = dishes.find((dish) => dish.id === dishId);
  if (foundDish) {
    res.locals.dish = foundDish;
    next();
  } else {
    next({
      status: 404,
      message: `Dish ID does not exist: ${dishId}`,
    });
  }
};

//Post method to create new dish
const create = (req, res) => {
  const {
    data: { name, description, price, image_url },
  } = req.body;
  const newDish = {
    id: nextId(),
    name,
    description,
    price,
    image_url,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
};
//Get one dish
const read = (req, res) => {
  const dish = res.locals.dish;
  res.json({ data: dish });
};
//Put request handling
const update = (req, res) => {
  const dish = res.locals.dish;
  const {
    data: { name, description, price, image_url },
  } = req.body;

  dish.name = name;
  dish.description = description;
  dish.price = price;
  dish.image_url = image_url;

  res.json({ data: dish });
};
//Get method to view all dishes
const list = (req, res) => {
  res.json({ data: dishes });
};

module.exports = {
  create: [
    bodyHasData("name"),
    bodyHasData("description"),
    validPrice,
    bodyHasData("image_url"),
    create,
  ],
  read: [dishExists, read],
  update: [
    dishExists,
    matchingDish,
    bodyHasData("name"),
    bodyHasData("description"),
    validPrice,
    bodyHasData("image_url"),
    update,
  ],
  list,
};