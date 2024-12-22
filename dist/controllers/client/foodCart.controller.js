'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteProduct =
  exports.addItem =
  exports.reduceItem =
  exports.createCart =
  exports.index =
    void 0;
const foodCart_model_1 = __importDefault(
  require('../../models/foodCart.model')
);
const foodPet_model_1 = __importDefault(require('../../models/foodPet.model'));
const index = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const foodCart = req.cookies.foodCart;
    const cart = yield foodCart_model_1.default.findOne({
      _id: foodCart,
    });
    cart.totalPrice = 0;
    if (cart.products.length > 0) {
      for (const product of cart.products) {
        const productInfo = yield foodPet_model_1.default
          .findOne({
            _id: product.product_id,
          })
          .select('name size unit price avt');
        product.productInfo = {
          name: productInfo.name,
          size: productInfo.size,
          unit: productInfo.unit,
          price: product.quantity * productInfo.price,
          avt: productInfo.avt,
        };
        cart.totalPrice += product.productInfo.price;
      }
    }
    res.render('client/pages/foodCart/index', {
      title: 'My Cart',
      cart,
    });
  });
exports.index = index;
const createCart = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const foodCart = req.cookies.foodCart;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    const cart = yield foodCart_model_1.default.findOne({ _id: foodCart });
    const existProductInCart = cart.products.find(
      (item) => item.product_id == productId
    );
    if (existProductInCart) {
      const addProduct = yield foodCart_model_1.default.updateOne(
        { _id: foodCart, 'products.product_id': productId },
        {
          $set: {
            'products.$.quantity': existProductInCart.quantity + quantity,
          },
        }
      );
      if (addProduct) {
        req.flash('success', 'You have added to your food pet cart');
      }
    } else {
      const newProduct = yield foodCart_model_1.default.updateOne(
        { _id: foodCart },
        { $push: { products: { product_id: productId, quantity: quantity } } }
      );
      if (newProduct) {
        req.flash('success', 'You have added to your food pet cart');
      }
    }
    res.redirect('back');
  });
exports.createCart = createCart;
const reduceItem = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const foodCart = req.cookies.foodCart;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    try {
      const cart = yield foodCart_model_1.default.updateOne(
        {
          _id: foodCart,
          'products.product_id': productId,
        },
        {
          $set: {
            'products.$.quantity': quantity - 1,
          },
        }
      );
      if (cart) {
        req.flash('success', 'Update quantity of product successfully');
        res.redirect('back');
      }
    } catch (error) {
      req.flash('error', 'Update failed');
    }
  });
exports.reduceItem = reduceItem;
const addItem = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const foodCart = req.cookies.foodCart;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    try {
      const cart = yield foodCart_model_1.default.updateOne(
        {
          _id: foodCart,
          'products.product_id': productId,
        },
        {
          $set: {
            'products.$.quantity': quantity + 1,
          },
        }
      );
      if (cart) {
        res.redirect('back');
        req.flash('success', 'Update quantity of product successfully');
      }
    } catch (error) {
      req.flash('error', 'Update failed');
    }
  });
exports.addItem = addItem;
const deleteProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const foodCart = req.cookies.foodCart;
    const productId = req.params.productId;
    try {
      const cart = yield foodCart_model_1.default.updateOne(
        { _id: foodCart },
        {
          $pull: { products: { product_id: productId } },
        }
      );
      if (cart) {
        res.redirect('back');
        req.flash('success', 'Delete product in cart successfully');
      }
    } catch (error) {
      req.flash('error', 'Update failed');
    }
  });
exports.deleteProduct = deleteProduct;
