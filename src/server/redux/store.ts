
import { configureStore } from "@reduxjs/toolkit";
import currentProfileSlicer from "./slicers/currentProfileSlicer";
import kronSlicer from "./slicers/kronSlicer";
import modalSlicer from "./slicers/modalSlicer";
import visitedProfileSlicer from "./slicers/visitedProfileSlicer";

export default configureStore({
  reducer: {
    visitedProfile: visitedProfileSlicer,
    currentProfile: currentProfileSlicer,
    modal: modalSlicer,
    kron: kronSlicer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});