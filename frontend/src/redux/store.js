import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as recipeReducer } from "./recipeReducer/reducer";
import { reducer as userReducer } from "./userReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
  recipeReducer,
  userReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
