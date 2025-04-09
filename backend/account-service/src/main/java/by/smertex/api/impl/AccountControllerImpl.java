package by.smertex.api.impl;

import by.smertex.api.AccountController;
import by.smertex.core.database.model.impl.Preference;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountControllerImpl implements AccountController {

    @GetMapping
    public ResponseEntity<AccountReadDto> findByPhoneNumber(String phoneNumber) {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody AccountUpdateDto dto) {
        return null;
    }

    @PutMapping("/premium/{id}")
    public ResponseEntity<Void> buyPremium(@PathVariable Long id){
        return null;
    }

    @PutMapping("/preference/{id}")
    public ResponseEntity<Void> updatePreferences(@PathVariable Long id,
                                                  @RequestBody List<Preference> preferences){
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return null;
    }
}
