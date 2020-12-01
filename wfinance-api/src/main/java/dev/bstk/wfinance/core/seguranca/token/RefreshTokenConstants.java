package dev.bstk.wfinance.core.seguranca.token;

public final class RefreshTokenConstants {

    private RefreshTokenConstants() {
        throw new AssertionError("RefreshTokenConstants não deve ser implementada");
    }

    /**
     * Nome do método executado pelo Spring para obtenção AccessToken/RefreshToken
     */
    public static final String POST_ACESS_TOKEN = "postAccessToken";

    /**
     * Endpoint chamado pelo Spring para obtenção AccessToken/RefreshToken
     */
    public static final String PATH_OAUTH_TOKEN = "/oauth/token";

    /**
     * Constante  grant_type
     */
    public static final String GRANT_TYPE = "grant_type";

    /**
     * Constante refresh_token
     */
    public static final String REFRESH_TOKEN = "refresh_token";

}
