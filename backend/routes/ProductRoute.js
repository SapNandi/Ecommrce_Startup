const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
  .route("/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetails);

module.exports = router;
