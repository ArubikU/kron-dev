
import { IKron, IUser, MBTI } from "../dataModels/interface";
export enum signStatus {
    ALREDY_MAIL,
    INCORRECT_PASSWORD,
    LOGGED_OUT,
    LOGGED,
}
export enum followStatus {
    FOLLOWED,
    UNFOLLOW,
    FAILED_TO_FETCH_USER
}
export enum imageHandle {
    UPLOADED,
    FAILED_TO_FETCH_IMAGE
}
export type NewUserForm={
    name: string,
    avatar: object,
    tag: string,
}
export type LoginForm={
    mail: string,
    password: string
}
export interface apiauth {
    signup: (user: NewUserForm, login: LoginForm)=>(signStatus)
    signin: (login: LoginForm)=>(signStatus)
    signout: ()=>(signStatus)
}
export enum UpdateStatus{
    FAILED,SUCCES
}
export type UserForm={
    name: string,
    mbti: MBTI,
    description: string,
}
export type KronForm={
    content: string,
    Attachment: object,
    owner: IUser,
}
export type KronGroupForm={
    owner: IUser,
    description: string,
    tags: [9]
}
export interface apiprofile {
    getAllProfiles: ()=>(IUser[])
    getCurrentProfile: ()=>(IUser)
    getProfileByTag: ()=>(IUser)
    followByTag: (tag: string)=>(followStatus)
    followById: (id: string)=>(followStatus)
    unfollowByTag: (tag: string)=>(followStatus)
    unfollowById: (id: string)=>(followStatus)
    uploadAvatar: (avatar: object)=>(imageHandle)
    updateProfile: (form: UserForm) => (UpdateStatus)
    getBookmarks: ()=>(IKron[])
    addBookmark: (kronid: string)=>(void)
    removeBookmark: (kronid: string)=>(void)
    getPostsPage: (config: {getRekrons: boolean, getOwnPosts: boolean}) => (IKron[])
    getGroups: (userid?: string) => (string[])
}
export type EditKronForm={
    content: string,
}
export interface apikron {
    postKron: (form: KronForm)=>(void)
    postPM: (kron: KronForm, userId: string) => (void)
    postGroupKron: (kron: KronForm, groupId: string) => (void)
    newKronGroup: (grouo: KronGroupForm) => (void)
    editKron: (form: EditKronForm)=>(UpdateStatus)
    deleteKron: (kronId: string)=>(UpdateStatus)
    likeKron: (kronId: string, userId: string)=>(UpdateStatus)
    unlikeKron: (kronId: string, userId: string)=>(UpdateStatus)
    newKroncomment: (kron: KronForm, mainKronid: string) =>(void)
    newRekron: (kronId: string, userId: string) =>(void)
    getAllKrons: (kronSearchSettings: {page?: Number, maxPerPage?: Number, filterData? :{filter: string, userId: string}})=>(IKron[])
    getFollowingKrons: (kronSearchSettings: {page?: Number, maxPerPage?: Number, filterData? :{filter: string, userId: string}})=>(IKron[])
    getAllProfiles: (kronSearchSettings: {page?: Number, maxPerPage?: Number, filterData? :{filter: string, userId: string}})=>(IKron[])
    getAllGroups: (kronSearchSettings: {page?: Number, maxPerPage?: Number, filterData? :{filter: string, userId: string}})=>(IKron[])
    getKronById: (id: string)=>(IKron)
    getProfileKrons: (config: {getRekrons: boolean, getOwnPosts: true}, userId: string,kronSearchSettings: {page?: Number, maxPerPage?: Number, filter? :string}) => (IKron[])

}