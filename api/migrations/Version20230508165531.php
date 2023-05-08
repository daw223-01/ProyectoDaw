<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230508165531 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ejercicios (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, grupo_muscular VARCHAR(255) NOT NULL, descripcion VARCHAR(255) DEFAULT NULL, url_video VARCHAR(255) DEFAULT NULL, url_img VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rutinas (id INT AUTO_INCREMENT NOT NULL, id_usuario_id INT NOT NULL, nombre VARCHAR(255) NOT NULL, INDEX IDX_ABE0C27EB2C349 (id_usuario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rutinas_ejercicios (id INT AUTO_INCREMENT NOT NULL, id_rutina_id INT NOT NULL, id_ejercicio_id INT NOT NULL, rondas INT DEFAULT NULL, tiempo VARCHAR(255) DEFAULT NULL, repeticiones INT DEFAULT NULL, INDEX IDX_6AD62048579D33EC (id_rutina_id), INDEX IDX_6AD6204813487F0F (id_ejercicio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE usuarios (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, apellidos VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, contraseña VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, progreso VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rutinas ADD CONSTRAINT FK_ABE0C27EB2C349 FOREIGN KEY (id_usuario_id) REFERENCES usuarios (id)');
        $this->addSql('ALTER TABLE rutinas_ejercicios ADD CONSTRAINT FK_6AD62048579D33EC FOREIGN KEY (id_rutina_id) REFERENCES rutinas (id)');
        $this->addSql('ALTER TABLE rutinas_ejercicios ADD CONSTRAINT FK_6AD6204813487F0F FOREIGN KEY (id_ejercicio_id) REFERENCES ejercicios (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rutinas DROP FOREIGN KEY FK_ABE0C27EB2C349');
        $this->addSql('ALTER TABLE rutinas_ejercicios DROP FOREIGN KEY FK_6AD62048579D33EC');
        $this->addSql('ALTER TABLE rutinas_ejercicios DROP FOREIGN KEY FK_6AD6204813487F0F');
        $this->addSql('DROP TABLE ejercicios');
        $this->addSql('DROP TABLE rutinas');
        $this->addSql('DROP TABLE rutinas_ejercicios');
        $this->addSql('DROP TABLE usuarios');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
