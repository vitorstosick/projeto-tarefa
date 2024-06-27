-- Inserção de dados na tabela usuario
INSERT INTO tarefa.usuario (nome, cpf, email, data_nascimento, login, senha)
VALUES ('João Silva', '12345678901', 'joao.silva@email.com', '1990-05-15', 'joaosilva', 'senha123'),
       ('Maria Souza', '98765432109', 'maria.souza@email.com', '1985-09-25', 'msouza', 'senhamaria');

-- Inserção de dados na tabela tarefas
INSERT INTO tarefa.tarefas (id_usuario, nome_tarefa, tipo_tarefa, realizada, isTemplate)
VALUES (1, 'Fazer compras', 'Compras', false, false),
       (1, 'Estudar SQL', 'Estudo', false, false),
       (2, 'Limpar a casa', 'Limpeza', false, false);

-- Inserção de dados na tabela item
INSERT INTO tarefa.item (descricao, realizado, id_tarefa)
VALUES ('Comprar leite e pão', false, 1),
       ('Estudar SELECT e JOINs', false, 2),
       ('Limpar o banheiro', false, 3),
       ('Passar aspirador no tapete', false, 3);
