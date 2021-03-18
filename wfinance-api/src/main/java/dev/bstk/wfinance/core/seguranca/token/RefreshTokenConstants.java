package dev.bstk.wfinance.core.seguranca.token;

final class RefreshTokenConstants {

    static final String GRANT_TYPE = "grant_type";
    static final String REFRESH_TOKEN = "refresh_token";
    static final String PATH_OAUTH_TOKEN = "/oauth/token";
    static final String POST_ACESS_TOKEN = "postAccessToken";

    private RefreshTokenConstants() {
        throw new AssertionError("RefreshTokenConstants não deve ser implementada");
    }

}
