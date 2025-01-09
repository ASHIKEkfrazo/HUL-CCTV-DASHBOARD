import { createContext, useReducer, useContext } from "react";

export const CamDataContext = createContext();

export const CamDataContextWrapper = ({ children }) => {
  const initialState = {
    data: [],
    camStatus: null,
    loading: false,
    activeId:null
  };

  const reducer = (state_CamData, action) => {
    switch (action.type) {
      case "CAM_DATA":
        return { ...state_CamData, data: action.payload };
      case "CAM_STATUS":
        return { ...state_CamData, camStatus: action.payload };
      case "LOADING":
        return { ...state_CamData, loading: action.payload };
      case "ACTIVE_ID":
        return {...state_CamData, activeId:action.payload}  
      default:
        return state_CamData; // Return the current state for unrecognized actions
    }
  };

  const [state_CamData, dispatchCamData] = useReducer(reducer, initialState);

  return (
    <CamDataContext.Provider value={{ state_CamData, dispatchCamData }}>
      {children}
    </CamDataContext.Provider>
  );
};
