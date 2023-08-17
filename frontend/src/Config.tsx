const host = process.env.NODE_ENV === "production" ? "api/" : "http://localhost:3010/api/";

export const API_URL = {
  userProfile: `${host}dashboard`,
  login: `${host}auth/login`,
  register: `${host}auth/register`,
  chores: `${host}chores/getallchores`,
  addChore: `${host}chores/addtodochore`,
  deleteChore: `${host}chores/deletechore`,
  completeChore: `${host}chores/completechore`,
  addMoneyToWallett: `${host}wallet/addbalance`,
  getBalance: `${host}wallet/getbalance`,
  choreViews: `${host}chores/choreviews`,
  cart: `${host}cart/getcart`,
  removeCartItem: `${host}cart/removefromcart`,
  updateWishState: `${host}wishes/updatewish`,
  purchaseCart: `${host}cart/checkout`,
  cartTotal: `${host}cart/getcarttotal`,
  wishes: `${host}wishes/getwishes`,
  addWish: `${host}wishes/createwish`,
  completeWish: `${host}cart/addtoshoppingcart`,
  removeWishItem: `${host}wishes/deletewish`,
  predefinedChores: `${host}chores/predefinedchores`,
  addNewChore: `${host}chores/addpredefinedchore`,
  contactUs: `${host}contact/email`,
};

