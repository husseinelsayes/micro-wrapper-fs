package deliveryMechanism.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MODULES")
public class SfdModule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MODULE_ID")
    private Long moduleId;
    @Column(name = "MODULE_ARABIC_NAME")
    private String moduleNameAr;
    @Column(name = "MODULE_ENGLISH_NAME")
    private String moduleNameEn;
    @Column(name = "MODULE_ICON_AWESOME")
    private String moduleIcon;
    @Column(name = "MODULE_LINK")
    private String moduleLink;

    
    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleNameAr() {
        return moduleNameAr;
    }

    public void setModuleNameAr(String moduleNameAr) {
        this.moduleNameAr = moduleNameAr;
    }

    public String getModuleNameEn() {
        return moduleNameEn;
    }

    public void setModuleNameEn(String moduleNameEn) {
        this.moduleNameEn = moduleNameEn;
    }

    public String getModuleIcon() {
        return moduleIcon;
    }

    public void setModuleIcon(String moduleIcon) {
        this.moduleIcon = moduleIcon;
    }

    public String getModuleLink() {
        return moduleLink;
    }

    public void setModuleLink(String moduleLink) {
        this.moduleLink = moduleLink;
    }
    
}