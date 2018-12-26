import { 
  GET_PRODUCTS_BY_SELL, 
  GET_PRODUCTS_BY_ARRIVAL, 
  GET_BRANDS, GET_WOODS, 
  GET_PRODUCTS_TO_SHOP, 
  ADD_PRODUCT, 
  CLEAR_PRODUCT, 
  ADD_BRAND, 
  ADD_WOOD,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type){
    case GET_PRODUCTS_BY_SELL:
      return {
        ...state,
        bySell: action.payload
      }
    case GET_PRODUCTS_BY_ARRIVAL:
      return {
        ...state,
        byArrival: action.payload
      }
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload
      }
    case GET_WOODS:
      return {
        ...state,
        woods: action.payload
      }
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShopSize: action.payload.size,
        toShop: action.payload.articles
      }
    case ADD_PRODUCT:
      return {
        ...state,
        addProduct: action.payload
      }
    case ADD_BRAND:
      return  {
        ...state,
        addBrand: action.payload.success,
        brands: action.payload.brands
      }
    case ADD_WOOD:
      return {
        ...state,
        addWood: action.payload.success,
        woods: action.payload.woods
      }
    case CLEAR_PRODUCT:
      return {
        ...state,
        addProduct: action.payload
      }
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload
      }
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload
      }
    default:
      return state;
  }


  
}