package dev.bstk.wfinance.core.seguranca.token;

public interface RefreshTokenConstants {

    /**
     * Nome do método executado pelo Spring para obtenção AccessToken/RefreshToken
     */
    String POST_ACESS_TOKEN = "postAccessToken";

    /**
     * Endpoint chamado pelo Spring para obtenção AccessToken/RefreshToken
     */
    String PATH_OAUTH_TOKEN = "/oauth/token";

    /**
     * Constante  grant_type
     */
    String GRANT_TYPE = "grant_type";

    /**
     * Constante refresh_token
     */
    String REFRESH_TOKEN = "refresh_token";

}
