<?php

namespace App\Entity;

use App\Repository\RutinasRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RutinasRepository::class)]
class Rutinas
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\ManyToOne(inversedBy: 'id_rutina')]
    #[ORM\JoinColumn(nullable: false)]
    private ?usuarios $id_usuario = null;

    #[ORM\ManyToMany(targetEntity: Ejercicios::class, inversedBy: 'id_rutina')]
    private Collection $id_ejercicio;

    #[ORM\Column]
    private ?int $rondas = null;

    #[ORM\Column]
    private ?int $repeticiones = null;

    #[ORM\Column(length: 255)]
    private ?string $tiempo = null;

    public function __construct()
    {
        $this->id_ejercicio = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getIdUsuario(): ?usuarios
    {
        return $this->id_usuario;
    }

    public function setIdUsuario(?usuarios $id_usuario): self
    {
        $this->id_usuario = $id_usuario;

        return $this;
    }

    /**
     * @return Collection<int, Ejercicios>
     */
    public function getIdEjercicio(): Collection
    {
        return $this->id_ejercicio;
    }

    public function addIdEjercicio(Ejercicios $idEjercicio): self
    {
        if (!$this->id_ejercicio->contains($idEjercicio)) {
            $this->id_ejercicio->add($idEjercicio);
        }

        return $this;
    }

    public function removeIdEjercicio(Ejercicios $idEjercicio): self
    {
        $this->id_ejercicio->removeElement($idEjercicio);

        return $this;
    }

    public function getRondas(): ?int
    {
        return $this->rondas;
    }

    public function setRondas(int $rondas): self
    {
        $this->rondas = $rondas;

        return $this;
    }

    public function getRepeticiones(): ?int
    {
        return $this->repeticiones;
    }

    public function setRepeticiones(int $repeticiones): self
    {
        $this->repeticiones = $repeticiones;

        return $this;
    }

    public function getTiempo(): ?string
    {
        return $this->tiempo;
    }

    public function setTiempo(string $tiempo): self
    {
        $this->tiempo = $tiempo;

        return $this;
    }
}
