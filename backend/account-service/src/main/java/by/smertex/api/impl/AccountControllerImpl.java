package by.smertex.api.impl;

import by.smertex.api.AccountController;
import by.smertex.core.database.entity.Preference;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
    public ResponseEntity<AccountReadDto> update(Long id, AccountUpdateDto dto) {
        return null;
    }

    @PutMapping("/premium/{id}")
    public ResponseEntity<Void> updatePremium(Long id, LocalDateTime endDate){
        return null;
    }

    @PutMapping("/preference/{id}")
    public ResponseEntity<Void> addPreferences(Long id, List<Preference> preferences){
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Long id) {
        return null;
    }
}
