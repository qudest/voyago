package by.smertex.core.service.impl;

import by.smertex.core.service.SmsClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.smsaero.SmsAero;

@Component
public class SmsClientImpl implements SmsClient<SmsAero> {

    private SmsAero smsAero;

    @Value("${sms.email}")
    private String email;

    @Value("${sms.api-key}")
    private String key;

    @Override
    public SmsAero getClient() {
        if(smsAero == null) smsAero = new SmsAero(email, key);
        return smsAero;
    }
}
