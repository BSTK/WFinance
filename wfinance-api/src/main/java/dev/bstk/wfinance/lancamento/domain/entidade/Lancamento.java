package dev.bstk.wfinance.lancamento.domain.entidade;

import dev.bstk.wfinance.categoria.domain.entidade.Categoria;
import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;
import lombok.Data;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Data
@Entity
@Table(name = "LANCAMENTO")
public class Lancamento implements Serializable {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "DATA_VENCIMENTO")
    private LocalDate dataVencimento;

    @Column(name = "DATA_PAGAMENTO")
    private LocalDate dataPagamento;

    @Column(name = "VALOR")
    private BigDecimal valor;

    @Column(name = "OBSERVACAO")
    private String observacao;

    @Column(name = "TIPO")
    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name = "CATEGORIA_ID")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "PESSOA_ID")
    private Pessoa pessoa;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Lancamento that = (Lancamento) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
    }
}
