const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const { v4: uuidv4 } = require("uuid");

const checkNameExists = async (name, res) => {
  const existingCategory = await Category.findOne({ name: name });
  if (existingCategory != null) {
    res.status(403).json({ message: "This category name is already added!" });
    return true;
  }
  return false;
};

router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    if (await checkNameExists(name, res)) return;

    const category = new Category({
      _id: uuidv4(),
      name: name,
    });

    await category.save();
    res.json({ message: "Category is saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/removeById", async (req, res) => {
  try {
    const { _id } = req.body;
    await Category.findByIdAndDelete(_id);
    res.json({ message: "Category record is successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { _id, name } = req.body;
    const category = await Category.findOne({ _id: _id });

    if (category.name != name) {
      if (await checkNameExists(name, res)) return;
    }

    category.name = name;
    await Category.findByIdAndUpdate(_id, category);
    res.json({ message: "Category record is successfully updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
