package by.smertex.core.service.impl;

import by.smertex.core.dto.event.PhoneNotificationEvent;
import by.smertex.core.service.SendToPhoneService;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("develop")
public class SendToPhoneServiceStub implements SendToPhoneService {
    @Override
    public void send(PhoneNotificationEvent event) {
        System.out.println(event.phoneNumber() + ":" + event.code());
    }
}
