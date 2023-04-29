<?php

namespace App\Repository;

use App\Entity\RutinasEjercicios;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<RutinasEjercicios>
 *
 * @method RutinasEjercicios|null find($id, $lockMode = null, $lockVersion = null)
 * @method RutinasEjercicios|null findOneBy(array $criteria, array $orderBy = null)
 * @method RutinasEjercicios[]    findAll()
 * @method RutinasEjercicios[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RutinasEjerciciosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RutinasEjercicios::class);
    }

    public function save(RutinasEjercicios $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(RutinasEjercicios $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return RutinasEjercicios[] Returns an array of RutinasEjercicios objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?RutinasEjercicios
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
