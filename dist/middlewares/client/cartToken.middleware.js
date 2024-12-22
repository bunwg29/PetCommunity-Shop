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
exports.checkCartCookies = void 0;
const foodCart_model_1 = __importDefault(
  require('../../models/foodCart.model')
);
const toyCart_model_1 = __importDefault(require('../../models/toyCart.model'));
const checkCartCookies = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const expires = 30 * 24 * 60 * 60 * 1000;
    if (!req.cookies.foodCart) {
      const cartModel = new foodCart_model_1.default();
      cartModel.save();
      res.cookie('foodCart', cartModel._id, {
        expires: new Date(Date.now() + expires),
      });
    } else {
      const cart = yield foodCart_model_1.default.findOne({
        _id: req.cookies.foodCart,
      });
      if (cart) {
        res.locals.cart = cart.products.length || 0;
      }
    }
    if (!req.cookies.toyCart) {
      const toyCartModel = new toyCart_model_1.default();
      toyCartModel.save();
      res.cookie('toyCart', toyCartModel._id, {
        expires: new Date(Date.now() + expires),
      });
    } else {
      const cart = yield toyCart_model_1.default.findOne({
        _id: req.cookies.toyCart,
      });
      if (cart) {
        res.locals.toyCart = cart.products.length || 0;
      }
    }
    next();
  });
exports.checkCartCookies = checkCartCookies;
