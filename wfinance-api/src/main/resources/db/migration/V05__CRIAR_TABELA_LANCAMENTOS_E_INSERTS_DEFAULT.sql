CREATE TABLE LANCAMENTO (
   ID SERIAL PRIMARY KEY,
   DESCRICAO VARCHAR(50) NOT NULL,
   DATA_VENCIMENTO DATE NOT NULL,
   DATA_PAGAMENTO DATE,
   VALOR DECIMAL(10,2) NOT NULL,
   OBSERVACAO VARCHAR(100),
   TIPO VARCHAR(20) NOT NULL,
   CATEGORIA_ID BIGINT NOT NULL,
   PESSOA_ID BIGINT NOT NULL,
   FOREIGN KEY (CATEGORIA_ID) REFERENCES CATEGORIA(ID),
   FOREIGN KEY (PESSOA_ID) REFERENCES PESSOA(ID)
);

INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Salário mensal', '2017-06-10', null, 6500.00, 'Distribuição de lucros', 'RECEITA', 1, 1);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Bahamas', '2017-02-10', '2017-02-10', 100.32, null, 'DESPESA', 2, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Top Club', '2017-06-10', null, 120, null, 'RECEITA', 3, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('CEMIG', '2017-02-10', '2017-02-10', 110.44, 'Geração', 'RECEITA', 3, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('DMAE', '2017-06-10', null, 200.30, null, 'DESPESA', 3, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Extra', '2017-03-10', '2017-03-10', 1010.32, null, 'RECEITA', 4, 6);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Bahamas', '2017-06-10', null, 500, null, 'RECEITA', 1, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Top Club', '2017-03-10', '2017-03-10', 400.32, null, 'DESPESA', 4, 8);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Despachante', '2017-06-10', null, 123.64, 'Multas', 'DESPESA', 3, 9);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Pneus', '2017-04-10', '2017-04-10', 665.33, null, 'RECEITA', 5, 10);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Café', '2017-06-10', null, 8.32, null, 'DESPESA', 1, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Eletrônicos', '2017-04-10', '2017-04-10', 2100.32, null, 'DESPESA', 5, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Instrumentos', '2017-06-10', null, 1040.32, null, 'DESPESA', 4, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Café', '2017-04-10', '2017-04-10', 4.32, null, 'DESPESA', 4, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, CATEGORIA_ID, PESSOA_ID) values ('Lanche', '2017-06-10', null, 10.20, null, 'DESPESA', 4, 1);
