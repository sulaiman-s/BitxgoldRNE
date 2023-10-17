import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { filterArrayAndReturnTotal } from "utils/arrayFilter";
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
    const { data } = await axiosInstance.get("/api/user/" + user_id);
    // if (data.message) throw new Error(data.message);
    return data;
  },
  { throwError: true }
);

export const fetchBalance = createAsyncThunk(
  "user/fetchBalance",
  async (user_id) => {
    try {
      const { data } = await axiosInstance.get("/api/bxg/" + user_id);
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

export const fetchBxgHistory = createAsyncThunk(
  "user/fetchBxgHistory",
  async (user_id) => {
    const { data } = await axiosInstance.get("/api/bxghistory/" + user_id);
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (obj.type === "Bought") {
          obj.type = "Buy";
          obj.status = "accepted";
        } else if (obj.type.startsWith("sell_")) {
          var suffix = obj.type.split("_")[1];
          obj.type = "Sell";
          obj.status = suffix;
        }
      }
    }
    return data?.reverse();
  },
  { throwError: true }
);

export const fetchStakePageData = createAsyncThunk(
  "user/fetchStakeHistory",
  async (user_id) => {
    const data1 = await axiosInstance.get("/api/stake/" + user_id);
    const { data } = await axiosInstance.get("/api/stakehistory/" + user_id);
    let stakedData = data?.filter((item) => item.type === "stake").reverse();

    var amountclaimed = filterArrayAndReturnTotal(data, "claim");
    var amountstaked = filterArrayAndReturnTotal(data, "stake");
    amountstaked = amountstaked + filterArrayAndReturnTotal(data, "staked");
    return {
      stakedData,
      amountclaimed,
      amountstaked,
      amountAlreadyStaked: data1?.data?.bxg,
    };
  },
  { throwError: true }
);

export const fetchWithdrawHistory = createAsyncThunk(
  "user/fetchWithdrawHistory",
  async (user_id) => {
    const { data } = await axiosInstance.get("/api/withdrawcrypto/" + user_id);

    return data?.reverse();
  },
  { throwError: true }
);

export const fetchGoldRatio = createAsyncThunk(
  "user/fetchGoldRatio",
  async (user_id) => {
    const { data } = await axiosInstance.get("/api/user/getratio");
    return data;
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
    userReg: {
      user_name: "",
      email: "",
      contact: "",
      password: "",
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
    bxg_history: [],
    stake_page: {
      stakedData: [],
      amountclaimed: 0,
      amountstaked: 0,
      amountAlreadyStaked: 0,
    },
    withdraw_history: [],
    gold_ratio: {
      ratio: 7,
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
    registerData(state, action) {
      state.userReg.user_name = action.payload.username;
      state.userReg.email = action.payload.email;
      state.userReg.contact = action.payload.contact;
    },
    updateRegData(state, action) {
      state.userReg.password = action.payload.password;
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
        action.payload.token = state.user.token;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBxgHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBxgHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bxg_history = action.payload;
      })
      .addCase(fetchBxgHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStakePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStakePageData.fulfilled, (state, action) => {
        state.loading = false;
        state.stake_page = action.payload;
      })
      .addCase(fetchStakePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWithdrawHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWithdrawHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.withdraw_history = action.payload;
      })
      .addCase(fetchWithdrawHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGoldRatio.fulfilled, (state, action) => {
        state.loading = false;
        state.gold_ratio = action.payload;
      });
  },
});

export const { logout, registerData, updateRegData } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const store = configureStore({
  reducer: userSlice.reducer,
});
