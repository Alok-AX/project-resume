module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/config/api.config.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Configuration
__turbopack_context__.s([
    "API_CONFIG",
    ()=>API_CONFIG,
    "API_ENDPOINTS",
    ()=>API_ENDPOINTS,
    "default",
    ()=>__TURBOPACK__default__export__
]);
const API_CONFIG = {
    BASE_URL: ("TURBOPACK compile-time value", "https://resume-builder-backend-sdyq.onrender.com") || 'http://localhost:5001',
    TIMEOUT: 30000
};
const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        SIGNUP: '/api/auth/signup',
        LOGIN: '/api/auth/login',
        ME: '/api/auth/me',
        LOGOUT: '/api/auth/logout'
    },
    // Profile endpoints
    PROFILE: {
        GET: '/api/profile',
        UPDATE: '/api/profile'
    },
    // Resume endpoints (future)
    RESUME: {
        GET_ALL: '/api/resumes',
        GET_ONE: '/api/resumes/:id',
        CREATE: '/api/resumes',
        UPDATE: '/api/resumes/:id',
        DELETE: '/api/resumes/:id'
    },
    // Template endpoints (future)
    TEMPLATES: {
        GET_ALL: '/api/templates',
        GET_ONE: '/api/templates/:id'
    }
};
const __TURBOPACK__default__export__ = API_CONFIG;
}),
"[project]/src/services/api.service.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.config.js [app-ssr] (ecmascript)");
;
;
// Create axios instance with default config
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].BASE_URL,
    timeout: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Request interceptor - Add token to requests
apiClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
// Response interceptor - Handle errors globally
apiClient.interceptors.response.use((response)=>response, (error)=>{
    // Handle token expiration
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = apiClient;
}),
"[project]/src/services/auth.service.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>authService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.service.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.config.js [app-ssr] (ecmascript)");
;
;
const authService = {
    // Signup
    signup: async (userData)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.SIGNUP, userData);
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    // Login
    login: async (credentials)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.LOGIN, credentials);
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    // Get current user
    getMe: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.ME);
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    // Logout
    logout: ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};
const __TURBOPACK__default__export__ = authService;
}),
"[project]/src/store/slices/authSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCurrentUser",
    ()=>getCurrentUser,
    "loadUserFromStorage",
    ()=>loadUserFromStorage,
    "loginUser",
    ()=>loginUser,
    "logout",
    ()=>logout,
    "signupUser",
    ()=>signupUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/auth.service.js [app-ssr] (ecmascript)");
;
;
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
};
const signupUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/signup', async (userData, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].signup(userData);
        // Store token in localStorage
        if (response.data?.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Signup failed');
    }
});
const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/login', async (credentials, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login(credentials);
        // Store token in localStorage
        if (response.data?.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
});
const getCurrentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/me', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getMe();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to get user');
    }
});
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        logout (state) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$auth$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].logout();
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
        },
        clearError (state) {
            state.error = null;
        },
        // Load user from localStorage on app init
        loadUserFromStorage (state) {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token && user) {
                state.isAuthenticated = true;
                state.token = token;
                state.user = JSON.parse(user);
            }
        }
    },
    extraReducers: (builder)=>{
        // Signup
        builder.addCase(signupUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(signupUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        }).addCase(signupUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || 'Signup failed';
        });
        // Login
        builder.addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        }).addCase(loginUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || 'Login failed';
        });
        // Get Current User
        builder.addCase(getCurrentUser.pending, (state)=>{
            state.loading = true;
        }).addCase(getCurrentUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(getCurrentUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || 'Failed to get user';
            state.isAuthenticated = false;
        });
    }
});
const { logout, clearError, loadUserFromStorage } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}),
"[project]/src/services/profile.service.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "profileService",
    ()=>profileService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.service.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.config.js [app-ssr] (ecmascript)");
;
;
const profileService = {
    // Get profile
    getProfile: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.GET);
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    // Update profile
    updateProfile: async (profileData)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPDATE, profileData);
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
const __TURBOPACK__default__export__ = profileService;
}),
"[project]/src/store/slices/profileSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearProfileError",
    ()=>clearProfileError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchProfile",
    ()=>fetchProfile,
    "updateProfile",
    ()=>updateProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$profile$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/profile.service.js [app-ssr] (ecmascript)");
