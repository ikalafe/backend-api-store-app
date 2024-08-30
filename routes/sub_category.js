const express = require("express");
const SubCategory = require("../models/sup_category");
const subCategoryRouter = express.Router();

subCategoryRouter.post("/api/subcategories", async (req, res) => {
  try {
    const { categoryId, categoryName, image, subCategoryName } = req.body;
    const subcategory = new SubCategory({
      categoryId,
      categoryName,
      image,
      subCategoryName
    });
    await subcategory.save();
    res.status(201).send(subcategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

subCategoryRouter.get(
  "/api/category/:categoryName/subcategories",
  async (req, res) => {
    try {
      //extract categoryName from the request Url using Destructuring
      const { categoryName } = req.params;
      const subcategories = await SubCategory.find({
        categoryName: categoryName
      });
      //Check if any SubCategories were found
      if (!subcategories || subcategories.length == 0) {
        // if no subcategories are found response with a status code 404 error
        return res.status(404).json({ msg: "SubCategories  Not Found" });
      } else {
        return res.status(200).json(subcategories);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

module.exports = subCategoryRouter;
