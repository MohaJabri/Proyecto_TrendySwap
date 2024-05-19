import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";
const backend_url = import.meta.env.VITE_API_URL;

export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      token: localStorage.getItem("access"),
    });

    try {
      const res = await axios.post(
        `${backend_url}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const signup =
  (first_name, last_name, email, password, re_password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });

    try {
      const res = await axios.post(`${backend_url}/auth/users/`, body, config);
      
      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        dispatch(
          setAlert(
            "Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam",
            "green"
          )
        );
      } else {
        dispatch({
          type: SIGNUP_FAIL,
        });
        dispatch(setAlert("Error al crear cuenta", "red"));
      }
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (err) {
      const { email, password } = err.response.data;
      const errorMessages = {
        "user account with this email already exists.": "El correo ya está registrado",
        "This password is too short. It must contain at least 8 characters.": "La contraseña es muy corta. Debe contener al menos 8 caracteres.",
        "This password is too common.": "La contraseña es muy común",
        "This password is entirely numeric.": "La contraseña no puede ser solo números."
      };
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      if (email?.[0] && errorMessages[email[0]]) {
        dispatch(setAlert(errorMessages[email[0]], "red"));
      // Verificación de errores de password
      } else if (password && Array.isArray(password)) {
        const passwordError = password.find(msg => errorMessages[msg]);
        if (passwordError) {
          dispatch(setAlert(errorMessages[passwordError], "red"));
        } else {
          dispatch(setAlert("Error al crear cuenta", "red"));
        }
      } else {
        dispatch(setAlert("Error al crear cuenta", "red"));
      }
    }
  };

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(`${backend_url}/auth/users/me/`, config);

      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: USER_LOADED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(
      `${backend_url}/auth/jwt/create/`,
      body,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Inicio de sesión exitoso", "green"));
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Error al iniciar sesion.", "red"));
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    if (err.response?.data.detail === "No active account found with the given credentials") {

      dispatch(setAlert("Ninguna cuenta activa para las credenciales dadas", "red"));
        } else {
      dispatch(setAlert("Error al iniciar sesion. Intenta mas tarde", "red"));
    }
  }
};

export const activate = (uid, token) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    uid,
    token,
  });

  try {
    const res = await axios.post(
      `${backend_url}/auth/users/activation/`,
      body,
      config
    );

    if (res.status === 204) {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      dispatch(setAlert("Cuenta activada correctamente", "green"));
    } else {
      dispatch({
        type: ACTIVATION_FAIL,
      });
      dispatch(setAlert("Error activando cuenta", "red"));
    }
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    dispatch(
      setAlert("Error al conectar con el servidor, intenta mas tarde.", "red")
    );
  }
};

export const refresh = () => async (dispatch) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });

    try {
      const res = await axios.post(
        `${backend_url}/auth/jwt/refresh/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: REFRESH_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } else {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      `${backend_url}/auth/users/reset_password/`,
      body,
      config
    );

    if (res.status === 204) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(
        setAlert(
          "Se ha enviado un correo para restablecer tu contraseña",
          "green"
        )
      );
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(
        setAlert("Error enviando correo para restablecer contraseña", "red")
      );
    }
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    dispatch(
      setAlert("Error enviando correo para restablecer contraseña", "red")
    );
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      uid,
      token,
      new_password,
      re_new_password,
    });

    if (new_password !== re_new_password) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Verifica que las contraseñas coincidan", "red"));
    } else {
      try {
        const res = await axios.post(
          `${backend_url}/auth/users/reset_password_confirm/`,
          body,
          config
        );

        if (res.status === 204) {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
          });
          dispatch({
            type: REMOVE_AUTH_LOADING,
          });
          dispatch(setAlert("Contraseña restablecida correctamente", "green"));
        } else {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
          });
          dispatch({
            type: REMOVE_AUTH_LOADING,
          });
          dispatch(setAlert("Error restableciendo tu contraseña", "red"));
        }
      } catch (err) {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert("Error restableciendo tu contraseña", "red"));
      }
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert("Cerraste sesión correctamente", "green"));
};
