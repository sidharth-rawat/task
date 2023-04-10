const KEYS = {
    AUTH_TOKEN : 'logxtr_auth_token'
}

/**
 * helper function that stored auth token.
 * @param token auth token value to be stored in the localstorage
 */
export const setAuthToken = (token: string): void => {
    localStorage.setItem(KEYS.AUTH_TOKEN, token)
}

/**
 * Helper function to return the auth token.
 * @returns auth token is present else undefined.
 */
export const getAuthToken = (): string | undefined => {
    const _token = localStorage.getItem(KEYS.AUTH_TOKEN);
    return _token ? _token as string : undefined;
}

/**
 * helper function that removes the auth token and naviagtes to home page is not muted.
 * @param muted flag to control navigation to home page. | DEFAULT = false;
 */
export const removeAuthToken = (muted: boolean = false): void => {
    localStorage.removeItem(KEYS.AUTH_TOKEN);
    if(!muted) window.location.href = '/';
}