const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;


let productsArray = [
  {
    id: "1",
    name: "pants",
  },
  {
    id: "2",
    name: "shorts",
  },
  {
    id: "3",
    name: "shirts",
  },
];


router.get("/", function (req, res) {
  res.json({ data: productsArray });
});

router.get("/get-team-by-id/:id", function (req, res) {
  //converted to a number because the incoming data is a string
  //this is before uuid because we have to convert the id to a number
  //const id = Number(req.params.id);
  //uuidv4 version
  const id = req.params.id;
  //initialize a foundProduct variable
  let foundProduct;
  //looping through the array of productsArray
  productsArray.forEach((item) => {
    //checking if item.id equals to id
    if (item.id === id) {
      //set foundProduct to item
      foundProduct = item;
    }
  });
  //if no team is found
  if (!foundProduct) {
    //send a message back
    res.json({
      message:
        "The team ID you are looking for does not exists please check ID",
    });
  } else {
    //send found team back
    res.json({
      foundProduct,
    });
  }
});

router.get("/get-product-by-name/:name", function (req, res) {
  const name = req.params.name;
  let foundProduct;
  productsArray.forEach(function (element) {
    if (element.name === name) {
      foundProduct = element;
    }
  });
  if (!foundProduct) {
    res.json({ message: "Sorry, product not found. Check your product name" });
  } else {
    res.json({ foundProduct });
  }
});

router.post("/create-product", function (req, res) {
  let newProductObj = {
    id: uuidv4(),
    name: req.body.name,
  };
  let isTrue = true;
  productsArray.forEach((element)=>{ 
    if (element.name === newProductObj.name){
      res.json({ message: "Sorry, product name already exists!"});
      isTrue = false;
    }
  });
  if(isTrue){
    productsArray.push(newProductObj);
    res.json({ productsArray });
   }
});

router.put("/update-product/:name", function (req, res) {
  let canUpdate = false;
  let foundProduct;
  productsArray.forEach(function (item) {
    if (item.name === req.params.name) {
      canUpdate = true;
      foundProduct = item;
    }
  });
  if (canUpdate) {
    //CHECK IF incoming name already exists in the array!
    let isFound = productsArray.findIndex(
      (item) => item.name === req.body.updatedName
    );
    if (isFound > -1) {
      res.json({ message: "Cannot update because already team exists" });
    } else {
      foundProduct.name = req.body.updatedName;
      res.json({ foundProduct });
    }
  } else {
    res.json({ message: "Product not found! Cannot update!" });
  }
});

router.delete("/delete-by-id/:id", function (req, res) {
  let isFound = productsArray.findIndex((item) => item.id === req.params.id);
  if (isFound === -1) {
    res.json({ message: "ID Not Found!" });
  } else {
    productsArray.splice(isFound, 1);
    res.json({ productsArray });
  }
});


module.exports = router;