;
;
const initialState = {
    profile: null,
    loading: false,
    error: null,
    updateLoading: false,
    updateError: null
};
const fetchProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('profile/fetch', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$profile$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["profileService"].getProfile();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch profile');
    }
});
const updateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('profile/update', async (profileData, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$profile$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["profileService"].updateProfile(profileData);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to update profile');
    }
});
const profileSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'profile',
    initialState,
    reducers: {
        clearProfileError (state) {
            state.error = null;
            state.updateError = null;
        }
    },
    extraReducers: (builder)=>{
        // Fetch Profile
        builder.addCase(fetchProfile.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchProfile.fulfilled, (state, action)=>{
            state.loading = false;
            state.profile = action.payload;
            state.error = null;
        }).addCase(fetchProfile.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || 'Failed to fetch profile';
        });
        // Update Profile
        builder.addCase(updateProfile.pending, (state)=>{
            state.updateLoading = true;
            state.updateError = null;
        }).addCase(updateProfile.fulfilled, (state, action)=>{
            state.updateLoading = false;
            state.profile = action.payload;
            state.updateError = null;
        }).addCase(updateProfile.rejected, (state, action)=>{
            state.updateLoading = false;
            state.updateError = action.payload || 'Failed to update profile';
        });
    }
});
const { clearProfileError } = profileSlice.actions;
const __TURBOPACK__default__export__ = profileSlice.reducer;
}),
"[project]/src/store/slices/resumeSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearResume",
    ()=>clearResume,
    "default",
    ()=>__TURBOPACK__default__export__,
    "setResume",
    ()=>setResume
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    resume: null
};
const resumeSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'resume',
    initialState,
    reducers: {
        setResume (state, action) {
            state.resume = action.payload;
        },
        clearResume (state) {
            state.resume = null;
        }
    }
});
const { setResume, clearResume } = resumeSlice.actions;
const __TURBOPACK__default__export__ = resumeSlice.reducer;
}),
"[project]/src/store/slices/templatesSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "setTemplates",
    ()=>setTemplates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    templates: []
};
const templatesSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'templates',
    initialState,
    reducers: {
        setTemplates (state, action) {
            state.templates = action.payload;
        }
    }
});
const { setTemplates } = templatesSlice.actions;
const __TURBOPACK__default__export__ = templatesSlice.reducer;
}),
"[project]/src/store/slices/atsSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "setScore",
    ()=>setScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    score: 0
};
const atsSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'ats',
    initialState,
    reducers: {
        setScore (state, action) {
            state.score = action.payload;
        }
    }
});
const { setScore } = atsSlice.actions;
const __TURBOPACK__default__export__ = atsSlice.reducer;
}),
"[project]/src/store/slices/uiSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToast",
    ()=>addToast,
    "closeModal",
    ()=>closeModal,
    "default",
    ()=>__TURBOPACK__default__export__,
    "openModal",
    ()=>openModal,
    "removeToast",
    ()=>removeToast,
    "setLoading",
    ()=>setLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    loading: false,
    modals: {},
    toasts: []
};
const uiSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'ui',
    initialState,
    reducers: {
        setLoading (state, action) {
            state.loading = action.payload;
        },
        openModal (state, action) {
            state.modals[action.payload] = true;
        },
        closeModal (state, action) {
            delete state.modals[action.payload];
        },
        addToast (state, action) {
            state.toasts.push(action.payload);
        },
        removeToast (state, action) {
            state.toasts = state.toasts.filter((toast)=>toast.id !== action.payload);
        }
    }
});
const { setLoading, openModal, closeModal, addToast, removeToast } = uiSlice.actions;
const __TURBOPACK__default__export__ = uiSlice.reducer;
}),
"[project]/src/components/providers/ReduxProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/authSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$profileSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/profileSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$resumeSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/resumeSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$templatesSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/templatesSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$atsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/atsSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/uiSlice.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
function ReduxProvider({ children }) {
    const storeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])();
    if (!storeRef.current) {
        storeRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
            reducer: {
                auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                profile: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$profileSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                resume: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$resumeSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                templates: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$templatesSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                ats: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$atsSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                ui: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: storeRef.current,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/providers/ReduxProvider.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3e238d9a._.js.map