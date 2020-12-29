package dev.bstk.wfinance.core.helper;

import java.util.Objects;

public final class StringHelper {

    private StringHelper() {
        throw new AssertionError("Não instanciar StringHelper");
    }

    public static Object orEmpty(final Object o) {
        return Objects.nonNull(o) ? o : "";
    }
}
