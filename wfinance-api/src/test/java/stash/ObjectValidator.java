package stash;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Objects;

public class ObjectValidator {

    private static final Logger LOGGER = LoggerFactory.getLogger(ObjectValidator.class);

    public static void execute(final Object objeto) {
        try {
            if (Objects.nonNull(objeto)) {
                final var erros = new HashMap<String, String>();

                for (Method metodo : objeto.getClass().getDeclaredMethods()) {
                    final var valor = metodo.invoke(objeto);
                    final var nomeAtributo = metodo.getName()
                        .replace("get", "")
                        .toLowerCase();

                    if (metodo.getName().startsWith("get")) {
                        if (Objects.isNull(valor)) {
                            erros.put(nomeAtributo, "Não pode ser nulo");
                        }

                        if ((valor instanceof String) && String.valueOf(valor).isEmpty()) {
                            erros.put(nomeAtributo, "Não pode ser vazio");
                        }
                    }
                }

                if (!erros.isEmpty()) {
                    throw new ObjectValidatorException(erros, "Campos inválidos!");
                }
            }
        } catch (IllegalAccessException | InvocationTargetException ex) {
            LOGGER.error("Erro ao validar objeto genérico. Ex: {}", ex.getMessage());
            throw new RuntimeException(ex);
        }
    }

}
