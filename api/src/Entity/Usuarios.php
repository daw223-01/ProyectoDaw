<?php

namespace App\Entity;

use App\Repository\UsuariosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UsuariosRepository::class)]
class Usuarios
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $apellidos = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $contraseña = null;

    #[ORM\OneToMany(mappedBy: 'id_usuario', targetEntity: Rutinas::class)]
    private Collection $id_rutina;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

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

    public function getApellidos(): ?string
    {
        return $this->apellidos;
    }

    public function setApellidos(?string $apellidos): self
    {
        $this->apellidos = $apellidos;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getContraseña(): ?string
    {
        return $this->contraseña;
    }

    public function setContraseña(string $contraseña): self
    {
        $this->contraseña = $contraseña;

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
            $idRutina->setIdUsuario($this);
        }

        return $this;
    }

    public function removeIdRutina(Rutinas $idRutina): self
    {
        if ($this->id_rutina->removeElement($idRutina)) {
            // set the owning side to null (unless already changed)
            if ($idRutina->getIdUsuario() === $this) {
                $idRutina->setIdUsuario(null);
            }
        }

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }
}
