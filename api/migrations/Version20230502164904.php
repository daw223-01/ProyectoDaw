<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230502164904 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ejercicios (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, grupo_muscular VARCHAR(255) NOT NULL, descripcion VARCHAR(255) DEFAULT NULL, url_video VARCHAR(255) DEFAULT NULL, url_img VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rutinas (id INT AUTO_INCREMENT NOT NULL, id_usuario INT NOT NULL, nombre VARCHAR(255) NOT NULL, INDEX IDX_ABE0C27EB2C349 (id_usuario), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rutinas_ejercicios (rutinas_id INT NOT NULL, ejercicios_id INT NOT NULL, rondas INT, repeticiones INT, tiempo VARCHAR(255), INDEX IDX_6AD62048EB100E92 (rutinas_id), INDEX IDX_6AD62048C9F539AE (ejercicios_id), PRIMARY KEY(rutinas_id, ejercicios_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE usuarios (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, apellidos VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, contraseña VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, progreso VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rutinas ADD CONSTRAINT FK_ABE0C27EB2C349 FOREIGN KEY (id_usuario) REFERENCES usuarios (id)');
        $this->addSql('ALTER TABLE rutinas_ejercicios ADD CONSTRAINT FK_6AD62048EB100E92 FOREIGN KEY (rutinas_id) REFERENCES rutinas (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rutinas_ejercicios ADD CONSTRAINT FK_6AD62048C9F539AE FOREIGN KEY (ejercicios_id) REFERENCES ejercicios (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rutinas DROP FOREIGN KEY FK_ABE0C27EB2C349');
        $this->addSql('ALTER TABLE rutinas_ejercicios DROP FOREIGN KEY FK_6AD62048EB100E92');
        $this->addSql('ALTER TABLE rutinas_ejercicios DROP FOREIGN KEY FK_6AD62048C9F539AE');
        $this->addSql('DROP TABLE ejercicios');
        $this->addSql('DROP TABLE rutinas');
        $this->addSql('DROP TABLE rutinas_ejercicios');
        $this->addSql('DROP TABLE usuarios');
    }
}
