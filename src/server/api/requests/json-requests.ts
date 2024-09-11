import { IKron, IUser } from "../dataModels/interface";


//** */

import { apiauth, apikron, apiprofile, EditKronForm, followStatus, imageHandle, KronForm, KronGroupForm, LoginForm, NewUserForm, signStatus, UpdateStatus, UserForm } from "./requests-interface";
//* Requests Api *//
class JsonApiAuth implements apiauth{
    public signup: (user: NewUserForm, login: LoginForm) => (signStatus);
    public signin: (login: LoginForm) => (signStatus);
    public signout: () => (signStatus);
}
class JsonApiProfile implements apiprofile{
    public getGroups: (userid?: string) => (string[]);
    public getAllProfiles: () => (IUser[]);
    public getCurrentProfile: () => (IUser);
    public getProfileByTag: () => (IUser);
    public followByTag: (tag: string) => (followStatus);
    public followById: (id: string) => (followStatus);
    public unfollowByTag: (tag: string) => (followStatus);
    public unfollowById: (id: string) => (followStatus);
    public uploadAvatar: (avatar: object) => (imageHandle);
    public updateProfile: (form: UserForm) => (UpdateStatus);
    public getBookmarks: () => (IKron[]);
    public addBookmark: (kronid: string) => (void);
    public removeBookmark: (kronid: string) => (void);
    public getPostsPage: (config: { getRekrons: boolean; getOwnPosts: boolean }) => (IKron[]);
}
class JsonApiKron implements apikron{
    public getProfileKrons: (config: { getRekrons: boolean; getOwnPosts: true; }, userId: string, kronSearchSettings: { page?: Number; maxPerPage?: Number; filter?: string; }) => (IKron[]);
    public postKron: (form: KronForm) => (void);
    public postPM: (kron: KronForm, userId: string) => (void);
    public postGroupKron: (kron: KronForm, groupId: string) => (void);
    public newKronGroup: (grouo: KronGroupForm) => (void);
    public editKron: (form: EditKronForm) => (UpdateStatus);
    public deleteKron: (kronId: string) => (UpdateStatus);
    public likeKron: (kronId: string, userId: string) => (UpdateStatus);
    public unlikeKron: (kronId: string, userId: string) => (UpdateStatus);
    public newKroncomment: (kron: KronForm, mainKronid: string) => (void);
    public newRekron: (kronId: string, userId: string) => (void);
    public getAllKrons: (kronSearchSettings: {page?: Number, maxPerPage?: Number, filterData? :{filter: string, userId: string}}) => (IKron[]);
    public getFollowingKrons: (kronSearchSettings: {page?: Number, maxPerPage?: Number, filterData? :{filter: string, userId: string}}) => (IKron[]);
    public getAllProfiles: (kronSearchSettings: { page?: Number; maxPerPage?: Number; filterData?: { filter: string; userId: string; }; }) => (IKron[]);
    public getAllGroups: (kronSearchSettings: { page?: Number; maxPerPage?: Number; filterData?: { filter: string; userId: string; }; }) => (IKron[]);
    public getKronById: (id: string) => (IKron);
}

export const ApiAuth = new JsonApiAuth();
export const ApiProfile = new JsonApiProfile();
export const ApiKron = new JsonApiKron();