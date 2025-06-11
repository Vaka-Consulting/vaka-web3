import { useCallback, useContext } from "react";
import {
  AuthRegisterCollectedData,
  AuthRegisterData,
  AuthRequestWithOtp,
  AuthResendVerificationLinkData,
  AuthVerifyCodeData,
  AuthWithOtp,
  AuthWithWallet,
  AuthWithWalletPolicyId,
} from "@vakaconsulting/common";
import cookie from "js-cookie";
import {
  AuthContext,
  AuthDispatchActionType,
  AuthRegisterContext,
  AuthRegisterDispatchActionType,
  AuthRegisterState,
  AuthState,
} from "@/contexts";
import { AuthRegisterConfig } from "@/types";

interface Auth extends AuthState {
  requestOtp: (data: AuthRequestWithOtp) => Promise<void>;
  loginWithEmail: (data: AuthWithOtp) => Promise<void>;
  loginWithWallet: (data: AuthWithWallet) => Promise<void>;
  loginWithWalletPolicyId: (data: AuthWithWalletPolicyId) => Promise<void>;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthRegister extends AuthRegisterState {
  config: AuthRegisterConfig;
  register: (data: Partial<AuthRegisterData>) => Promise<void>;
  verifyRegisterCode: (data: AuthVerifyCodeData) => Promise<void>;
  resendVerificationLink: (
    data: AuthResendVerificationLinkData
  ) => Promise<void>;
  storeData: (data: Partial<AuthRegisterCollectedData>) => void;
}

function useAuth(): Auth {
  const { state, dispatch, provider } = useContext(AuthContext);

  const _handleError = (error: Error | string) => {
    let errorObj: Error = new Error(error as string);

    if (error instanceof Error) {
      errorObj = error as Error;
    }

    void dispatch({
      type: AuthDispatchActionType.Error,
      payload: { error: errorObj },
    });
  };

  const _handleLogin = (accessToken: string) => {
    cookie.set("access_token", accessToken);

    void dispatch({
      type: AuthDispatchActionType.Login,
      payload: { accessToken },
    });
  };

  const _handleLogout = useCallback(() => {
    cookie.remove("access_token");

    void dispatch({
      type: AuthDispatchActionType.Logout,
      payload: { accessToken: undefined },
    });
  }, []);

  /**
   * Request OTP
   * @param data
   */
  const requestOtp = async (data: AuthRequestWithOtp) => {
    try {
      const { email } = data;
      await provider.requestOtp({ email });
      void dispatch({
        type: AuthDispatchActionType.RequestOtp,
        payload: { email },
      });
    } catch (error) {
      _handleError(`Error requesting One Time Password: ${error || ""}`);
    }
  };

  /**
   * Login with Email
   * @param data
   */
  const loginWithEmail = async (data: AuthWithOtp) => {
    try {
      const { email, otp } = data;
      const { accessToken } = await provider.loginWithOtp({ email, otp });

      _handleLogin(accessToken);
    } catch (error) {
      _handleError(`Error logging in with Email: ${error || ""}`);
    }
  };

  const loginWithWallet = async (data: AuthWithWallet) => {
    try {
      const { stakeAddress, walletSignature } = data;
      const { accessToken } = await provider.loginWithWallet({
        stakeAddress,
        walletSignature,
      });

      _handleLogin(accessToken);
    } catch (error) {
      _handleError(`Error logging in with wallet: ${error || ""}`);
    }
  };

  const loginWithWalletPolicyId = async (data: AuthWithWalletPolicyId) => {
    try {
      const { stakeAddress, walletSignature, authType } = data;
      const { accessToken } = await provider.loginWithWalletPolicyId({
        stakeAddress,
        walletSignature,
        authType,
      });

      _handleLogin(accessToken);
    } catch (error) {
      _handleError(`Error logging in with wallet policyId: ${error || ""}`);
    }
  };

  const refreshSession = useCallback(async () => {
    try {
      if (!state.accessToken) throw new Error("No session ID found");

      const { accessToken } = await provider.refreshSession({
        accessToken: state.accessToken,
      });

      _handleLogin(accessToken);
    } catch (error) {
      _handleError(`Error refreshing session: ${error || ""}`);
    }
  }, [state.accessToken]);

  const logout = async () => {
    try {
      await provider.logout();

      _handleLogout();
    } catch (error) {
      _handleError(`Error logging out: ${error || ""}`);
    }
  };

  return {
    ...state,
    requestOtp,
    loginWithEmail,
    loginWithWallet,
    loginWithWalletPolicyId,
    logout,
    refreshSession,
  };
}

const useAuthRegister = (): AuthRegister => {
  const { state, dispatch, provider, config } = useContext(AuthRegisterContext);

  const register = async (data: Partial<AuthRegisterData>) => {
    try {
      void dispatch({
        type: AuthRegisterDispatchActionType.SubmitRegistration,
        payload: {},
      });

      await provider.register(data);

      void dispatch({
        type: AuthRegisterDispatchActionType.RegistrationCompleted,
        payload: {},
      });
    } catch (error) {
      let errorObj: Error = new Error(error as string);

      if (error instanceof Error) {
        errorObj = error as Error;
      }

      void dispatch({
        type: AuthRegisterDispatchActionType.Error,
        payload: { error: errorObj },
      });
      void dispatch({
        type: AuthRegisterDispatchActionType.StoreData,
        payload: { data },
      });
    }
  };

  const verifyRegisterCode = async (data: AuthVerifyCodeData) => {
    try {
      void dispatch({
        type: AuthRegisterDispatchActionType.SubmitRegistration,
        payload: {},
      });

      await provider.verifyCode(data);

      void dispatch({
        type: AuthRegisterDispatchActionType.RegistrationCompleted,
        payload: {},
      });
    } catch (error) {
      let errorObj: Error = new Error(error as string);

      if (error instanceof Error) {
        errorObj = error as Error;
      }

      void dispatch({
        type: AuthRegisterDispatchActionType.Error,
        payload: { error: errorObj },
      });
    }
  };

  const resendVerificationLink = async (
    data: AuthResendVerificationLinkData
  ) => {
    try {
      void dispatch({
        type: AuthRegisterDispatchActionType.SubmitRegistration,
        payload: {},
      });

      await provider.resendVerificationLink(data);

      void dispatch({
        type: AuthRegisterDispatchActionType.RegistrationCompleted,
        payload: {},
      });
    } catch (error) {
      let errorObj: Error = new Error(error as string);

      if (error instanceof Error) {
        errorObj = error as Error;
      }

      void dispatch({
        type: AuthRegisterDispatchActionType.Error,
        payload: { error: errorObj },
      });
    }
  };

  const storeData = (data: Partial<AuthRegisterCollectedData>) => {
    dispatch({
      type: AuthRegisterDispatchActionType.StoreData,
      payload: { data },
    });
  };

  return {
    ...state,
    config,
    register,
    verifyRegisterCode,
    resendVerificationLink,
    storeData: storeData,
  };
};

export { useAuth, useAuthRegister };
