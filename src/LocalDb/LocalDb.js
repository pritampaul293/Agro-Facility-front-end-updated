// using local storage as data base
const addToDb = (id) => {
  const savedData = getDb();
  let shopping_cart = {};
  if (!savedData) {
    shopping_cart[id] = 1;
  } else {
    shopping_cart = JSON.parse(savedData);
    if (shopping_cart[id]) {
      shopping_cart[id] = shopping_cart[id] + 1;
    } else {
      shopping_cart[id] = 1;
    }
  }
  updateDb(shopping_cart);
};


const getDb = () => localStorage.getItem("shopping_cart");
const updateDb = (cart) => {
  localStorage.setItem("shopping_cart", JSON.stringify(cart));
};

const removeFromDb = (id,minus=false) => {
  const exists = getDb();
  if (exists) {
    const shopping_cart = JSON.parse(exists);
    if(!minus){
      delete shopping_cart[id];
    }else{
      shopping_cart[id]=(shopping_cart[id]-1)==0?1:shopping_cart[id]-1
    }
    updateDb(shopping_cart);
  }
};

const getStoredData = () => {
  const exists = getDb();
  return exists ? JSON.parse(exists) : {};
  console.log(exists);
};

const clearCourses = () => {
  localStorage.removeItem("shopping_cart");
};

export {
  addToDb,
  removeFromDb as deleteFromLocal,
  clearCourses as clearProducts,
  getStoredData,
};
