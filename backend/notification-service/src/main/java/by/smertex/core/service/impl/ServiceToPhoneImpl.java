package by.smertex.core.service.impl;

import by.smertex.core.dto.event.PhoneNotificationEvent;
import by.smertex.core.service.SendToPhoneService;
import by.smertex.core.service.SmsClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import ru.smsaero.SmsAero;

@Service
@Profile("prod")
@RequiredArgsConstructor
public class ServiceToPhoneImpl implements SendToPhoneService {

    private static final String SMS_MESSAGE =
            """
            Код подтверждения для входа в приложение VOYAGO. Никому не показывайте данное сообщение: %s
            """;

    private final SmsClient<SmsAero> smsClient;

    @Override
    public void send(PhoneNotificationEvent event) {
        try {
            smsClient.getClient()
                    .SendSms(event.phoneNumber(), SMS_MESSAGE.formatted(event.code()));
            System.out.println("Прошел");
        } catch (Exception e) {
            System.out.println(event.phoneNumber() + ":" + event.code());
        }
    }
}
