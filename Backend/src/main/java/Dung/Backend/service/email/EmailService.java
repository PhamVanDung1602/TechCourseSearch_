package Dung.Backend.service.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements EmailServiceInterface {
    @Autowired
    private JavaMailSender mailSender;


    @Override
    public void sendMessage(String from, String to, String subject, String text) {
        //MimeMailMessage => send text, image,..
        //SimpleMailMessage => only text

        MimeMessage message = mailSender.createMimeMessage();

        try{
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
        }catch (MessagingException e){
            throw new RuntimeException(e);
        }

        //sending email
        mailSender.send(message);

    }
}
