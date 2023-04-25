<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230420160505 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE Ejercicios (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, grupo_muscular VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rutinas (id INT AUTO_INCREMENT NOT NULL, id_usuario_id INT NOT NULL, nombre VARCHAR(255) NOT NULL, rondas INT NOT NULL, repeticiones INT NOT NULL, tiempo VARCHAR(255) NOT NULL, INDEX IDX_ABE0C27EB2C349 (id_usuario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rutinas_Ejercicios (rutinas_id INT NOT NULL, Ejercicios_id INT NOT NULL, INDEX IDX_6AD62048EB100E92 (rutinas_id), INDEX IDX_6AD62048C9F539AE (Ejercicios_id), PRIMARY KEY(rutinas_id, Ejercicios_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE usuarios (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, apellidos VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, contraseña VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rutinas ADD CONSTRAINT FK_ABE0C27EB2C349 FOREIGN KEY (id_usuario_id) REFERENCES usuarios (id)');
        $this->addSql('ALTER TABLE rutinas_Ejercicios ADD CONSTRAINT FK_6AD62048EB100E92 FOREIGN KEY (rutinas_id) REFERENCES rutinas (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rutinas_Ejercicios ADD CONSTRAINT FK_6AD62048C9F539AE FOREIGN KEY (Ejercicios_id) REFERENCES Ejercicios (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rutinas DROP FOREIGN KEY FK_ABE0C27EB2C349');
        $this->addSql('ALTER TABLE rutinas_Ejercicios DROP FOREIGN KEY FK_6AD62048EB100E92');
        $this->addSql('ALTER TABLE rutinas_Ejercicios DROP FOREIGN KEY FK_6AD62048C9F539AE');
        $this->addSql('DROP TABLE Ejercicios');
        $this->addSql('DROP TABLE rutinas');
        $this->addSql('DROP TABLE rutinas_Ejercicios');
        $this->addSql('DROP TABLE usuarios');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
