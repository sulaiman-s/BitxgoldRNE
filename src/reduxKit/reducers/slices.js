import { createSlice, createAsyncThunk, rej } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axiosInstance from "utils/axiosInstance";

export const login = createAsyncThunk(
  "user/login",
  async (user) => {
    const { data } = await axiosInstance.post("/api/auth/login", user);
    if (data.status) {
      const user = jwtDecode(data.access);
      user.token = data.access;
      return user;
    } else {
      if (data.message) throw new Error(data.message);
      else throw new Error("Something went wrong.");
    }
  },
  { throwError: true }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (user_id) => {
    const { data } = await axiosInstance.post("/api/user/" + user_id);
    data.token = token;
    if (data.message) throw new Error(data.message);
    return data;
  },
  { throwError: true }
);

export const fetchBalance = createAsyncThunk(
  "user/fetchBalance",
  async (user_id) => {
    try {
      const { data } = await axiosInstance.get("/api/bxg/" + user_id);
      console.log(data, "bxg");
      const { data: stake } = await axiosInstance.get("/api/stake/" + user_id);
      const { data: stakerefreward } = await axiosInstance.get(
        "/api/stakerefreward/" + user_id
      );
      const { data: bonusrefreward } = await axiosInstance.get(
        "/api/bonusrefreward/" + user_id
      );

      const { data: usdt } = await axiosInstance.get("/api/usdt/" + user_id);
      const { data: bnb } = await axiosInstance.get("/api/bnb/" + user_id);

      var referalbonus = 0;
      var stakingreferbonus = 0;
      stakerefreward
        .filter(
          (item) => item?.referer_userId === user_id && item?.type === "claimed"
        )
        .map((item) => {
          stakingreferbonus = stakingreferbonus + item.reward;
        });

      bonusrefreward
        .filter((item) => item?.referer_userId === user_id)
        .map((item) => {
          referalbonus = referalbonus + item.reward;
        });

      return {
        bxg: data.bxg,
        bxg_staked: stake.bxg,
        total_earning: stake.total_claim_reward,
        referal_bonus: referalbonus,
        staking_referral_bonus: stakingreferbonus,
        usdt: usdt.usdt,
        bnb: bnb.bnb,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  { throwError: true }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: null,
      token: null,
    },
    wallet: {
      bxg: 0.0,
      bxg_staked: 0.0,
      total_earning: 0.0,
      referal_bonus: 0.0,
      staking_referral_bonus: 0.0,
      usdt: 0.0,
      bnb: 0.0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user.id = null;
      state.user.name = null;
      state.user.email = null;
      state.user.phone = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Use builder.addCase to handle each action type
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export const reducer = userSlice.reducer;
