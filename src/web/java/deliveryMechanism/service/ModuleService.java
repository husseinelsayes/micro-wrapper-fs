package deliveryMechanism.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import deliveryMechanism.model.SfdModule;
import deliveryMechanism.repository.ModuleRepository;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepository moduleRepo;

    public List<SfdModule> getModules(){
        return moduleRepo.findAll();
    }
}