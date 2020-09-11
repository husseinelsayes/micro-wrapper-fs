package deliveryMechanism.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import deliveryMechanism.model.SfdModule;

public interface ModuleRepository extends JpaRepository<SfdModule,Long>{
}