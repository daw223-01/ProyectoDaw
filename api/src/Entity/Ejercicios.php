<?php

namespace App\Entity;

use App\Repository\EjerciciosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EjerciciosRepository::class)]
class Ejercicios
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    private ?string $grupo_muscular = null;

    #[ORM\ManyToMany(targetEntity: Rutinas::class, mappedBy: 'id_ejercicio')]
    private Collection $id_rutina;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $descripcion = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $url_video = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $url_img = null;

    public function __construct()
    {
        $this->id_rutina = new ArrayCollection();
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

    public function getGrupoMuscular(): ?string
    {
        return $this->grupo_muscular;
    }

    public function setGrupoMuscular(string $grupo_muscular): self
    {
        $this->grupo_muscular = $grupo_muscular;

        return $this;
    }

    /**
     * @return Collection<int, Rutinas>
     */
    public function getIdRutina(): Collection
    {
        return $this->id_rutina;
    }

    public function addIdRutina(Rutinas $idRutina): self
    {
        if (!$this->id_rutina->contains($idRutina)) {
            $this->id_rutina->add($idRutina);
            $idRutina->addIdEjercicio($this);
        }

        return $this;
    }

    public function removeIdRutina(Rutinas $idRutina): self
    {
        if ($this->id_rutina->removeElement($idRutina)) {
            $idRutina->removeIdEjercicio($this);
        }

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): self
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getUrlVideo(): ?string
    {
        return $this->url_video;
    }

    public function setUrlVideo(?string $url_video): self
    {
        $this->url_video = $url_video;

        return $this;
    }

    public function getUrlImg(): ?string
    {
        return $this->url_img;
    }

    public function setUrlImg(?string $url_img): self
    {
        $this->url_img = $url_img;

        return $this;
    }
}
