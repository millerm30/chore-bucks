let host = "http://localhost:3001";

export const API_URL = {
  userProfile: `${host}/api/dashboard`,
  login: `${host}/api/auth/login`,
  register: `${host}/api/auth/register`,
  chores: `${host}/api/chores/getallchores`,
  addChore: `${host}/api/chores/addtodochore`,
  deleteChore: `${host}/api/chores/deletechore`,
  completeChore: `${host}/api/chores/completechore`,
  addMoneyToWallett: `${host}/api/wallet/addbalance`,
  getBalance: `${host}/api/wallet/getbalance`,
  choreViews: `${host}/api/chores/choreviews`,
  cart: `${host}/api/cart/getcart`,
  removeCartItem: `${host}/api/cart/removefromcart`,
  updateWishState: `${host}/api/wishes/updatewish`,
  purchaseCart: `${host}/api/cart/checkout`,
  cartTotal: `${host}/api/cart/getcarttotal`,
  wishes: `${host}/api/wishes/getwishes`,
  addWish: `${host}/api/wishes/createwish`,
  completeWish: `${host}/api/cart/addtoshoppingcart`,
  removeWishItem: `${host}/api/wishes/deletewish`,
  predefinedChores: `${host}/api/chores/predefinedchores`,
  addNewChore: `${host}/api/chores/addpredefinedchore`,
  contactUs: `${host}/api/contact/email`,
};

