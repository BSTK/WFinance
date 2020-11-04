package stash;

import java.util.Map;

public class ObjectValidatorException extends RuntimeException {

    private final Map<String, String> erros;

    public ObjectValidatorException(final Map<String, String> erros, final String message) {
        super(message);
        this.erros = erros;
    }

    public Map<String, String> getErros() {
        return erros;
    }
}
