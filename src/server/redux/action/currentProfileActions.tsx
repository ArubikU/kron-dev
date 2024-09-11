import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClasicTheme } from "../../../themes/ClasicTheme";
import { ThemeColors } from "../../../themes/Theme";
import "../../api/dataModels/cookies";
import CookieReader, * as CookieTypes from "../../api/dataModels/cookies";
import { requestModel } from "../../api/requests/requests";
import { LoginForm, NewUserForm, UserForm } from "../../api/requests/requests-interface";
export const signIn = createAsyncThunk(
  "currentProfile/signIn",
  async (formData: {credentials: LoginForm}) => {
    try {
      const response = await requestModel.ApiAuth.signin(formData.credentials)
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const signUp = createAsyncThunk(
  "currentProfile/signUp",
  async (formData: {user: NewUserForm, credentials: LoginForm}) => {
    try {
      const response = await requestModel.ApiAuth.signup(formData.user,formData.credentials);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const signOut = createAsyncThunk("currentProfile/signOut", async () => {
  try {
    const response = await requestModel.ApiAuth.signout()
    return response;
  } catch (error) {
    return error;
  }
});

export const getCurrentProfile = createAsyncThunk(
  "currentProfile/getCurrentProfile",
  async () => {
    try {
      const response = await requestModel.ApiProfile.getCurrentProfile()
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addBookmark = createAsyncThunk(
  "currentProfile/addBookmark",
  async (tweetId: string) => {
    try {
      const response = await requestModel.ApiProfile.addBookmark(tweetId)
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const removeBookmark = createAsyncThunk(
  "currentProfile/removeBookmark",
  async (tweetId: string) => {
    try {
      const response = await requestModel.ApiProfile.removeBookmark(tweetId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const editProfile = createAsyncThunk(
  "currentProfile/editProfile",
  async (formData: {user: UserForm}) => {
    try {
      const response = await requestModel.ApiProfile.updateProfile(formData.user);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "currentProfile/uploadAvatar",
  async (formData: {avatar: object}) => {
    try {
      const response = await requestModel.ApiProfile.uploadAvatar(formData.avatar);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getGroups = createAsyncThunk(
  "currentProfile/getGroups",
  async (userId?: string) => {
    try {
      const response = await requestModel.ApiProfile.getGroups(userId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getPostsPage = createAsyncThunk(
  "currentProfile/getPostsPage",
  async (formData: {getRekrons: boolean,getOwnPosts?: boolean }) => { const formDataWithDefaults = {
    ...formData,
    getOwnPosts: formData.getOwnPosts ?? true
};
    try {
      const response = await requestModel.ApiProfile.getPostsPage(formDataWithDefaults);
      return response;
    } catch (error) {
      return error;
    }
  }
);


export const switchTheme = createAsyncThunk(
  "currentProfile/switchTheme",
  async (form: ThemeColors) => {
    try {
    
      const response = await CookieReader.setCookie(form,CookieTypes.ThemeCookie.build());
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getTheme = createAsyncThunk(
  "currentProfile/getTheme",
  async () => {
    try {
      const response = await CookieReader.getCookieDef(CookieTypes.ThemeCookie.build(),ClasicTheme);
      return response;
    } catch (error) {
      return error;
    }
  }
);
