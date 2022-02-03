import { Category, CategoryDispathc, CategoryForm } from "../../types/category";
import api from "../../utils/api";
const token = localStorage.getItem("token");
export const getCategories = () => async (dispatch: CategoryDispathc) => {
  dispatch({ type: "GET_CATEGORIES_START" });

  try {
    const response = await api.get<Category[]>("/categories");

    dispatch({
      type: "GET_CATEGORIES_SUCCESS",
      payload: response.data,
    });
  } catch {
    dispatch({ type: "GET_CATEGORIES_ERROR" });
  }
};
export const addCategory =
  (form: CategoryForm) => async (dispatch: CategoryDispathc) => {
    dispatch({ type: "ADD_CATEGORIES_START" });
    try {
      const response = await api.post<Category>("/categories", form);
      dispatch({ type: "ADD_CATEGORIES_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "ADD_CATEGORIES_ERROR" });
    }
  };
