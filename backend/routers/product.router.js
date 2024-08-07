const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");

//add product

router.post("/add", upload.array("images"), async (req, res) => {
  response(res, async () => {
    const { name, stock, price, categories } = req.body;

    const productId = uuidv4();
    let product = new Product({
      _id: productId,
      name: name.toUpperCase(),
      stock: stock,
      price: price,
      categories: categories,
      isActive: true,
      imageUrls: req.files,
      createdDate: new Date(),
    });
    await product.save();

    res.json({ message: "Product is successfully saved" });
  });
});

//delete product

router.post("/removeById", async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;

    const product = await Product.findById(_id);

    for (const image of product.imageUrls) {
      fs.unlink(image.path, () => {});
    }

    await Product.findByIdAndRemove(_id);
    res.json({ message: "Product is successfully deleted!" });
  });
});

//show product list

router.post("/", async (req, res) => {
  response(res, async () => {
    const { pageNumber, pageSize, search } = req.body;

    let productCount = await Product.find({
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
      ],
    }).count();

    let products = await Product.find({
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
      ],
    })
      .sort({ name: 1 })
      .populate("categories")
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    let totalPageCount = Math.ceil(productCount / pageSize);

    let = {
      datas: products,
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalPageCount: totalPageCount,
      isFirstPage: pageNumber == 1 ? true : false,
      isLastPage: totalPageCount == pageNumber ? true : false,
    };

    res.json(model);
  });
});

// get product by id

router.post("/getById", async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;
    let product = await Product.findById(_id);
    res.json(product);
  });
});

//update  product

router.post("/update", upload.array(images), async (req, res) => {
  response(res, async () => {
    const { _id, name, stock, price, categories } = req.body;

    let product = await Product.findById(_id);
    for (const image of product.imageUrls) {
      fs.unlink(image.path, () => {});
    }

    let imageUrls;
    imageUrls = [...product.imageUrls, ...req.files];
    product = {
      name: name.toUpperCase(),
      stock: stock,
      price: price,
      imageUrls: imageUrls,
      categories: categories,
    };
    await Product.findByIdAndUpdate(_id, product);
    res.json({ message: "Product is successfully updated" });
  });
});

//delete product image
router.post("/removeImageByProductIdAndIndex", async (req, res) => {
  response(res, async () => {
    const { _id, index } = req.body;

    let product = await Product.findById(_id);
    if (product.imageUrls.length === 1) {
      res.status(500).json({
        message:
          "You can not delete the latest photo! Every product should have at least one photo!",
      });
    } else {
      let image = product.imageUrls[index];
      product.imageUrls.splice(index, i);
      await Product.findByIdAndUpdate(_id, product);
      fs.unlink(image.path, () => {});
      res.json({ message: "Photo is successfully deleted!" });
    }
  });
});

//  change products availabilty
router.post("/changeActiveStatus", async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;
    let product = await Product.findById(_id);
    product.isActive = !product.isActive;
    await Product.findByIdAndUpdate(_id, product);
    res.json({ message: "Product's status has changed!" });
  });
});

module.exports = router;
