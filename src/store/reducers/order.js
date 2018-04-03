import * as actionTypes from '../actions/actionTypes';


const initialState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false
};

const purchaseBurgerStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  return {
    ...state,
    loading: false,
    error: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  };
};

const purchaseBurgerFail = (state) => {
  return {
    ...state,
    loading: false,
    error: true,
    purchased: false
  };
};
const fetchOrdersStart = (state) => {
  return {
    ...state,
    loading: true
  };
};
const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false,
    error: false
  };
};
const fetchOrdersFail = (state) => {
  return {
    ...state,
    loading: false,
    error: true
  };
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFail(state, action);

    default:
      return state;
  }

};

export default orderReducer;
