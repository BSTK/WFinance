package dev.bstk.wfinance.pessoa.api;

import dev.bstk.wfinance.pessoa.domain.PessoaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/pessoas")
public class PessoaResource {

    private final ModelMapper mapper;
    private final PessoaRepository pessoaRepository;

    @Autowired
    public PessoaResource(final ModelMapper mapper,
                          final PessoaRepository pessoaRepository) {
        this.mapper = mapper;
        this.pessoaRepository = pessoaRepository;
    }

    @GetMapping
    public ResponseEntity<List<PessoaResponse>> pessoas() {
        final var pessoas = pessoaRepository.findAll();
        final var pessoasResponse = pessoas.stream()
            .map(pessoa -> mapper.map(pessoa, PessoaResponse.class))
            .collect(Collectors.toList());
        return ResponseEntity.ok(pessoasResponse);
    }
}
