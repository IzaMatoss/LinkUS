DELIMITER $$

CREATE TRIGGER after_novo_participante
  AFTER INSERT ON participante
  FOR EACH ROW
    BEGIN
        INSERT INTO mensagem (texto, fk_remetente, fk_grupo)
        VALUES (
            CONCAT('Bem-vindo(a) ao grupo! Usuário ', 
                  (SELECT nome FROM usuario WHERE id_usuario = NEW.fk_participante), 
                  ' agora faz parte do grupo.'),
            NEW.fk_participante,
            NEW.fk_grupo
        );
    END$$

DELIMITER ;