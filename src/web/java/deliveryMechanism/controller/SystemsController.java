package deliveryMechanism.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deliveryMechanism.model.SfdModule;
import deliveryMechanism.service.ModuleService;

@RestController
@RequestMapping("/api")
public class SystemsController {
    
    @Autowired
    private ModuleService moduleService;

    @GetMapping("/systems")
    public List<SfdModule> getSystems(){
        return moduleService.getModules();
    }
}