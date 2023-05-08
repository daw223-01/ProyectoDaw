<?php

namespace App\Entity;

use App\Repository\RutinasEjerciciosRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RutinasEjerciciosRepository::class)]
class RutinasEjercicios
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'rutinasEjercicios')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Rutinas $id_rutina = null;

    #[ORM\ManyToOne(inversedBy: 'rutinasEjercicios')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Ejercicios $id_ejercicio = null;

    #[ORM\Column(nullable: true)]
    private ?int $rondas = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tiempo = null;

    #[ORM\Column(nullable: true)]
    private ?int $repeticiones = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdRutina(): ?Rutinas
    {
        return $this->id_rutina;
    }

    public function setIdRutina(?Rutinas $id_rutina): self
    {
        $this->id_rutina = $id_rutina;

        return $this;
    }

    public function getIdEjercicio(): ?Ejercicios
    {
        return $this->id_ejercicio;
    }

    public function setIdEjercicio(?Ejercicios $id_ejercicio): self
    {
        $this->id_ejercicio = $id_ejercicio;

        return $this;
    }

    public function getRondas(): ?int
    {
        return $this->rondas;
    }

    public function setRondas(?int $rondas): self
    {
        $this->rondas = $rondas;

        return $this;
    }

    public function getTiempo(): ?string
    {
        return $this->tiempo;
    }

    public function setTiempo(?string $tiempo): self
    {
        $this->tiempo = $tiempo;

        return $this;
    }

    public function getRepeticiones(): ?int
    {
        return $this->repeticiones;
    }

    public function setRepeticiones(?int $repeticiones): self
    {
        $this->repeticiones = $repeticiones;

        return $this;
    }
}
