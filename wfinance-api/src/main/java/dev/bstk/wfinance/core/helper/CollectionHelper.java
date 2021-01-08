package dev.bstk.wfinance.core.helper;

public final class CollectionHelper {

    private CollectionHelper() {
        throw new AssertionError("Não instânciar CollectionHelper");
    }

    public static boolean isEmpty(final Object[] collection) {
        return collection == null || collection.length == 0;
    }

}
