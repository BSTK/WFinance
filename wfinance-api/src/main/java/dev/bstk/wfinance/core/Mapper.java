package dev.bstk.wfinance.core;

import org.modelmapper.ModelMapper;

public abstract class Mapper {

    private static final ModelMapper INSTANCE = new ModelMapper();

    protected static <D> D map(Object objeto, Class<D> klass) {
        return getInstance().map(objeto, klass);
    }

    private static ModelMapper getInstance() {
        synchronized (Mapper.class) {
            return INSTANCE;
        }
    }

}
