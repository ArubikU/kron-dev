import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestModel } from "../../api/requests/requests";
import { EditKronForm, KronForm, KronGroupForm } from "../../api/requests/requests-interface";

export const getAllKrons = createAsyncThunk(
    "kron/getAllKrons",
    async (Page: Number) => {
        try {
            const response = await requestModel.ApiKron.getAllKrons({ page: Page, maxPerPage: 50 });
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const getFollowingKrons = createAsyncThunk(
    "kron/getFollowingKrons",
    async (Page: Number) => {
        try {
            const response = await requestModel.ApiKron.getFollowingKrons({ page: Page, maxPerPage: 50 });
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const getKronById = createAsyncThunk(
    "kron/getKronById",
    async (kronId: string) => {
        try {
            const response = await requestModel.ApiKron.getKronById(kronId);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const likeKron = createAsyncThunk(
    "kron/likeKron",
    async (likeForm: { kronId: string, userId: string }) => {
        try {
            const response = await requestModel.ApiKron.likeKron(likeForm.kronId, likeForm.userId);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const unlikeKron = createAsyncThunk(
    "kron/unlikeKron",
    async (likeForm: { kronId: string, userId: string }) => {
        try {
            const response = await requestModel.ApiKron.unlikeKron(likeForm.kronId, likeForm.userId);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const postKron = createAsyncThunk("kron/postKron", async (formData: KronForm) => {
    try {
        const response = await requestModel.ApiKron.postKron(formData);
        return response;
    } catch (error) {
        return error;
    }
});
export const postPM = createAsyncThunk("kron/postPM", async (form: { data: KronForm, receiverId: string }) => {
    try {
        const response = await requestModel.ApiKron.postPM(form.data, form.receiverId);
        return response;
    } catch (error) {
        return error;
    }
});
export const postGroupKron = createAsyncThunk("kron/postGroupKron", async (form: { data: KronForm, receiverId: string }) => {
    try {
        const response = await requestModel.ApiKron.postGroupKron(form.data, form.receiverId);
        return response;
    } catch (error) {
        return error;
    }
});

export const newKroncomment = createAsyncThunk(
    "kron/newKroncomment",
    async (form: { data: KronForm, id: string }) => {
        try {
            const response = await requestModel.ApiKron.newKroncomment(form.data, form.id);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const newRekron = createAsyncThunk("kron/newRekron",
    async (form: { userid: string, kronid: string }) => {
        try {
            const response = await requestModel.ApiKron.newRekron(form.kronid, form.userid);
            return response;
        } catch (error) {
            return error;
        }
    });

export const editKron = createAsyncThunk(
    "kron/editKron",
    async (form: EditKronForm) => {
        try {
            const response = await requestModel.ApiKron.editKron(form);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const deleteKron = createAsyncThunk("kron/deleteKron", async (id: string) => {
    try {
        const response = await requestModel.ApiKron.deleteKron(id);
        return response;
    } catch (error) {
        return error;
    }
});
export const getAllProfiles = createAsyncThunk(
    "kron/getAllProfiles",
    async (Page: number) => {
        try {
            const response = await requestModel.ApiKron.getAllProfiles({ page: Page, maxPerPage: 50 });
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const getAllGroups = createAsyncThunk(
    "kron/getAllGroups",
    async (Page: number) => {
        try {
            const response = await requestModel.ApiKron.getAllGroups({ page: Page, maxPerPage: 50 });
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const getProfileKrons = createAsyncThunk(
    "kron/getProfileKrons",
    async (
        params: { getRekrons: boolean; getOwnPosts: true; userId: string; Page: number; filter?: string }
    ) => {
        try {
            const response = await requestModel.ApiKron.getProfileKrons(
                { getRekrons: params.getRekrons, getOwnPosts: params.getOwnPosts },
                params.userId,
                { page: params.Page, maxPerPage: 50 , filter: params.filter}
            );
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const newKronGroup = createAsyncThunk(
    "kron/newKronGroup",
    async (form: KronGroupForm) => {
        try {
            const response = await requestModel.ApiKron.newKronGroup(form);
            return response;
        } catch (error) {
            return error;
        }
    }
);
