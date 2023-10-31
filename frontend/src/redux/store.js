import { legacy_createStore } from "redux";
import { reducer } from "./authReducer/reducer";

export const store = legacy_createStore(reducer);
