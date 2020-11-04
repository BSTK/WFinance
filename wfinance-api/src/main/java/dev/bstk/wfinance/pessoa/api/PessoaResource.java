package dev.bstk.wfinance.pessoa.api;

import dev.bstk.wfinance.core.evento.NovoRecursoCriadoEvento;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.api.response.PessoaResponse;
import dev.bstk.wfinance.pessoa.domain.Pessoa;
import dev.bstk.wfinance.pessoa.domain.PessoaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/pessoas")
public class PessoaResource {

    private final ModelMapper mapper;
    private final PessoaRepository pessoaRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public PessoaResource(final ModelMapper mapper,
                          final PessoaRepository pessoaRepository,
                          final ApplicationEventPublisher applicationEventPublisher) {
        this.mapper = mapper;
        this.pessoaRepository = pessoaRepository;
        this.applicationEventPublisher =applicationEventPublisher;
    }

    @GetMapping
    public ResponseEntity<List<PessoaResponse>> pessoas() {
        final var pessoas = pessoaRepository.findAll();
        final var pessoasResponse = pessoas.stream()
            .map(pessoa -> mapper.map(pessoa, PessoaResponse.class))
            .collect(Collectors.toList());
        return ResponseEntity.ok(pessoasResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PessoaResponse> pessoaPorId(@PathVariable("id") final Long id) {
        final var pessoaOptional = pessoaRepository.findById(id);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaResponse = mapper.map(pessoa, PessoaResponse.class);
            return ResponseEntity.ok(pessoaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PessoaResponse> novaPessoa(@RequestBody @Valid final NovaPessoaRequest request,
                                                     final HttpServletResponse httpServletResponse) {

        // TODO: SE ENDEREÇO FOR INFORMADO, ENTÃO TODOS OS CAMPOS DEVEM SER INFORMADOS MENOS "complemento"
        // TODO: SE ENDEREÇO FOR INFORMADO, VERIFICAR SE JÁ HÁ UMA PESSOA CADASTRADA COM O MESMO ENDEREÇO
        //  (CAMPOS QUE DEVEM SER LEVADOS EM CONSIDERAÇÃO: CEP, LOGRADOURO, NUMERO)

        final var novaPessoa = mapper.map(request, Pessoa.class);
        final var pessoaSalva = pessoaRepository.save(novaPessoa);
        final var pessoaSalvaResponse = mapper.map(pessoaSalva, PessoaResponse.class);

        applicationEventPublisher.publishEvent(new NovoRecursoCriadoEvento(
            this,httpServletResponse, pessoaSalva.getId()));

        return ResponseEntity.ok(pessoaSalvaResponse);
    }
}
