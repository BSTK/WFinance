package dev.bstk.wfinance.core.seguranca.token;

import org.apache.catalina.util.ParameterMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.Map;

import static dev.bstk.wfinance.core.seguranca.token.RefreshTokenConstants.REFRESH_TOKEN;

public final class RefreshTokenProcessadorRequestWrapper extends HttpServletRequestWrapper {

    private final String refreshToken;

    RefreshTokenProcessadorRequestWrapper(final String refreshToken,
                                          final HttpServletRequest request) {
        super(request);
        this.refreshToken = refreshToken;
    }

    @Override
    public Map<String, String[]> getParameterMap() {
        final ParameterMap<String, String[]> map = new ParameterMap<>();
        map.putAll(getRequest().getParameterMap());
        map.put(REFRESH_TOKEN, new String[] { refreshToken });
        map.setLocked(Boolean.TRUE);
        return map;
    }
}
