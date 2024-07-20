const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const { v4: uuidv4 } = require("uuid");
const response = require("../services/response.service");

const checkNameExists = async (name, res) => {
  const existingCategory = await Category.findOne({ name: name });
  if (existingCategory != null) {
    res.status(403).json({ message: "This category name is already added!" });
    return true;
  }
  return false;
};

router.post("/add", async (req, res) => {
  response(res, async () => {
    const { name } = req.body;

    if (await checkNameExists(name, res)) return;

    const category = new Category({
      _id: uuidv4(),
      name: name,
    });

    await category.save();
    res.json({ message: "Category is saved successfully!" });
  });
});

router.post("/removeById", async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;
    await Category.findByIdAndDelete(_id);
    res.json({ message: "Category record is successfully deleted!" });
  });
});

router.post("/update", async (req, res) => {
  response(res, async () => {
    const { _id, name } = req.body;
    const category = await Category.findOne({ _id: _id });

    if (category.name != name) {
      if (await checkNameExists(name, res)) return;
    }

    category.name = name;
    await Category.findByIdAndUpdate(_id, category);
    res.json({ message: "Category record is successfully updated!" });
  });
});

router.get("/", async (req, res) => {
  response(res, async () => {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  });
});

module.exports = router;
